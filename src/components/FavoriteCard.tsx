import { motion } from 'framer-motion'
import type { Recipe } from '../types/recipe'

interface FavoriteCardProps {
  recipe: Recipe
  onRemove: (id: string) => void
}

export default function FavoriteCard({ recipe, onRemove }: FavoriteCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative rounded-xl overflow-hidden shadow-md bg-white"
    >
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-36 object-cover"
      />
      <div className="p-3">
        <h3 className="font-bold text-sm text-gray-800 truncate">{recipe.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-gray-500">{recipe.category}</span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-500">{recipe.prepTime}</span>
        </div>
      </div>
      <button
        onClick={() => onRemove(recipe.id)}
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center text-sm active:scale-90 transition-transform"
      >
        ×
      </button>
    </motion.div>
  )
}
