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
  const [showNotification, setShowNotification] = useState(false)
  const { weatherData } = useWeather()
  const { user } = useAuth()

  useEffect(() => {
    const askForPermission = () => {
      if ('Notification' in window) {
        Notification.requestPermission()
          .then(permission => {
            if (permission === 'granted') {
              setTimeout(() => {
                setShowNotification(true)
                setTimeout(() => setShowNotification(false), 5000)
              }, 10000)
            }
          })
      }
    }
    
    askForPermission()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-primary-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
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
      
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-primary-600 dark:bg-primary-700 text-white p-4 rounded-lg shadow-md animate-slide-up max-w-xs z-50">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg\" className="h-6 w-6\" fill="none\" viewBox="0 0 24 24\" stroke="currentColor">
                <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1" />
              </svg>
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-white">Farming Reminder</p>
              <p className="mt-1 text-sm text-white">Time to water your tomatoes! They need attention today.</p>
              <div className="mt-2">
                <button 
                  onClick={() => setShowNotification(false)}
                  className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-primary-600 dark:bg-primary-700 rounded-md inline-flex text-white hover:text-gray-200 focus:outline-none"
                onClick={() => setShowNotification(false)}
              >
                <span className="sr-only">Close</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App