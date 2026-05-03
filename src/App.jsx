import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Rocket } from 'lucide-react'
import './App.css'
import { Home, Agence, Campaigns, Expertise, Portfolio, Contact, Packs } from './pages'
import Preloader from './components/Preloader'

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          {/* Onekana<span className="text-accent">.</span> */}
          <img src="/logo.png" alt="Onekana Logo" style={{ width: '125px', height: 'auto' }} />
        </Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Acceuil
          </Link>

          <Link to="/agence" className={location.pathname === '/agence' ? 'active' : ''}>
            Agence
          </Link>
          <Link to="/expertise" className={location.pathname === '/expertise' ? 'active' : ''}>
            Expertise
          </Link>

          <Link to="/packs" className={location.pathname === '/packs' ? 'active' : ''}>
            Packs
          </Link>

          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contact
          </Link>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

// Social Icons
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
)

const DribbbleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
  </svg>
)

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
)

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
)

// Footer Component
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { name: 'Instagram', icon: <InstagramIcon />, url: '#' },
    // { name: 'YouTube', icon: <YouTubeIcon />, url: '#' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, url: '#' },
    { name: 'Twitter', icon: <TwitterIcon />, url: '#' },
    { name: 'Dribbble', icon: <DribbbleIcon />, url: '#' },
  ]

  return (
    <footer className="footer">
      {/* CTA Section */}
      <div className="footer-cta">
        <div className="container">
          <div className="footer-cta-content">
            <h2>Prêt à démarrer votre campagne ?</h2>
            <p>Discutons de vos idées et créons quelque chose d'extraordinaire ensemble.</p>
            <Link to="/contact" onClick={scrollToTop}
              className="btn btn-primary btn-large">
              Commencer une campagne
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand-col">
              <Link to="/" className="footer-logo">
                {/* Onekana<span className="text-accent">.</span> */}
                <img src="/logo-1.png" alt="Onekana Logo" style={{ width: '130px', height: 'auto' }} />
              </Link>
              <p className="footer-description">
                Agence de marketing urbain et mobile spécialisée dans la visibilité locale
                utile, non intrusive et mesurable.
              </p>
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-icon"
                    aria-label={social.name}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Column */}
            <div className="footer-col">
              <h4>Navigation</h4>
              <nav className="footer-nav">
                <Link to="/">Accueil</Link>
                <Link to="/agence">L'Agence</Link>
                <Link to="/expertise">Expertise</Link>
                <Link to="/packs">Nos Packs</Link>
                <Link to="/contact">Contact</Link>
              </nav>
            </div>

            {/* Services Column */}
            {/* <div className="footer-col">
              <h4>Services</h4>
              <nav className="footer-nav">
                <Link to="/expertise">Stratégie Digitale</Link>
                <Link to="/expertise">Design UI/UX</Link>
                <Link to="/expertise">Développement Web</Link>
                <Link to="/expertise">Branding</Link>
                <Link to="/expertise">Motion Design</Link>
              </nav>
            </div> */}

            {/* Contact Column */}
            <div className="footer-col">
              <h4>Contact</h4>
              <div className="footer-contact">
                <a href="mailto:contact@onekana-agency.com" className="contact-item">
                  <MailIcon />
                  <span>contact@onekana-agency.com</span>
                </a>
                <a href="tel:+33123456789" className="contact-item">
                  <PhoneIcon />
                  <span>+33 1 23 45 67 89</span>
                </a>
                <div className="contact-item">
                  <MapPinIcon />
                  <span>14C Av/Vangu ,Q/Gambella II,<br />Lubumbashi, RDC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom-bar">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {new Date().getFullYear()} Onekana. Tous droits réservés.
            </p>
            <div className="footer-bottom-links">
              <Link to="/">Mentions légales</Link>
              <Link to="/">Politique de confidentialité</Link>
            </div>
            <button className="back-to-top" onClick={scrollToTop} aria-label="Retour en haut">
              <ArrowUpIcon />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// App Content Component (inside Router)
const AppContent = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const { pathname } = useLocation()

  // Initial load preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, 2000) // 2 seconds for initial load

    return () => clearTimeout(timer)
  }, [])

  // Page transition preloader - show on every route change
  useEffect(() => {
    if (!isInitialLoad) {
      // Show preloader on route change
      setIsPageLoading(true)

      // Hide preloader after a short delay
      const timer = setTimeout(() => {
        setIsPageLoading(false)
      }, 800) // 800ms for page transitions

      return () => clearTimeout(timer)
    }
  }, [pathname, isInitialLoad])

  return (
    <div className={`app ${!isInitialLoad && !isPageLoading ? 'loaded' : ''}`}>
      {/* Initial Load Preloader */}
      {isInitialLoad && <Preloader isLoading={isInitialLoad} />}

      {/* Page Transition Preloader */}
      {!isInitialLoad && <Preloader isLoading={isPageLoading} />}

      <ScrollToTop />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agence" element={<Agence />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/expertise" element={<Expertise />} />
          {/* <Route path="/portfolio" element={<Portfolio />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/packs" element={<Packs />} />
        </Routes>
      </main>
      <Footer />

      {/* Floating Campaign Button */}
      <FloatingCampaignButton />
    </div>
  )
}

// Floating Campaign Button Component with Popup
const FloatingCampaignButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const closePopup = () => {
    setIsOpen(false)
  }

  return (
    <div className="floating-campaign-btn">
      <button
        className="btn btn-primary btn-large"
        title="Créer une campagne"
        onClick={togglePopup}
      >
        <Rocket size={32} />
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div className="campaign-popup-overlay" onClick={closePopup}>
          <div className="campaign-popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-btn" onClick={closePopup}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="popup-header">
              <Rocket size={40} className="popup-icon" />
              <h3>Lancez votre campagne</h3>
              <p>Choisissez comment vous souhaitez procéder</p>
            </div>

            <div className="popup-options">
              <a href="http://localhost:5375/" className="popup-option" onClick={closePopup} target="_blank" rel="noopener noreferrer">
                <div className="option-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </div>
                <div className="option-content">
                  <h4>Onekana Business Manager</h4>
                  <p>Créez votre compte professionnel et gérez vos campagnes en toute autonomie</p>
                </div>
                <div className="option-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </a>

              <Link to="/contact" className="popup-option" onClick={closePopup}>
                <div className="option-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className="option-content">
                  <h4>Nous contacter</h4>
                  <p>Envoyez-nous un message pour obtenir plus d'informations sur nos services</p>
                </div>
                <div className="option-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Main App Component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
