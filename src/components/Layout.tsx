import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 min-h-0 flex flex-col max-w-md mx-auto w-full safe-top">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
