import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { Recipe } from '../types/recipe'

interface SwipeCardProps {
  recipe: Recipe
  onSwipeLeft: (id: string) => void
  onSwipeRight: (id: string) => void
  isTop: boolean
}

export default function SwipeCard({ recipe, onSwipeLeft, onSwipeRight, isTop }: SwipeCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
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
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10 }}
      exit={{
        x: x.get() > 0 ? 400 : -400,
        opacity: 0,
        rotate: x.get() > 0 ? 20 : -20,
        transition: { duration: 0.3 },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="relative h-full rounded-2xl overflow-hidden shadow-xl bg-white">
        {/* Food image */}
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* LIKE stamp */}
        <motion.div
          className="absolute top-8 left-6 border-4 border-like text-like text-3xl font-black px-4 py-1 rounded-lg -rotate-12"
          style={{ opacity: likeOpacity }}
        >
          LIKE
        </motion.div>

        {/* NOPE stamp */}
        <motion.div
          className="absolute top-8 right-6 border-4 border-nope text-nope text-3xl font-black px-4 py-1 rounded-lg rotate-12"
          style={{ opacity: nopeOpacity }}
        >
          NOPE
        </motion.div>

        {/* Recipe info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
              {recipe.category}
            </span>
            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
              {recipe.prepTime}
            </span>
            <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
              {recipe.difficulty}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-1">{recipe.name}</h2>
          <p className="text-sm text-white/80 line-clamp-2">{recipe.description}</p>
        </div>
      </div>
    </motion.div>
  )
}
