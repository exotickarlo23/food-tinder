import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { Recipe } from '../types/recipe'

interface SwipeCardProps {
  recipe: Recipe
  onSwipeLeft: (id: string) => void
  onSwipeRight: (id: string) => void
  isTop: boolean
}

const difficultyLabel: Record<string, string> = {
  Easy: 'Lagano',
  Medium: 'Srednje',
  Hard: 'Zahtjevno',
}

export default function SwipeCard({ recipe, onSwipeLeft, onSwipeRight, isTop }: SwipeCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0])

  function handleDragEnd(_: unknown, info: { offset: { x: number }; velocity: { x: number } }) {
    const swipeThreshold = 120
    const velocityThreshold = 400

    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      onSwipeRight(recipe.id)
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      onSwipeLeft(recipe.id)
    }
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, touchAction: 'pan-y' }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 8 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 8 }}
      exit={{
        x: x.get() > 0 ? 400 : -400,
        opacity: 0,
        rotate: x.get() > 0 ? 20 : -20,
        transition: { duration: 0.3 },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="relative h-full rounded-3xl overflow-hidden shadow-xl bg-white flex flex-col items-center">
        {/* Top section with image */}
        <div className="relative w-full flex-shrink-0 pt-6 pb-2 flex justify-center">
          {/* Heart icon */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Circular food image */}
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-brand-100 shadow-lg">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>

        {/* Recipe info section */}
        <div className="flex-1 w-full px-6 pt-3 pb-4 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{recipe.name}</h2>

          {/* Tags row */}
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {difficultyLabel[recipe.difficulty] ?? recipe.difficulty}
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              {recipe.prepTime}
            </span>
          </div>

          {/* Category badge */}
          <span className="px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-semibold mb-3">
            {recipe.category}
          </span>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
            {recipe.description}
          </p>
        </div>

        {/* LIKE stamp overlay */}
        <motion.div
          className="absolute top-1/2 left-6 -translate-y-1/2 border-4 border-like text-like text-4xl font-black px-5 py-2 rounded-xl -rotate-12 bg-white/80"
          style={{ opacity: likeOpacity }}
        >
          SPREMI
        </motion.div>

        {/* NOPE stamp overlay */}
        <motion.div
          className="absolute top-1/2 right-6 -translate-y-1/2 border-4 border-nope text-nope text-4xl font-black px-5 py-2 rounded-xl rotate-12 bg-white/80"
          style={{ opacity: nopeOpacity }}
        >
          NOPE
        </motion.div>
      </div>
    </motion.div>
  )
}
