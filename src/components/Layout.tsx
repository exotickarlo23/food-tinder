import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <div className="flex flex-col h-full max-w-md mx-auto">
      <main className="flex-1 overflow-hidden pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
