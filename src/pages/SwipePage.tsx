import CardStack from '../components/CardStack'
import ActionButtons from '../components/ActionButtons'
import EmptyState from '../components/EmptyState'
import { useRecipeDeck } from '../hooks/useRecipeDeck'
import { useFavorites } from '../hooks/useFavorites'

export default function SwipePage() {
  const { remaining, dismiss, reset } = useRecipeDeck()
  const { addFavorite } = useFavorites()

  const handleSwipeLeft = (id: string) => {
    dismiss(id)
  }

  const handleSwipeRight = (id: string) => {
    addFavorite(id)
    dismiss(id)
  }

  const handleNope = () => {
    if (remaining.length > 0) handleSwipeLeft(remaining[0].id)
  }

  const handleLike = () => {
    if (remaining.length > 0) handleSwipeRight(remaining[0].id)
  }

  if (remaining.length === 0) {
    return (
      <EmptyState
        emoji="🍽️"
        title="Nema više recepata!"
        subtitle="Pogledali ste sve recepte. Resetirajte da počnete ispočetka."
        action={{ label: 'Resetiraj', onClick: reset }}
      />
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="text-center pt-5 pb-1">
        <h1 className="text-2xl font-extrabold">
          <span className="text-brand-500">Tast</span>
          <span className="text-brand-700">ry</span>
        </h1>
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mt-1">
          Nađi recept
        </p>
      </header>

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
    </div>
  )
}
