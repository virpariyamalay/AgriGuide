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

    // Check if item is already in cart
    const existingItem = cartItems.find(item =>
      item.product && (item.product._id === product._id || item.product.id === product._id)
    )

    if (existingItem) {
      // If item exists, update the quantity instead of showing "already in cart"
      await updateQuantity(product._id || product.id, existingItem.quantity + quantity)
      return
    }

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
      toast.success(`Added ${quantity} x ${product.name} to cart!`)
    } catch (error) {
      // handle error
    }
  }

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    if (!user?.token) return

    // Find the product in cartItems to check stock and get product name
    const item = cartItems.find(i => i.product && (i.product._id === productId || i.product.id === productId))

    if (!item) {
      toast.error('Item not found in cart')
      return
    }

    if (typeof item.product.stock === 'number' && quantity > item.product.stock) {
      toast.error('Cannot add more than available stock')
      return
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      await removeFromCart(productId)
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
        body: JSON.stringify({ productId, quantity }),
      })
      if (!res.ok) throw new Error('Failed to update cart')
      const data = await res.json()
      setCartItems(data.items)
      setIsCartUpdated(true)
      setTimeout(() => setIsCartUpdated(false), 2000)

      // Show appropriate message based on whether quantity increased or decreased
      const oldQuantity = item.quantity
      if (quantity > oldQuantity) {
        toast.success(`Updated ${item.product.name} quantity to ${quantity}`)
      } else if (quantity < oldQuantity) {
        toast.info(`Updated ${item.product.name} quantity to ${quantity}`)
      }
    } catch (error) {
      toast.error('Failed to update quantity')
    }
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