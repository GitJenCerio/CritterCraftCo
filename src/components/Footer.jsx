import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Critter Craft Co. All Rights Reserved.</p>
        <div className="footer-links">
          <a
            href="https://www.facebook.com/profile.php?id=61556898350697"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
          >
            Facebook
          </a>
          <a
            href="#"
            aria-label="Visit our Instagram page"
          >
            Instagram
          </a>
          <a
            href="#"
            aria-label="Visit our Twitter page"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

