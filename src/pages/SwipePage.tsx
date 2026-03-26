import { useEffect, useState } from 'react'
import CardStack from '../components/CardStack'
import ActionButtons from '../components/ActionButtons'
import EmptyState from '../components/EmptyState'
import { useRecipeDeck } from '../hooks/useRecipeDeck'
import { useFavorites } from '../hooks/useFavorites'
import { fetchCategories } from '../api/mealdb'

export default function SwipePage() {
  const { remaining, loading, dismiss, loadMore, reset, activeCategory, setCategory } = useRecipeDeck()
  const { addFavorite } = useFavorites()
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  const currentRecipe = remaining[0] ?? null

  const handleSwipeLeft = (id: string) => {
    dismiss(id)
    if (remaining.length <= 2) loadMore()
  }

  const handleSwipeRight = (id: string) => {
    const recipe = remaining.find((r) => r.id === id)
    if (recipe) addFavorite(recipe)
    dismiss(id)
    if (remaining.length <= 2) loadMore()
  }

  const handleNope = () => {
    if (currentRecipe) handleSwipeLeft(currentRecipe.id)
  }

  const handleLike = () => {
    if (currentRecipe) handleSwipeRight(currentRecipe.id)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="text-center pt-4 pb-2 px-4">
        <h1 className="text-2xl font-extrabold tracking-tight">
          <span className="text-coral">Tastry</span>
        </h1>
      </header>

      {/* Category pills */}
      <div className="flex gap-2 px-4 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
            !activeCategory ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          Sve
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat === activeCategory ? null : cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              cat === activeCategory ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card area */}
      {loading && remaining.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-coral/30 border-t-coral rounded-full animate-spin" />
        </div>
      ) : remaining.length === 0 ? (
        <div className="flex-1">
          <EmptyState
            emoji="🍽️"
            title="Nema više recepata!"
            subtitle="Pogledali ste sve recepte. Učitajte nove ili resetirajte."
            action={{ label: 'Učitaj nove', onClick: reset }}
          />
        </div>
      ) : (
        <>
          <CardStack
            cards={remaining}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
          <ActionButtons
            onNope={handleNope}
            onLike={handleLike}
            disabled={remaining.length === 0}
          />
        </>
      )}
    </div>
  )
}
