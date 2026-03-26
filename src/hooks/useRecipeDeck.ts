import { useState, useCallback } from 'react'
import { recipes } from '../data/recipes'
import type { Recipe } from '../types/recipe'
import { getFromStorage, setToStorage } from '../utils/storage'

const STORAGE_KEY = 'food-tinder-seen'

export function useRecipeDeck() {
  const [seenIds, setSeenIds] = useState<string[]>(() =>
    getFromStorage<string[]>(STORAGE_KEY, [])
  )

  const remaining: Recipe[] = recipes.filter((r) => !seenIds.includes(r.id))

  const dismiss = useCallback((id: string) => {
    setSeenIds((prev) => {
      const next = [...prev, id]
      setToStorage(STORAGE_KEY, next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setSeenIds([])
    setToStorage(STORAGE_KEY, [])
  }, [])

  return { remaining, dismiss, reset }
}
