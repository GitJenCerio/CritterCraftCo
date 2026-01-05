import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { useEffect, useRef } from 'react'
import './Navbar.css'

function Navbar({ activeSection, onNavigate, onCartClick }) {
  const { getCartCount } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const mobileNavRef = useRef(null)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ]

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(sectionId)
    }
  }

  const toggleMobileMenu = () => {
    const mobileNav = mobileNavRef.current
    if (!mobileNav) return
    
    const isActive = mobileNav.classList.contains('active')
    if (isActive) {
      mobileNav.classList.remove('active')
      document.body.style.overflow = ''
    } else {
      mobileNav.classList.add('active')
      document.body.style.overflow = 'hidden'
    }
  }

  const closeMobileMenu = () => {
    const mobileNav = mobileNavRef.current
    if (mobileNav) {
      mobileNav.classList.remove('active')
      // Ensure body can scroll for navigation
      document.body.style.overflow = ''
    }
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const mobileNav = mobileNavRef.current
      const toggleButton = document.querySelector('.mobile-menu-toggle')
      
      if (
        mobileNav?.classList.contains('active') &&
        !mobileNav.contains(e.target) &&
        !toggleButton?.contains(e.target)
      ) {
        closeMobileMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className="shipping-banner">
        Free shipping for orders 2000 PHP and above!
      </div>
      
      <header className="navbar">
        <div className="navbar-container">
          {/* Centered Logo and Navigation Group */}
          <div className="navbar-center-group">
            {/* Logo */}
            <a 
              href="#home" 
              className="navbar-logo"
              onClick={(e) => {
                handleNavClick(e, 'home')
                closeMobileMenu()
              }}
              aria-label="Critter Craft Co Home"
            >
              <img src="/images/logo.png" alt="Critter Craft Co Logo" />
            </a>

            {/* Desktop Navigation */}
            <nav className="navbar-nav desktop-nav">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Cart Icon */}
          <button 
            className="cart-container" 
            onClick={onCartClick}
            aria-label="View shopping cart"
          >
            <img src="/images/icon-cart.png" alt="Cart" className="cart-icon" />
            {getCartCount() > 0 && (
              <span className="cart-count" aria-live="polite">
                {getCartCount()}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav 
          ref={mobileNavRef}
          className="navbar-nav mobile-nav"
        >
          <div className="mobile-nav-content">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  // Ensure body can scroll
                  document.body.style.overflow = ''
                  // Close menu
                  closeMobileMenu()
                  // Navigate immediately
                  if (onNavigate) {
                    onNavigate(item.id)
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar
