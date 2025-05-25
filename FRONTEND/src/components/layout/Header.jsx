import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useWeather } from '../../contexts/WeatherContext'
import { useTheme } from '../../contexts/ThemeContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const { weatherData } = useWeather()
  const { theme, toggleTheme } = useTheme()
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/logo.svg" 
                  alt="AgriGuide Logo" 
                  className="h-10" 
                />
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                ? "text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 px-1 py-2 text-sm font-medium" 
                : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-b-2 hover:border-primary-400 px-1 py-2 text-sm font-medium transition duration-150 ease-in-out"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/marketplace" 
              className={({ isActive }) => 
                isActive 
                ? "text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 px-1 py-2 text-sm font-medium" 
                : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-b-2 hover:border-primary-400 px-1 py-2 text-sm font-medium transition duration-150 ease-in-out"
              }
            >
              Marketplace
            </NavLink>
            <NavLink 
              to="/market-rates" 
              className={({ isActive }) => 
                isActive 
                ? "text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 px-1 py-2 text-sm font-medium" 
                : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-b-2 hover:border-primary-400 px-1 py-2 text-sm font-medium transition duration-150 ease-in-out"
              }
            >
              Market Rates
            </NavLink>
            <NavLink 
              to="/progress" 
              className={({ isActive }) => 
                isActive 
                ? "text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 px-1 py-2 text-sm font-medium" 
                : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-b-2 hover:border-primary-400 px-1 py-2 text-sm font-medium transition duration-150 ease-in-out"
              }
            >
              My Progress
            </NavLink>
            <NavLink 
              to="/orders" 
              className={({ isActive }) => 
                isActive 
                ? "text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 px-1 py-2 text-sm font-medium" 
                : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-b-2 hover:border-primary-400 px-1 py-2 text-sm font-medium transition duration-150 ease-in-out"
              }
            >
              My Orders
            </NavLink>
            
            {weatherData?.current && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center">
                  {weatherData.current.temp > 25 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a.75.75 0 01.75.75v.5a.75.75 0 11-1.5 0v-.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-.353.353a.75.75 0 101.06 1.06l.353-.353zM4.464 15.657a.75.75 0 10-1.06-1.06l-.354.353a.75.75 0 001.06 1.06l.354-.353zM18 10a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 015 10zM15.657 14.596a.75.75 0 010 1.06l-.353.354a.75.75 0 01-1.06-1.06l.353-.354a.75.75 0 011.06 0zM4.464 4.343a.75.75 0 010 1.06L4.11 5.757a.75.75 0 01-1.06-1.06l.353-.354a.75.75 0 011.06 0z" />
                    </svg>
                  ) : weatherData.current.temp < 15 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 2a1 1 0 011 1v1.586l1.293-1.293a1 1 0 111.414 1.414L10.414 6H12a1 1 0 110 2h-1.586l1.293 1.293a1 1 0 01-1.414 1.414L9 9.414V11a1 1 0 11-2 0V9.414L5.707 10.707a1 1 0 01-1.414-1.414L5.586 8H4a1 1 0 110-2h1.586L4.293 4.707a1 1 0 011.414-1.414L7 4.586V3a1 1 0 011-1z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                    </svg>
                  )}
                  {Math.round(weatherData.current.temp)}°C
                </span>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            <Link to="/cart" className="relative group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent-500 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          
          <div className="flex items-center sm:hidden space-x-4">
            <Link to="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent-500 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) => 
              isActive 
              ? "block pl-3 pr-4 py-2 border-l-4 border-primary-500 text-base font-medium text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900" 
              : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) => 
              isActive 
              ? "block pl-3 pr-4 py-2 border-l-4 border-primary-500 text-base font-medium text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900" 
              : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/market-rates"
            className={({ isActive }) => 
              isActive
              ? "block pl-3 pr-4 py-2 border-l-4 border-primary-500 text-base font-medium text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900"
              : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Market Rates
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) => 
              isActive 
              ? "block pl-3 pr-4 py-2 border-l-4 border-primary-500 text-base font-medium text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900" 
              : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            My Progress
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive
              ? "block pl-3 pr-4 py-2 border-l-4 border-primary-500 text-base font-medium text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900"
              : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            My Orders
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header