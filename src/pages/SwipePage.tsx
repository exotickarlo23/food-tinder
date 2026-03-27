import CardStack from '../components/CardStack'
import ActionButtons from '../components/ActionButtons'
import EmptyState from '../components/EmptyState'
import { useRecipeDeck } from '../hooks/useRecipeDeck'
import { useFavorites } from '../hooks/useFavorites'
import type { TasteFilter } from '../hooks/useRecipeDeck'

const TASTE_OPTIONS: { value: TasteFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'sweet', label: 'Sweet' },
  { value: 'savory', label: 'Savory' },
]

export default function SwipePage() {
  const { remaining, loading, dismiss, loadMore, reset, activeTaste, setTaste } = useRecipeDeck()
  const { addFavorite } = useFavorites()

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
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* Header */}
      <header className="text-center pt-4 pb-2 px-4">
        <h1 className="text-2xl font-extrabold tracking-tight">
          <span className="text-coral">Tastry</span>
        </h1>
      </header>

      {/* Taste filter pills */}
      <div className="flex gap-2 px-4 pb-2 justify-center">
        {TASTE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTaste(opt.value)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTaste === opt.value ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {opt.label}
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
            title="No more recipes!"
            subtitle="You've viewed all recipes. Load new ones or reset."
            action={{ label: 'Load new', onClick: reset }}
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
