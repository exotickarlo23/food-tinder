import { useState, useCallback, useEffect } from 'react'
import type { Recipe } from '../types/recipe'
import { fetchRandomMeals, fetchByTaste } from '../api/mealdb'
import { getFromStorage, setToStorage } from '../utils/storage'

const SEEN_KEY = 'tastry-seen'

export type TasteFilter = 'all' | 'sweet' | 'savory'

export function useRecipeDeck() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [seenIds, setSeenIds] = useState<Set<string>>(
    () => new Set(getFromStorage<string[]>(SEEN_KEY, []))
  )
  const [loading, setLoading] = useState(true)
  const [activeTaste, setActiveTaste] = useState<TasteFilter>('all')

  const loadRecipes = useCallback(async (taste: TasteFilter, seen: Set<string>) => {
    setLoading(true)
    try {
      const meals = taste === 'all'
        ? await fetchRandomMeals(10, seen)
        : await fetchByTaste(taste, seen)
      setRecipes(meals)
    } catch {
      // API error, keep empty
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadRecipes(activeTaste, seenIds)
  }, [activeTaste, loadRecipes])

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
    loadRecipes(activeTaste, seenIds)
  }, [activeTaste, loadRecipes, seenIds])

  const reset = useCallback(() => {
    setSeenIds(new Set())
    setToStorage(SEEN_KEY, [])
    loadRecipes(activeTaste, new Set())
  }, [activeTaste, loadRecipes])

  const setTaste = useCallback((taste: TasteFilter) => {
    setActiveTaste(taste)
  }, [])

  return { remaining, loading, dismiss, loadMore, reset, activeTaste, setTaste }
}
