import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App