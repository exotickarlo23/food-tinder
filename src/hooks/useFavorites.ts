import { useState, useCallback } from 'react'
import type { Recipe } from '../types/recipe'
import { getFromStorage, setToStorage } from '../utils/storage'

const STORAGE_KEY = 'tastry-favorites'
const COLLECTIONS_KEY = 'tastry-collections'

export interface Collection {
  name: string
  recipeIds: string[]
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>(() =>
    getFromStorage<Recipe[]>(STORAGE_KEY, [])
  )
  const [collections, setCollections] = useState<Collection[]>(() =>
    getFromStorage<Collection[]>(COLLECTIONS_KEY, [{ name: 'Favoriti', recipeIds: [] }])
  )

  const addFavorite = useCallback((recipe: Recipe, collectionName = 'Favoriti') => {
    setFavorites((prev) => {
      if (prev.some((r) => r.id === recipe.id)) return prev
      const next = [...prev, recipe]
      setToStorage(STORAGE_KEY, next)
      return next
    })
    setCollections((prev) => {
      const updated = prev.map((c) =>
        c.name === collectionName && !c.recipeIds.includes(recipe.id)
          ? { ...c, recipeIds: [...c.recipeIds, recipe.id] }
          : c
      )
      setToStorage(COLLECTIONS_KEY, updated)
      return updated
    })
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((r) => r.id !== id)
      setToStorage(STORAGE_KEY, next)
      return next
    })
    setCollections((prev) => {
      const updated = prev.map((c) => ({
        ...c,
        recipeIds: c.recipeIds.filter((rid) => rid !== id),
      }))
      setToStorage(COLLECTIONS_KEY, updated)
      return updated
    })
  }, [])

  const addCollection = useCallback((name: string) => {
    setCollections((prev) => {
      if (prev.some((c) => c.name === name)) return prev
      const next = [...prev, { name, recipeIds: [] }]
      setToStorage(COLLECTIONS_KEY, next)
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.some((r) => r.id === id),
    [favorites]
  )

  return { favorites, collections, addFavorite, removeFavorite, addCollection, isFavorite }
}
