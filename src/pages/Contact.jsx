import { useState } from 'react'
import { useEffect } from 'react'
import { contactAPI } from '../services/api'
import { showNotification } from '../utils/notifications'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    contact: '',
    inquiry: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone) => {
    const re = /^[\d\s\-\+\(\)]+$/
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!validateEmail(formData.email)) {
      showNotification('Please enter a valid email address', 'error')
      return
    }

    if (!formData.name || formData.name.trim().length < 2) {
      showNotification('Please enter your name', 'error')
      return
    }

    if (!validatePhone(formData.contact)) {
      showNotification('Please enter a valid contact number', 'error')
      return
    }

    if (!formData.inquiry || formData.inquiry.trim().length < 10) {
      showNotification('Please enter your inquiry (at least 10 characters)', 'error')
      return
    }

    try {
      setLoading(true)
      await contactAPI.submit(formData)
      showNotification('Thank you! We received your inquiry and will get back to you soon.', 'success', 5000)
      setFormData({
        email: '',
        name: '',
        contact: '',
        inquiry: ''
      })
    } catch (error) {
      showNotification('Failed to submit inquiry. Please try again.', 'error')
      console.error('Contact form error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="contact-background">
          <div className="contact-top"></div>
          <div className="contact-bottom"></div>
        </div>
        
        <div className="container">
          <div className="contact-container">
            <div
              className="contact-image"
              style={{ backgroundImage: 'url(/images/contact-image.png)' }}
            ></div>
            
            <div className="contact-info">
              <h1>Contact Us</h1>
              <p>
                If you have any inquiries or concerns, please fill out the form below and we will get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <label htmlFor="email" className="visually-hidden">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />

                <label htmlFor="name" className="visually-hidden">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  minLength="2"
                />

                <label htmlFor="contact" className="visually-hidden">Contact Number</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  placeholder="Contact No."
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />

                <label htmlFor="inquiry" className="visually-hidden">Inquiry</label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  placeholder="Inquiry"
                  rows="4"
                  value={formData.inquiry}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  minLength="10"
                ></textarea>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

