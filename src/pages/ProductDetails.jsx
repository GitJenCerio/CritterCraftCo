import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { productsAPI } from '../services/api'
import { showNotification } from '../utils/notifications'
import './ProductDetails.css'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    window.scrollTo(0, 0)
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await productsAPI.getById(id)
      if (!data) {
        navigate('/shop')
        return
      }
      setProduct(data)
    } catch (error) {
      console.error('Error loading product:', error)
      navigate('/shop')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    })
    showNotification(`${product.name} added to cart!`, 'success')
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  const formatPrice = (price) => {
    return `₱${parseFloat(price).toFixed(2)}`
  }

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return null
  }

  const images = [product.image, ...(product.thumbnails || [])]

  return (
    <div className="product-details-page">
      <div className="container">
        <Link to="/shop" className="back-link">← Back to Shop</Link>
        
        <div className="product-details-container">
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
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
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
              <button className="btn btn-secondary buy-now" onClick={handleBuyNow}>
                Buy Now
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

export default ProductDetails

