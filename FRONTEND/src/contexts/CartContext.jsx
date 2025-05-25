import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('agriguide-cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error parsing cart data from localStorage:', error)
        setCartItems([])
      }
    }
  }, [])
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('agriguide-cart', JSON.stringify(cartItems))
  }, [cartItems])
  
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity }]
      }
    })
  }
  
  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      )
    )
  }
  
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }
  
  const clearCart = () => {
    setCartItems([])
  }
  
  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  }
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}