import { NavLink } from 'react-router-dom'

export default function BottomNav() {
  const base = 'flex-1 flex flex-col items-center justify-center gap-1 py-3 text-xs font-semibold transition-colors'
  const active = 'text-brand-500'
  const inactive = 'text-gray-400'

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-lg border-t border-brand-100 safe-bottom z-50">
      <div className="flex max-w-md mx-auto">
        <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : inactive}`} end>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
          <span>Swipe</span>
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Favoriti</span>
        </NavLink>
      </div>
    </nav>
  )
}
