import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { checkoutAPI } from '../services/api'
import { showNotification } from '../utils/notifications'
import './Checkout.css'

function Checkout() {
  const navigate = useNavigate()
  const { cart, getCartTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    email: '',
    paymentMethod: '',
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    region: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (cart.length === 0) {
      navigate('/cart')
    }
  }, [cart, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const formatPrice = (price) => {
    return `₱${parseFloat(price).toFixed(2)}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const orderData = {
        ...formData,
        items: cart,
        total: getCartTotal()
      }
      
      await checkoutAPI.create(orderData)
      navigate('/payment')
    } catch (error) {
      showNotification('Failed to process checkout. Please try again.', 'error')
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  const total = getCartTotal()

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Check Out</h1>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-content">
            <div className="checkout-info">
              <h2>Contact</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <h2>Payment</h2>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">Select payment method</option>
                <option value="qr">QR / e-Wallets</option>
                <option value="gcash">GCash</option>
                <option value="maya">Maya</option>
              </select>

              <h2>Billing Address</h2>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select country</option>
                <option value="ph">Philippines</option>
              </select>
              
              <div className="name-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
              >
                <option value="">Select region</option>
                <option value="ncr">National Capital Region</option>
                <option value="luzon">Luzon</option>
                <option value="visayas">Visayas</option>
                <option value="mindanao">Mindanao</option>
              </select>
            </div>

            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-items">
                {cart.map((item) => {
                  const itemTotal = item.price * item.quantity
                  return (
                    <div key={item.id || item.name} className="order-item">
                      <div className="order-item-details">
                        <img src={item.image} alt={item.name} className="order-item-image" />
                        <div>
                          <div className="order-item-name">{item.name}</div>
                          <div className="order-item-price">
                            {formatPrice(item.price)} x {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="order-item-total">{formatPrice(itemTotal)}</div>
                    </div>
                  )
                })}
              </div>
              
              <div className="order-total">
                <span>Total</span>
                <span className="total-amount">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="checkout-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout

