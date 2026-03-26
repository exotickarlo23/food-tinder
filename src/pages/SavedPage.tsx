import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useFavorites } from '../hooks/useFavorites'
import type { Recipe } from '../types/recipe'
import RecipeDetail from '../components/RecipeDetail'
import EmptyState from '../components/EmptyState'

export default function SavedPage() {
  const { favorites, collections, removeFavorite, addCollection } = useFavorites()
  const [activeCollection, setActiveCollection] = useState('Favoriti')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [showNewCollection, setShowNewCollection] = useState(false)
  const [newName, setNewName] = useState('')

  const currentCollection = collections.find((c) => c.name === activeCollection)
  const filteredRecipes = currentCollection
    ? favorites.filter((r) => currentCollection.recipeIds.includes(r.id))
    : favorites

  function handleCreateCollection() {
    if (newName.trim()) {
      addCollection(newName.trim())
      setActiveCollection(newName.trim())
      setNewName('')
      setShowNewCollection(false)
    }
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
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-800">Spremljeno</h1>
        <p className="text-sm text-gray-400 mt-0.5">{favorites.length} recepata</p>
      </header>

      {/* Collection pills */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar items-center">
        {collections.map((col) => (
          <button
            key={col.name}
            onClick={() => setActiveCollection(col.name)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              col.name === activeCollection ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {col.name} ({col.recipeIds.length})
          </button>
        ))}
        <button
          onClick={() => setShowNewCollection(true)}
          className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap bg-gray-100 text-gray-400 border border-dashed border-gray-300"
        >
          + Nova
        </button>
      </div>

      {/* New collection input */}
      {showNewCollection && (
        <div className="flex gap-2 px-4 pb-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Ime kolekcije..."
            className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-coral/30"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleCreateCollection()}
          />
          <button
            onClick={handleCreateCollection}
            className="px-3 py-2 bg-coral text-white rounded-lg text-sm font-semibold"
          >
            Dodaj
          </button>
          <button
            onClick={() => { setShowNewCollection(false); setNewName('') }}
            className="px-3 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm"
          >
            X
          </button>
        </div>
      )}

      {/* Recipes grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filteredRecipes.length === 0 ? (
          <EmptyState
            emoji="💔"
            title="Prazna kolekcija"
            subtitle="Swipaj desno na recepte koji ti se sviđaju!"
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence>
              {filteredRecipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative rounded-xl overflow-hidden shadow-sm bg-white"
                >
                  <button onClick={() => setSelectedRecipe(recipe)} className="w-full text-left">
                    <img src={recipe.image} alt={recipe.name} className="w-full h-28 object-cover" />
                    <div className="p-2.5">
                      <h3 className="font-semibold text-sm text-gray-800 truncate">{recipe.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{recipe.area} · {recipe.category}</p>
                    </div>
                  </button>
                  <button
                    onClick={() => removeFavorite(recipe.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center text-sm active:scale-90 transition-transform"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
