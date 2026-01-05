import { useState, useEffect } from 'react'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Shop from './sections/Shop'
import About from './sections/About'
import Contact from './sections/Contact'
import Cart from './components/Cart'
import './App.css'

function App() {
  const [showCart, setShowCart] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'shop', 'about', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    // Ensure body can scroll
    document.body.style.overflow = ''
    
    // Small delay to ensure DOM is ready and menu is closed
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        // Use scrollIntoView which respects scroll-margin-top CSS property
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        console.warn(`Section with id "${sectionId}" not found`)
      }
    }, 150)
  }

  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Navbar 
            activeSection={activeSection} 
            onNavigate={scrollToSection}
            onCartClick={() => setShowCart(true)}
          />
          
          <main className="main-content">
            <section id="home">
              <Hero onShopClick={() => scrollToSection('shop')} />
            </section>
            
            <section id="shop">
              <Shop />
            </section>
            
            <section id="about">
              <About />
            </section>
            
            <section id="contact">
              <Contact />
            </section>
          </main>

          {showCart && (
            <div className="cart-overlay" onClick={() => setShowCart(false)}>
              <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                  <h2>Your Cart</h2>
                  <button 
                    className="close-cart"
                    onClick={() => setShowCart(false)}
                    aria-label="Close cart"
                  >
                    ×
                  </button>
                </div>
                <Cart onCheckout={() => {
                  setShowCart(false)
                  scrollToSection('contact')
                }} />
              </div>
            </div>
          )}

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
