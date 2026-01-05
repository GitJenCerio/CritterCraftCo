import { useEffect } from 'react'
import ProductGrid from '../components/ProductGrid'
import './Shop.css'

function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="shop-page">
      <div className="container">
        <h1 className="page-title">Our Products</h1>
        <ProductGrid />
      </div>
    </div>
  )
}

export default Shop

