import type { Recipe } from '../types/recipe'

const BASE = 'https://www.themealdb.com/api/json/v1/1'

interface MealDBMeal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strSource?: string
  strYoutube?: string
  [key: string]: string | undefined
}

function parseMeal(meal: MealDBMeal): Recipe {
  const ingredients: { ingredient: string; measure: string }[] = []
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]?.trim()
    const measure = meal[`strMeasure${i}`]?.trim()
    if (ing && ing !== '') {
      ingredients.push({ ingredient: ing, measure: measure || '' })
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    ingredients,
    source: meal.strSource,
    youtube: meal.strYoutube,
  }
}

export async function fetchRandomMeal(): Promise<Recipe | null> {
  const res = await fetch(`${BASE}/random.php`)
  const data = await res.json()
  if (!data.meals?.[0]) return null
  return parseMeal(data.meals[0])
}

export async function fetchRandomMeals(count: number): Promise<Recipe[]> {
  const promises = Array.from({ length: count }, () => fetchRandomMeal())
  const results = await Promise.all(promises)
  return results.filter((r): r is Recipe => r !== null)
}

export async function fetchByCategory(category: string): Promise<Recipe[]> {
  const res = await fetch(`${BASE}/filter.php?c=${category}`)
  const data = await res.json()
  if (!data.meals) return []

  // filter endpoint returns partial data, fetch full details for first 10
  const ids = data.meals.slice(0, 10).map((m: { idMeal: string }) => m.idMeal)
  const full = await Promise.all(ids.map((id: string) => fetchMealById(id)))
  return full.filter((r): r is Recipe => r !== null)
}

const SWEET_CATEGORIES = ['Dessert']

export async function fetchByTaste(taste: 'sweet' | 'savory'): Promise<Recipe[]> {
  const allCategories = await fetchCategories()
  const filtered = taste === 'sweet'
    ? allCategories.filter((c) => SWEET_CATEGORIES.includes(c))
    : allCategories.filter((c) => !SWEET_CATEGORIES.includes(c))

  // Pick up to 3 random categories to fetch from
  const shuffled = filtered.sort(() => Math.random() - 0.5).slice(0, 3)
  const results = await Promise.all(shuffled.map((cat) => fetchByCategory(cat)))
  const all = results.flat().sort(() => Math.random() - 0.5)
  return all.slice(0, 10)
}

export async function fetchMealById(id: string): Promise<Recipe | null> {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`)
  const data = await res.json()
  if (!data.meals?.[0]) return null
  return parseMeal(data.meals[0])
}

export async function searchMeals(query: string): Promise<Recipe[]> {
  if (!query.trim()) return []
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`)
  const data = await res.json()
  if (!data.meals) return []
  return data.meals.map(parseMeal)
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE}/list.php?c=list`)
  const data = await res.json()
  if (!data.meals) return []
  return data.meals.map((m: { strCategory: string }) => m.strCategory)
}
