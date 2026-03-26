import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { Recipe } from '../types/recipe'
import RecipeDetail from './RecipeDetail'

interface SwipeCardProps {
  recipe: Recipe
  onSwipeLeft: (id: string) => void
  onSwipeRight: (id: string) => void
  isTop: boolean
}

export default function SwipeCard({ recipe, onSwipeLeft, onSwipeRight, isTop }: SwipeCardProps) {
  const [showDetail, setShowDetail] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0])

  function handleDragEnd(_: unknown, info: { offset: { x: number }; velocity: { x: number } }) {
    if (showDetail) return
    const swipeThreshold = 120
    const velocityThreshold = 400

    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      onSwipeRight(recipe.id)
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      onSwipeLeft(recipe.id)
    }
  }

  if (showDetail) {
    return (
      <div ref={containerRef} className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-white">
        <div className="h-full overflow-y-auto">
          {/* Smaller image at top */}
          <div className="relative h-56 flex-shrink-0">
            <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            <button
              onClick={() => setShowDetail(false)}
              className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>

          <RecipeDetail recipe={recipe} />
        </div>
      </div>
    )
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
      <div className="relative h-full rounded-2xl overflow-hidden shadow-xl bg-gray-900">
        {/* Full-bleed food image */}
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* SPREMI stamp */}
        <motion.div
          className="absolute top-12 right-6 border-4 border-like text-like text-3xl font-black px-4 py-1 rounded-lg rotate-12 bg-black/30 backdrop-blur-sm"
          style={{ opacity: likeOpacity }}
        >
          SPREMI
        </motion.div>

        {/* SKIP stamp */}
        <motion.div
          className="absolute top-12 left-6 border-4 border-nope text-nope text-3xl font-black px-4 py-1 rounded-lg -rotate-12 bg-black/30 backdrop-blur-sm"
          style={{ opacity: nopeOpacity }}
        >
          SKIP
        </motion.div>

        {/* Recipe info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h2 className="text-2xl font-bold mb-1">{recipe.name}</h2>
          <p className="text-sm text-white/70">{recipe.area} kuhinja</p>

          {/* Scroll hint */}
          <button
            onClick={() => setShowDetail(true)}
            className="mt-3 flex items-center gap-1 text-xs text-white/60 hover:text-white/90 transition-colors"
          >
            <span>Pogledaj recept</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
