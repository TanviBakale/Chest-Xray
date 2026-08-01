import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { BsSun, BsMoon, BsHeartPulse } from 'react-icons/bs'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/upload', label: 'Upload X-Ray' },
  { path: '/diseases', label: 'Disease Info' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <BsHeartPulse className="w-8 h-8 text-primary-500 group-hover:text-primary-400 transition-colors" />
            <span className="text-xl font-bold gradient-text">MedScan AI</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <BsSun className="w-5 h-5" /> : <BsMoon className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <BsSun className="w-5 h-5" /> : <BsMoon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
