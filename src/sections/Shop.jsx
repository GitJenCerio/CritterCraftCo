import ProductGrid from '../components/ProductGrid'
import './Shop.css'

function Shop() {
  return (
    <div className="shop-section">
      <div className="container">
        <h1 className="section-title">Our Products</h1>
        <ProductGrid />
      </div>
    </div>
  )
}

export default Shop

