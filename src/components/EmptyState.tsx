interface EmptyStateProps {
  emoji: string
  title: string
  subtitle: string
  action?: { label: string; onClick: () => void }
}

export default function EmptyState({ emoji, title, subtitle, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <span className="text-6xl mb-4">{emoji}</span>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 mb-6">{subtitle}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-coral text-white rounded-full font-semibold shadow-lg active:scale-95 transition-transform"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
