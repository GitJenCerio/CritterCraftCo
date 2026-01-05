import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { showNotification } from '../utils/notifications'
import ProductModal from './ProductModal'
import './ProductCard.css'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [showModal, setShowModal] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    
    showNotification(`${product.name} added to cart!`, 'success')
  }

  const formatPrice = (price) => {
    return `₱${parseFloat(price).toFixed(2)}`
  }

  return (
    <>
      <div className="product-card">
        <div 
          className="product-card-link"
          onClick={() => setShowModal(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setShowModal(true)
            }
          }}
        >
          <div className="product-image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              loading="lazy"
            />
          </div>
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{formatPrice(product.price)}</p>
          </div>
        </div>
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>

      {showModal && (
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  )
}

export default ProductCard


