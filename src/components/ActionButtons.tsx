import { motion } from 'framer-motion'

interface ActionButtonsProps {
  onNope: () => void
  onLike: () => void
  disabled: boolean
}

export default function ActionButtons({ onNope, onLike, disabled }: ActionButtonsProps) {
  return (
    <div className="flex justify-center gap-12 py-3">
      {/* Skip button */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={onNope}
        disabled={disabled}
        className="flex flex-col items-center gap-1 disabled:opacity-40 transition-opacity"
      >
        <div className="w-16 h-16 rounded-full bg-nope/10 border-2 border-nope text-nope flex items-center justify-center shadow-md">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <span className="text-xs font-bold text-nope uppercase tracking-wide">Preskoči</span>
      </motion.button>

      {/* Save button */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={onLike}
        disabled={disabled}
        className="flex flex-col items-center gap-1 disabled:opacity-40 transition-opacity"
      >
        <div className="w-16 h-16 rounded-full bg-like/10 border-2 border-like text-like flex items-center justify-center shadow-md">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-like uppercase tracking-wide">Spremi</span>
      </motion.button>
    </div>
  )
}
