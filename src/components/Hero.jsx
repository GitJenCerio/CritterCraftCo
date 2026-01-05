import './Hero.css'

function Hero({ onShopClick }) {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-top"></div>
        <div className="hero-bottom"></div>
      </div>
      
      <div className="container hero-content">
        <div className="hero-image-container">
          <img
            src="/images/hero.png"
            alt="Handcrafted items from Critter Craft Co"
            className="hero-image"
            loading="eager"
          />
        </div>
        
        <div className="hero-text">
          <h1>Hello!</h1>
          <p className="lead">
            Welcome to Critter Craft Co! We specialize in creating unique, customized souvenirs perfect for birthdays, christenings, and any special occasion.
            From fridge magnets to personalized chip bags and more, each item is crafted to add a memorable touch to your celebrations. Explore our collection and let us bring your vision to life!
          </p>
          <button onClick={onShopClick} className="btn btn-primary">
            Order Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
