import { useState, useEffect } from 'react'
import './ProductModal.css'

function ProductModal({ product, onClose, onAddToCart }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const images = [product.image, ...(product.thumbnails || [])]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const formatPrice = (price) => {
    return `₱${parseFloat(price).toFixed(2)}`
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart()
    }
    onClose()
  }

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="modal-content-wrapper">
          <div className="product-images">
            <div className="main-image-wrapper">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="main-image"
              />
              {images.length > 1 && (
                <>
                  <button
                    className="image-nav-btn prev"
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                  >
                    &#9664;
                  </button>
                  <button
                    className="image-nav-btn next"
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    aria-label="Next image"
                  >
                    &#9654;
                  </button>
                </>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="thumbnail-container">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price-large">{formatPrice(product.price)}</p>
            
            <div className="quantity-section">
              <label htmlFor="modal-quantity">Quantity:</label>
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  id="modal-quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary add-to-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>

            <div className="product-description-section">
              <h2>Description</h2>
              <p className="product-description">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal

