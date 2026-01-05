// API Service Layer - Ready for backend integration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  }

  // Add auth token if available
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Call Error:', error)
    throw error
  }
}

// Import products data
import productsData from '../data/products.json'

// Products API
export const productsAPI = {
  getAll: async () => {
    // TODO: Replace with actual API call
    // return apiCall('/api/products')
    
    // Mock data for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(productsData)
      }, 300)
    })
  },

  getById: async (id) => {
    // TODO: Replace with actual API call
    // return apiCall(`/api/products/${id}`)
    
    return productsData.find(p => p.id === parseInt(id))
  }
}

// Cart API
export const cartAPI = {
  get: async () => {
    // TODO: Replace with actual API call
    // return apiCall('/api/cart')
    return []
  },

  add: async (item) => {
    // TODO: Replace with actual API call
    // return apiCall('/api/cart', { method: 'POST', body: JSON.stringify(item) })
    return item
  },

  update: async (itemId, quantity) => {
    // TODO: Replace with actual API call
    // return apiCall(`/api/cart/${itemId}`, { method: 'PUT', body: JSON.stringify({ quantity }) })
    return { id: itemId, quantity }
  },

  remove: async (itemId) => {
    // TODO: Replace with actual API call
    // return apiCall(`/api/cart/${itemId}`, { method: 'DELETE' })
    return { success: true }
  }
}

// Auth API
export const authAPI = {
  login: async (email, password) => {
    // TODO: Replace with actual API call
    // return apiCall('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
    
    // Mock login
    return {
      user: { id: 1, email, name: 'John Doe', role: 'user' },
      token: 'mock-token-123'
    }
  },

  logout: async () => {
    // TODO: Replace with actual API call
    // return apiCall('/api/auth/logout', { method: 'POST' })
    return { success: true }
  },

  register: async (userData) => {
    // TODO: Replace with actual API call
    // return apiCall('/api/auth/register', { method: 'POST', body: JSON.stringify(userData) })
    return { success: true, user: userData }
  }
}

// Contact API
export const contactAPI = {
  submit: async (formData) => {
    // TODO: Replace with actual API call
    // return apiCall('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    return { success: true, message: 'Thank you for your inquiry!' }
  }
}

// Checkout API
export const checkoutAPI = {
  create: async (orderData) => {
    // TODO: Replace with actual API call
    // return apiCall('/api/checkout', { method: 'POST', body: JSON.stringify(orderData) })
    return { success: true, orderId: 'ORD-' + Date.now() }
  }
}

// Payment API
export const paymentAPI = {
  process: async (paymentData) => {
    // TODO: Replace with actual API call
    // return apiCall('/api/payment', { method: 'POST', body: JSON.stringify(paymentData) })
    return { success: true, transactionId: 'TXN-' + Date.now() }
  }
}

