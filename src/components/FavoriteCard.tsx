import { motion } from 'framer-motion'
import type { Recipe } from '../types/recipe'

interface FavoriteCardProps {
  recipe: Recipe
  onRemove: (id: string) => void
}

const difficultyLabel: Record<string, string> = {
  Easy: 'Lagano',
  Medium: 'Srednje',
  Hard: 'Zahtjevno',
}

export default function FavoriteCard({ recipe, onRemove }: FavoriteCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative rounded-2xl overflow-hidden shadow-md bg-white"
    >
      {/* Circular image */}
      <div className="flex justify-center pt-4 pb-2">
        <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-brand-100 shadow-sm">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="px-3 pb-3 text-center">
        <h3 className="font-bold text-sm text-gray-800 truncate">{recipe.name}</h3>
        <div className="flex items-center justify-center gap-1 mt-1">
          <span className="text-xs text-gray-400">{difficultyLabel[recipe.difficulty] ?? recipe.difficulty}</span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{recipe.prepTime}</span>
        </div>
        <span className="inline-block mt-1.5 px-2 py-0.5 bg-brand-50 text-brand-600 rounded-full text-[10px] font-semibold">
          {recipe.category}
        </span>
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(recipe.id)}
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-nope/10 text-nope flex items-center justify-center text-sm font-bold active:scale-90 transition-transform"
      >
        ×
      </button>
    </motion.div>
  )
}
