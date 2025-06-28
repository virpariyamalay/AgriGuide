import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

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

  // Professional navLinks order
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/market-rates', label: 'Market Rates' },
    { to: '/weather', label: 'Weather' },
    { to: '/orders', label: 'My Orders', protected: true },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-20">
        {/* Logo at far left */}
        <Link to="/" className="flex items-center ml-4" style={{ minWidth: 160 }}>
          <img
            src="/logo.png"
            alt="AgriGuide Logo"
            className="h-[200px] w-auto"
            style={{ objectFit: 'contain' }}
          />
        </Link>
        {/* Nav and user/cart at far right */}
        <div className="flex items-center ml-auto space-x-2">
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map(link => (
              (!link.protected || user) && (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium text-base transition-all duration-150
                    ${isActive ? 'bg-primary-100 text-primary-700 font-bold shadow-sm' : 'text-gray-700 dark:text-gray-200 hover:bg-primary-50 hover:text-primary-700'}
                    `
                  }
                >
                  {link.label}
                </NavLink>
              )
            ))}
            {isAdmin() && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium text-base transition-all duration-150
                  ${isActive ? 'bg-primary-100 text-primary-700 font-bold shadow-sm' : 'text-gray-700 dark:text-gray-200 hover:bg-primary-50 hover:text-primary-700'}
                  `
                }
              >
                Admin
              </NavLink>
            )}
          </nav>
          <Link to="/cart" className="flex items-center relative group px-3 py-2 rounded-lg hover:bg-primary-50 transition">
            <FaShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-200 group-hover:text-primary-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-lg hover:bg-primary-50 transition"
                  title="Profile"
                >
                  <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center border border-primary-200">
                    <span className="text-primary-700 font-bold text-lg">
                      {user.fullName ? user.fullName[0].toUpperCase() : user.email[0].toUpperCase()}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-white bg-red-100 hover:bg-red-600 text-base font-medium px-3 py-2 rounded-lg transition shadow-sm border border-red-200 hover:shadow-md"
                  title="Logout"
                >
                  <FiLogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 text-base font-medium px-3 py-2 rounded-lg hover:bg-primary-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-base font-semibold hover:bg-primary-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="Open main menu"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Background overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity" onClick={() => setIsMenuOpen(false)} />
          {/* Slide-down menu */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-b-3xl shadow-2xl p-6 pt-4 flex flex-col min-h-[60vh] animate-slideDown">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <img src="/logo.png" alt="AgriGuide Logo" className="h-10 w-auto" style={{ objectFit: 'contain' }} />
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="text-2xl text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                &times;
              </button>
            </div>
            <nav className="flex flex-col gap-3 flex-1">
              {navLinks.map(link => (
                (!link.protected || user) && (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block text-lg font-semibold px-4 py-3 rounded-xl transition-all duration-150
                      ${isActive ? 'bg-primary-100 text-primary-700 shadow' : 'text-gray-800 dark:text-gray-100 hover:bg-primary-50 hover:text-primary-700'}
                      `
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              ))}
              {isAdmin() && (
                <NavLink
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg font-semibold px-4 py-3 rounded-xl transition-all duration-150
                    ${isActive ? 'bg-primary-100 text-primary-700 shadow' : 'text-gray-800 dark:text-gray-100 hover:bg-primary-50 hover:text-primary-700'}
                    `
                  }
                >
                  Admin
                </NavLink>
              )}
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-3">
              <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-50 text-primary-700 font-semibold text-lg hover:bg-primary-100 transition">
                <FaShoppingCart className="h-6 w-6" />
                Cart
                {totalItems > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold text-lg hover:bg-primary-50 hover:text-primary-700 transition">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center border border-primary-200">
                      <span className="text-primary-700 font-bold text-lg">
                        {user.fullName ? user.fullName[0].toUpperCase() : user.email[0].toUpperCase()}
                      </span>
                    </div>
                    Profile
                  </Link>
                  <button
                    onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-100 text-red-600 font-semibold text-lg hover:bg-red-600 hover:text-white transition border border-red-200"
                    title="Logout"
                  >
                    <FiLogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary-600 text-white font-semibold text-lg hover:bg-primary-700 transition">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary-100 text-primary-700 font-semibold text-lg hover:bg-primary-200 transition">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* Slide-down animation */}
          <style>{`
            @keyframes slideDown {
              0% { transform: translateY(-40px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            .animate-slideDown {
              animation: slideDown 0.3s cubic-bezier(0.4,0,0.2,1);
            }
          `}</style>
        </>
      )}
    </header>
  );
};

export default Header;