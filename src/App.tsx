import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SwipePage from './pages/SwipePage'
import FavoritesPage from './pages/FavoritesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SwipePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
