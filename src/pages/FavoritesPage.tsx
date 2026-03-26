import { AnimatePresence } from 'framer-motion'
import FavoriteCard from '../components/FavoriteCard'
import EmptyState from '../components/EmptyState'
import { useFavorites } from '../hooks/useFavorites'

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()

  if (favorites.length === 0) {
    return (
      <EmptyState
        emoji="💔"
        title="Nema favorita"
        subtitle="Swipaj desno na recepte koji ti se sviđaju!"
      />
    )
  }

  return (
    <div className="flex flex-col h-full">
      <header className="text-center pt-4 pb-2">
        <h1 className="text-xl font-bold text-brand-600">
          ❤️ Moji Favoriti
        </h1>
        <p className="text-sm text-gray-500">{favorites.length} recepata</p>
      </header>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence>
            {favorites.map((recipe) => (
              <FavoriteCard
                key={recipe.id}
                recipe={recipe}
                onRemove={removeFavorite}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
