import { NavLink } from 'react-router-dom'

export default function BottomNav() {
  const base = 'flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-semibold transition-colors'
  const active = 'text-coral'
  const inactive = 'text-gray-400'

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 safe-bottom z-50">
      <div className="flex max-w-md mx-auto">
        {/* Discover */}
        <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : inactive}`} end>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
          <span>Discover</span>
        </NavLink>

        {/* Search */}
        <NavLink to="/search" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <span>Search</span>
        </NavLink>

        {/* Saved */}
        <NavLink to="/saved" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span>Saved</span>
        </NavLink>
      </div>
    </nav>
  )
}
