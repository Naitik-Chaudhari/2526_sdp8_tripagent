import { Link, useLocation } from 'react-router-dom'
import { Plane, Home, Search } from 'lucide-react'

function Navbar() {
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <Plane className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-800">TripAgent</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${isActive('/')
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                        </Link>
                        <Link
                            to="/search"
                            className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${isActive('/search')
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Search className="h-4 w-4" />
                            <span>Search</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar