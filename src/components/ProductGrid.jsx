import { useState, useEffect } from 'react'
import { productsAPI } from '../services/api'
import ProductCard from './ProductCard'
import './ProductGrid.css'

function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await productsAPI.getAll()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError('Failed to load products. Please try again later.')
      console.error('Error loading products:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="product-grid-loading">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="product-grid-error">
        <p>{error}</p>
        <button onClick={loadProducts} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>No products available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid

