import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Recipe } from '../types/recipe'
import { searchMeals } from '../api/mealdb'
import RecipeDetail from '../components/RecipeDetail'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  function handleSearch(value: string) {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!value.trim()) {
      setResults([])
      return
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      const meals = await searchMeals(value)
      setResults(meals)
      setLoading(false)
    }, 400)
  }

  if (selectedRecipe) {
    return (
      <div className="flex flex-col h-full">
        <div className="h-full overflow-y-auto">
          <div className="relative h-56">
            <img src={selectedRecipe.image} alt={selectedRecipe.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <RecipeDetail recipe={selectedRecipe} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <header className="pt-4 pb-2 px-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 mb-3">Search</h1>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-coral/30"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-3 border-coral/30 border-t-coral rounded-full animate-spin" />
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <p className="text-center text-gray-400 py-8 text-sm">No results for "{query}"</p>
        )}

        <div className="grid grid-cols-2 gap-3 mt-2">
          <AnimatePresence>
            {results.map((recipe) => (
              <motion.button
                key={recipe.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedRecipe(recipe)}
                className="rounded-xl overflow-hidden shadow-sm bg-white text-left"
              >
                <img src={recipe.image} alt={recipe.name} className="w-full h-28 object-cover" />
                <div className="p-2.5">
                  <h3 className="font-semibold text-sm text-gray-800 truncate">{recipe.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{recipe.area}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
