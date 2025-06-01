import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/market-rates', label: 'Market Rates' },
    { to: '/progress', label: 'My Progress' },
    { to: '/weather', label: 'Weather' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/logo.svg" alt="AgriGuide Logo" className="h-10" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 px-1 py-2 text-sm font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-b-2 hover:border-primary-400 px-1 py-2 text-sm font-medium transition duration-150 ease-in-out'
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            {isAdmin() && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 px-1 py-2 text-sm font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-b-2 hover:border-primary-400 px-1 py-2 text-sm font-medium transition duration-150 ease-in-out'
                }
              >
                Admin
              </NavLink>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>

            <Link to="/cart" className="flex items-center space-x-2 px-2 py-1.5 rounded-full text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition duration-300 text-sm relative">
              <FaShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">
                      {user.fullName ? user.fullName[0].toUpperCase() : user.email[0].toUpperCase()}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="flex items-center justify-center relative">
                <FaShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600'
                    : 'block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50'
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            {isAdmin() && (
              <NavLink
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600'
                    : 'block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50'
                }
              >
                Admin
              </NavLink>
            )}
            
            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50"
            >
              {theme === 'dark' ? 'Light Mode 🌞' : 'Dark Mode 🌙'}
            </button>
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;