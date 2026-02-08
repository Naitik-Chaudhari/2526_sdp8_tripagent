import { Link, useLocation } from 'react-router-dom'
import { Plane, Home, Search, Moon, Sun, Menu, X, LogIn, UserPlus } from 'lucide-react'
import { useState } from 'react'

function Navbar({ darkMode, toggleDarkMode }) {
    const location = useLocation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const isActive = (path) => location.pathname === path

    const navLinks = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/search', label: 'Plan Trip', icon: Search },
        { path: '/how-it-works', label: 'How It Works', icon: null },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-sky-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative bg-white dark:bg-gray-800 rounded-lg p-1.5">
                                <Plane className="h-6 w-6 text-blue-500" />
                            </div>
                        </div>
                        <span className="text-xl font-bold text-gray-800 dark:text-white">
                            Trip<span className="text-blue-500">Agent</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive(path)
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                {Icon && <Icon className="h-4 w-4" />}
                                <span>{label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-3">
                        {/* Dark mode toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        {/* Login Button */}
                        <Link
                            to="/login"
                            className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm font-medium transition-colors"
                        >
                            <LogIn className="h-4 w-4" />
                            Login
                        </Link>

                        {/* Sign Up Button */}
                        <Link
                            to="/signup"
                            className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-full text-sm font-semibold hover:from-blue-600 hover:to-sky-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                        >
                            <UserPlus className="h-4 w-4" />
                            Sign Up
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                        {navLinks.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive(path)
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                {Icon && <Icon className="h-5 w-5" />}
                                <span>{label}</span>
                            </Link>
                        ))}

                        {/* Mobile Auth Links */}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                            <Link
                                to="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <LogIn className="h-5 w-5" />
                                <span>Login</span>
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-sky-500 text-white"
                            >
                                <UserPlus className="h-5 w-5" />
                                <span>Sign Up</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar