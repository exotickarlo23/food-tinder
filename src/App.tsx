import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SwipePage from './pages/SwipePage'
import SearchPage from './pages/SearchPage'
import SavedPage from './pages/SavedPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SwipePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
