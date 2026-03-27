import { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import SwipeCard from './SwipeCard'
import CelebrationOverlay from './CelebrationOverlay'
import type { Recipe } from '../types/recipe'

interface CardStackProps {
  cards: Recipe[]
  onSwipeLeft: (id: string) => void
  onSwipeRight: (id: string) => void
  celebrationTrigger?: number
}

export default function CardStack({ cards, onSwipeLeft, onSwipeRight, celebrationTrigger = 0 }: CardStackProps) {
  const visible = cards.slice(0, 3)
  const exitDirection = useRef<'left' | 'right'>('left')

  const handleSwipeLeft = (id: string) => {
    exitDirection.current = 'left'
    onSwipeLeft(id)
  }

  const handleSwipeRight = (id: string) => {
    exitDirection.current = 'right'
    onSwipeRight(id)
  }

  return (
    <div className="relative flex-1 mx-4 my-4">
      <AnimatePresence>
        {visible.map((recipe, i) => (
          <SwipeCard
            key={recipe.id}
            recipe={recipe}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            isTop={i === 0}
            exitDirection={exitDirection.current}
          />
        )).reverse()}
      </AnimatePresence>
      <CelebrationOverlay trigger={celebrationTrigger} />
    </div>
  )
}
