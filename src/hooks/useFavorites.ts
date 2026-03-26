import { useState, useCallback } from 'react'
import { recipes } from '../data/recipes'
import type { Recipe } from '../types/recipe'
import { getFromStorage, setToStorage } from '../utils/storage'

const STORAGE_KEY = 'food-tinder-favorites'

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() =>
    getFromStorage<string[]>(STORAGE_KEY, [])
  )

  const favorites: Recipe[] = favoriteIds
    .map((id) => recipes.find((r) => r.id === id))
    .filter((r): r is Recipe => r !== undefined)

  const addFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      setToStorage(STORAGE_KEY, next)
      return next
    })
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      const next = prev.filter((fid) => fid !== id)
      setToStorage(STORAGE_KEY, next)
      return next
    })
  }, [])

  return { favorites, favoriteIds, addFavorite, removeFavorite }
}
