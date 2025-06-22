import { createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './AuthContext'
import { toast } from 'react-toastify'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isCartUpdated, setIsCartUpdated] = useState(false)
  const { user } = useAuth()

  // Fetch cart from backend when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.token) {
        setCartItems([])
        return
      }
      try {
        const res = await fetch('/api/cart', {
          headers: { Authorization: `Bearer ${user.token}` },
          credentials: 'include',
        })
        if (!res.ok) throw new Error('Failed to fetch cart')
        const data = await res.json()
        setCartItems(data?.items || [])
      } catch (error) {
        setCartItems([])
      }
    }
    fetchCart()
  }, [user])

  // Add or update item in cart via backend
  const addToCart = async (product, quantity = 1) => {
    if (!user?.token) return
    // Prevent adding more than available stock
    if (typeof product.stock === 'number' && quantity > product.stock) {
      toast.error('Cannot add more than available stock')
      return
    }
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ productId: product._id || product.id, quantity }),
      })
      if (!res.ok) throw new Error('Failed to add to cart')
      const data = await res.json()
      setCartItems(data.items)
      setIsCartUpdated(true)
      setTimeout(() => setIsCartUpdated(false), 2000)
    } catch (error) {
      // handle error
    }
  }

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    if (!user?.token) return
    // Find the product in cartItems to check stock
    const item = cartItems.find(i => i.product && (i.product._id === productId || i.product.id === productId))
    if (item && typeof item.product.stock === 'number' && quantity > item.product.stock) {
      toast.error('Cannot add more than available stock')
      return
    }
    await addToCart({ _id: productId, stock: item?.product?.stock }, quantity)
  }

  // Remove item from cart via backend
  const removeFromCart = async (productId) => {
    if (!user?.token) return
    try {
      const res = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ productId }),
      })
      if (!res.ok) throw new Error('Failed to remove from cart')
      const data = await res.json()
      setCartItems(data.items)
    } catch (error) {
      // handle error
    }
  }

  // Clear cart via backend
  const clearCart = async () => {
    if (!user?.token) return
    try {
      const res = await fetch('/api/cart/clear', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Failed to clear cart')
      const data = await res.json()
      setCartItems(data.items)
    } catch (error) {
      // handle error
    }
  }

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isCartUpdated
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}