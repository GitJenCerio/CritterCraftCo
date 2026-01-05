import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { paymentAPI } from '../services/api'
import { showNotification } from '../utils/notifications'
import './Payment.css'

function Payment() {
  const navigate = useNavigate()
  const { cart, getCartTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (cart.length === 0) {
      navigate('/cart')
    }
  }, [cart, navigate])

  const formatPrice = (price) => {
    return `₱${parseFloat(price).toFixed(2)}`
  }

  const handlePayment = async () => {
    try {
      setLoading(true)
      const paymentData = {
        items: cart,
        total: getCartTotal(),
        method: 'e-wallet'
      }
      
      await paymentAPI.process(paymentData)
      showNotification('Payment successful! Redirecting...', 'success', 2000)
      
      setTimeout(() => {
        clearCart()
        navigate('/')
      }, 2000)
    } catch (error) {
      showNotification('Payment failed. Please try again.', 'error')
      console.error('Payment error:', error)
    } finally {
      setLoading(false)
    }
  }

  const total = getCartTotal()

  return (
    <div className="payment-page">
      <div className="container">
        <h1 className="page-title">Payment</h1>
        
        <div className="payment-content">
          <div className="payment-methods">
            <h2>QR and E-wallets</h2>
            <a
              href="https://www.maya.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="method-option"
            >
              MAYA
            </a>
            <div className="or">OR</div>
            <a
              href="https://www.gcash.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="method-option"
            >
              GCASH
            </a>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cart.map((item) => {
                const itemTotal = item.price * item.quantity
                return (
                  <div key={item.id || item.name} className="summary-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                    <span className="item-total">{formatPrice(itemTotal)}</span>
                  </div>
                )
              })}
            </div>
            
            <div className="summary-total">
              <span>Total Amount</span>
              <span className="total-amount">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <div className="payment-actions">
          <button
            onClick={handlePayment}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Payment

