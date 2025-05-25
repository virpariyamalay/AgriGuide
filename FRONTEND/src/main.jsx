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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <WeatherProvider>
          <ProgressProvider>
            <CartProvider>
              <App />
              <ToastContainer position="top-right" autoClose={3000} />
            </CartProvider>
          </ProgressProvider>
        </WeatherProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)