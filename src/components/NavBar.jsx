import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HomeIcon, ShoppingBagIcon, ChartBarIcon, BookOpenIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { IoGameControllerOutline } from "react-icons/io5";

function NavBar({ toggleMenu, isMenuOpen }) {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="/logo.png" alt="Game Logo" className="h-8 w-auto mr-3" />
            <span className="font-bold text-xl">Moxie Miner</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
              <HomeIcon className="h-6 w-6 inline-block mr-1" />
              Home
            </Link>
            <Link to="/game" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
              <IoGameControllerOutline className="h-6 w-6 inline-block mr-1" />
              Game
            </Link>
            <Link to="/store" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
              <ShoppingBagIcon className="h-6 w-6 inline-block mr-1" />
              Store
            </Link>
            <Link to="/inventory" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
              <BookOpenIcon className="h-6 w-6 inline-block mr-1" />
              Inventory
            </Link>
            <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
              <UserCircleIcon className="h-6 w-6 inline-block mr-1" />
              Profile
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                <HomeIcon className="h-6 w-6 inline-block mr-2" />
                Home
              </Link>
              <Link to="/game" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                <ShoppingBagIcon className="h-6 w-6 inline-block mr-2" />
                Game
              </Link>
              <Link to="/store" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                <ShoppingBagIcon className="h-6 w-6 inline-block mr-2" />
                Store
              </Link>
              <Link to="/leaderboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                <ChartBarIcon className="h-6 w-6 inline-block mr-2" />
                Leaderboard
              </Link>
              <Link to="/inventory" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                <BookOpenIcon className="h-6 w-6 inline-block mr-2" />
                Inventory
              </Link>
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                <UserCircleIcon className="h-6 w-6 inline-block mr-2" />
                Profile
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default NavBar
