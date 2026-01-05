import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load from localStorage on init
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id || cartItem.name === item.name
      )

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += item.quantity || 1
        return updatedCart
      } else {
        return [...prevCart, { ...item, quantity: item.quantity || 1 }]
      }
    })
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        (item.id === itemId || item.name === itemId)
          ? { ...item, quantity }
          : item
      )
    )
  }

  const removeFromCart = (itemId) => {
    setCart(prevCart =>
      prevCart.filter(item => item.id !== itemId && item.name !== itemId)
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartCount = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0)
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * (item.quantity || 0))
    }, 0)
  }

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartTotal
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

