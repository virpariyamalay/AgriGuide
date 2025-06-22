import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CartProvider } from './contexts/CartContext.jsx'
import { WeatherProvider } from './contexts/WeatherContext.jsx'
import { ProgressProvider } from './contexts/ProgressContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { ProductProvider } from './contexts/ProductContext.jsx'
import { AuthProvider } from './contexts/AuthContext'
import { OrderProvider } from './contexts/OrderContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <WeatherProvider>
            <ProgressProvider>
              <ProductProvider>
                <OrderProvider>
                  <CartProvider>
                    <App />
                    <ToastContainer position="top-right" autoClose={3000} />
                  </CartProvider>
                </OrderProvider>
              </ProductProvider>
            </ProgressProvider>
          </WeatherProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)