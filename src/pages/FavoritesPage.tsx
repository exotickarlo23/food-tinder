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
      <header className="text-center pt-5 pb-3">
        <h1 className="text-2xl font-extrabold">
          <span className="text-brand-500">Moji</span>
          <span className="text-brand-700"> Recepti</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">{favorites.length} spremljenih recepata</p>
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
