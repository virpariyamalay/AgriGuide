import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminRoute from './components/admin/AdminRoute'
import PrivateRoute from './components/auth/PrivateRoute'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import CropDetailPage from './pages/CropDetailPage'
import MarketplacePage from './pages/MarketplacePage'
import CartPage from './pages/CartPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import ConfirmOrderPage from './pages/ConfirmOrderPage'
import ProgressPage from './pages/ProgressPage'
import MarketRatesPage from './pages/MarketRatesPage'
import WeatherPage from './pages/WeatherPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ProfilePage from './pages/ProfilePage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import { useWeather } from './contexts/WeatherContext'
import WeatherAlert from './components/weather/WeatherAlert'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { weatherData } = useWeather()
  const { user } = useAuth()
  const [showBanner, setShowBanner] = useState(true)

  return (
    <div className="flex flex-col min-h-screen bg-primary-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Promo Banner with Tailwind Marquee Effect */}
      {showBanner && (
        <div className="w-full py-2.5 font-medium text-sm text-white bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 overflow-hidden relative">
          <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 text-center overflow-hidden">
            <div className="relative w-full">
              <div className="flex whitespace-nowrap animate-marquee">
                <span className="mx-6">🚚 Free Shipping on Orders Above ₹1500</span>
                <span className="mx-6">🎁 5% Discount on Orders Above ₹1000</span>
                <span className="mx-6">🌱 Welcome to AgriGuide - Empowering Modern Farming!</span>
                {/* Duplicate for seamless loop */}
                <span className="mx-6">🚚 Free Shipping on Orders Above ₹1500</span>
                <span className="mx-6">🎁 5% Discount on Orders Above ₹1000</span>
                <span className="mx-6">🌱 Welcome to AgriGuide - Empowering Modern Farming!</span>
              </div>
            </div>
            {/* Close Button */}
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 focus:outline-none p-1 rounded-full bg-indigo-500 bg-opacity-40 hover:bg-opacity-70 transition"
              aria-label="Close promo banner"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <Header />
      <main className="flex-grow py-0 px-0 sm:px-6 lg:px-8">
        {weatherData?.alerts && weatherData.alerts.length > 0 && (
          <WeatherAlert alert={weatherData.alerts[0]} />
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={
            <PrivateRoute>
              <ContactPage />
            </PrivateRoute>
          } />

          {/* Protected Routes */}
          <Route path="/crop/:cropId" element={
            <PrivateRoute>
              <CropDetailPage />
            </PrivateRoute>
          } />
          <Route path="/marketplace" element={
            <PrivateRoute>
              <MarketplacePage />
            </PrivateRoute>
          } />
          <Route path="/cart" element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          } />
          <Route path="/order-success" element={
            <PrivateRoute>
              <OrderSuccessPage />
            </PrivateRoute>
          } />
          <Route path="/confirm-order" element={
            <PrivateRoute>
              <ConfirmOrderPage />
            </PrivateRoute>
          } />
          <Route path="/progress" element={
            <PrivateRoute>
              <ProgressPage />
            </PrivateRoute>
          } />
          <Route path="/market-rates" element={
            <PrivateRoute>
              <MarketRatesPage />
            </PrivateRoute>
          } />
          <Route path="/weather" element={
            <PrivateRoute>
              <WeatherPage />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App