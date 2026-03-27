import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COLORS = ['#3CB371', '#FFD700', '#FF6B6B', '#4FC3F7', '#FF8A65', '#BA68C8']

interface Particle {
  id: number
  x: number
  y: number
  color: string
  delay: number
  size: number
  rotation: number
}

function generateParticles(): Particle[] {
  return Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
    const distance = 80 + Math.random() * 120
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 40,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.1,
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 720 - 360,
    }
  })
}

export default function CelebrationOverlay({ trigger }: { trigger: number }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [showGlow, setShowGlow] = useState(false)

  useEffect(() => {
    if (trigger === 0) return
    setParticles(generateParticles())
    setShowGlow(true)
    const timer = setTimeout(() => {
      setParticles([])
      setShowGlow(false)
    }, 900)
    return () => clearTimeout(timer)
  }, [trigger])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {/* Green glow flash */}
      <AnimatePresence>
        {showGlow && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ background: 'radial-gradient(circle at center, rgba(60,179,113,0.3) 0%, transparent 70%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.2, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Confetti particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={`${trigger}-${p.id}`}
            className="absolute rounded-sm"
            style={{
              width: p.size,
              height: p.size * 0.6,
              backgroundColor: p.color,
              left: '50%',
              top: '45%',
            }}
            initial={{ scale: 0, x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.3, 1, 0.8],
              x: [0, p.x * 0.6, p.x],
              y: [0, p.y - 30, p.y + 80],
              rotate: [0, p.rotation],
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              duration: 0.75,
              delay: p.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
