import { useState, useCallback, useEffect } from 'react'
import type { Recipe } from '../types/recipe'
import { fetchRandomMeals, fetchByCategory } from '../api/mealdb'
import { getFromStorage, setToStorage } from '../utils/storage'

const SEEN_KEY = 'tastry-seen'

export function useRecipeDeck() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [seenIds, setSeenIds] = useState<Set<string>>(
    () => new Set(getFromStorage<string[]>(SEEN_KEY, []))
  )
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const loadRecipes = useCallback(async (category: string | null) => {
    setLoading(true)
    try {
      const meals = category
        ? await fetchByCategory(category)
        : await fetchRandomMeals(10)
      setRecipes(meals)
    } catch {
      // API error, keep empty
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadRecipes(activeCategory)
  }, [activeCategory, loadRecipes])

  const remaining = recipes.filter((r) => !seenIds.has(r.id))

  const dismiss = useCallback((id: string) => {
    setSeenIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      setToStorage(SEEN_KEY, [...next])
      return next
    })
  }, [])

  const loadMore = useCallback(() => {
    loadRecipes(activeCategory)
  }, [activeCategory, loadRecipes])

  const reset = useCallback(() => {
    setSeenIds(new Set())
    setToStorage(SEEN_KEY, [])
    loadRecipes(activeCategory)
  }, [activeCategory, loadRecipes])

  const setCategory = useCallback((cat: string | null) => {
    setActiveCategory(cat)
  }, [])

  return { remaining, loading, dismiss, loadMore, reset, activeCategory, setCategory }
}
