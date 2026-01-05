import { useEffect } from 'react'
import './About.css'

function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="about-page">
      <section className="about-section">
        <div className="about-background">
          <div className="about-top"></div>
          <div className="about-bottom"></div>
        </div>
        
        <div className="container">
          <div className="about-container">
            <div
              className="about-image"
              style={{ backgroundImage: 'url(/images/about-image.png)' }}
            ></div>
            <div className="about-text">
              <h1>About Us</h1>
              <p>
                At Critter Craft Co., we specialize in crafting unique, personalized souvenirs perfect for any special occasion. From custom fridge magnets to personalized chip bags, each item is designed with love to add a memorable touch to your celebrations.
              </p>
              <p>
                We're passionate about turning your ideas into one-of-a-kind keepsakes, ensuring quality and customer satisfaction every step of the way. Let us help make your special moments even more unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

