import { AnimatePresence } from 'framer-motion'
import SwipeCard from './SwipeCard'
import type { Recipe } from '../types/recipe'

interface CardStackProps {
  cards: Recipe[]
  onSwipeLeft: (id: string) => void
  onSwipeRight: (id: string) => void
}

export default function CardStack({ cards, onSwipeLeft, onSwipeRight }: CardStackProps) {
  const visible = cards.slice(0, 3)

  return (
    <div className="relative flex-1 min-h-0 mx-4 mt-2 mb-2 overflow-hidden">
      <AnimatePresence>
        {visible.map((recipe, i) => (
          <SwipeCard
            key={recipe.id}
            recipe={recipe}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            isTop={i === 0}
          />
        )).reverse()}
      </AnimatePresence>
    </div>
  )
}
