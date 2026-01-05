import { useCart } from '../contexts/CartContext'
import './Cart.css'

function Cart({ onCheckout }) {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart()

  const formatPrice = (price) => {
    return `₱${parseFloat(price).toFixed(2)}`
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <p>Your cart is empty</p>
      </div>
    )
  }

  const total = getCartTotal()

  return (
    <div className="cart-content">
      <div className="cart-items">
        {cart.map((item) => {
          const itemTotal = item.price * item.quantity
          return (
            <div key={item.id || item.name} className="cart-item">
              <div className="item-details">
                <img
                  src={item.image}
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">{formatPrice(item.price)}</p>
                </div>
              </div>
              
              <div className="quantity-control">
                <button
                  onClick={() => updateQuantity(item.id || item.name, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id || item.name, Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button
                  onClick={() => updateQuantity(item.id || item.name, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              
              <div className="item-total">
                {formatPrice(itemTotal)}
              </div>
              
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id || item.name)}
                aria-label="Remove item"
              >
                <img src="/images/icon-delete.png" alt="Delete" />
              </button>
            </div>
          )
        })}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Estimated total</span>
          <span className="total-amount">{formatPrice(total)}</span>
        </div>
        <p className="tax-note">
          Taxes, discount, and shipping calculated at checkout
        </p>
        <button onClick={onCheckout} className="btn btn-primary checkout-btn">
          Check out
        </button>
      </div>
    </div>
  )
}

export default Cart
