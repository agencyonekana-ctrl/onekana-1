import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { ArrowRight, Eye, Globe, Radio, Rocket, Star, Zap } from 'lucide-react'
import { useLanguage } from './hooks/useLanguage'
import './App.css'
import './mobile.css'
import { Home, Agence, Expertise, Contact, Blog } from './pages'
import Preloader from './components/Preloader'
import CookiePopup from './components/CookiePopup'

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggleLanguage, t } = useLanguage()
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
    const frame = requestAnimationFrame(() => setMenuOpen(false))
    return () => cancelAnimationFrame(frame)
  }, [location.pathname])

  return (
    <nav className={`navigation ${location.pathname === '/' ? 'home-nav' : 'inner-nav'} ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <picture>
            <source srcSet="/logo.png" media="(prefers-color-scheme: dark)" />
            <img src="/logo-1.png" alt="Onekana Logo" style={{ width: '120px', height: 'auto' }} />
          </picture>
        </Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {/* Mobile close button */}
          {menuOpen && (
            <button
              className="nav-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} style={{ '--i': 0 }}>
            {t({ fr: 'Accueil', en: 'Home' })}
          </Link>
          <Link to="/agence" className={location.pathname === '/agence' ? 'active' : ''} style={{ '--i': 1 }}>
            {t({ fr: "L'Agence", en: 'The Agency' })}
          </Link>
          <Link to="/expertise" className={location.pathname === '/expertise' ? 'active' : ''} style={{ '--i': 2 }}>
            {t({ fr: 'Expertise', en: 'Expertise' })}
          </Link>
          <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''} style={{ '--i': 3 }}>
            {t({ fr: 'Blog', en: 'Blog' })}
          </Link>

          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} style={{ '--i': 5 }}>
            {t({ fr: 'Contact', en: 'Contact' })}
          </Link>
          
          {/* Mobile Lang Toggle */}
          <button 
            className="mobile-lang-toggle" 
            onClick={() => toggleLanguage()}
            style={{ '--i': 5 }}
          >
            <Globe size={20} />
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>

          {/* Mobile-only CTA */}
          <Link to="/contact" className="nav-mobile-cta btn btn-primary" style={{ '--i': 6 }}>
            {t({ fr: 'Nous contacter', en: 'Contact Us' })}
          </Link>
        </div>

        <div className="nav-right">
          <button 
            className="desktop-lang-toggle" 
            onClick={() => toggleLanguage()} 
            aria-label="Toggle language"
          >
            <span className={`lang-option ${lang === 'en' ? 'active' : ''}`}>EN</span>
            <span className={`lang-option ${lang === 'fr' ? 'active' : ''}`}>FR</span>
          </button>

          <Link to="/contact" className="btn btn-primary nav-btn">
            {t({ fr: 'Nous contacter', en: 'Contact Us' })}
          </Link>
          <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span></span>
            <span></span>
          </button>
        </div>
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

// Floating Language Badge Component (Mobile only)
const FloatingLanguageBadge = () => {
  const { lang, toggleLanguage } = useLanguage()

  return (
    <button
      className="floating-lang-badge"
      onClick={() => toggleLanguage()}
      aria-label="Toggle language"
      title={lang === 'fr' ? 'Switch to English' : 'Passer au français'}
    >
      <Globe size={20} strokeWidth={2} />
      <span>{lang.toUpperCase()}</span>
    </button>
  )
}

// Footer Component
const Footer = () => {
  const { t } = useLanguage()
  const [selectedGoal, setSelectedGoal] = useState('visibilite')
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

  const expertiseLinks = [
    'Onekana MediaMove',
    'Onekana Streets',
    'Onekana DOOH',
    'Onekana Connect',
    'Onekana Studio',
    'Onekana Life',
  ]

  const campaignGoals = [
    {
      id: 'visibilite',
      icon: Eye,
      label: t({ fr: 'Visibilité', en: 'Visibility' }),
      description: t({ fr: 'Installer votre marque dans les mouvements quotidiens de la ville.', en: 'Place your brand in the city’s everyday movement.' }),
    },
    {
      id: 'lancement',
      icon: Rocket,
      label: t({ fr: 'Lancement', en: 'Launch' }),
      description: t({ fr: 'Donner à un nouveau produit ou service un départ visible et mémorable.', en: 'Give a new product or service a visible and memorable start.' }),
    },
    {
      id: 'activation',
      icon: Radio,
      label: t({ fr: 'Activation terrain', en: 'Field activation' }),
      description: t({ fr: 'Créer un contact direct avec votre public dans les zones qui comptent.', en: 'Create direct contact with your audience in the zones that matter.' }),
    },
  ]
  const activeGoal = campaignGoals.find((goal) => goal.id === selectedGoal) || campaignGoals[0]

  return (
    <footer className="footer" style={{ position: 'relative' }}>
      {/* CTA Section */}
      <div className="footer-cta">
        <div className="container">
          <div className="footer-campaign-launcher">
            <div className="footer-campaign-copy">
              <div className="footer-campaign-kicker"><Zap size={20} />{t({ fr: 'Démarrer un brief', en: 'Start a brief' })}</div>
              <h2>
                {t({ fr: 'Quel mouvement voulez-vous ', en: 'What movement do you want to ' })}<span className="text-accent">{t({ fr: 'créer ?', en: 'create?' })}</span>
              </h2>
              <p key={activeGoal.id} className="footer-campaign-description">{activeGoal.description}</p>
            </div>

            <div className="footer-campaign-actions">
              <div className="footer-goal-selector" role="group" aria-label={t({ fr: 'Objectif de campagne', en: 'Campaign objective' })}>
                {campaignGoals.map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    className={selectedGoal === goal.id ? 'active' : ''}
                    onClick={() => setSelectedGoal(goal.id)}
                    aria-pressed={selectedGoal === goal.id}
                  >
                    <goal.icon size={19} />
                    <span>{goal.label}</span>
                  </button>
                ))}
              </div>
              <Link to={`/contact?objectif=${activeGoal.id}`} onClick={scrollToTop} className="footer-campaign-submit">
                {t({ fr: 'Préparer ma demande', en: 'Prepare my request' })}<ArrowRight size={19} />
              </Link>
            </div>
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
                <picture>
                  <source srcSet="/logo-1.png" media="(prefers-color-scheme: dark)" />
                  <img src="/logo.png" alt="Onekana Logo" style={{ width: '130px', height: 'auto' }} />
                </picture>
              </Link>
              <p className="footer-description">
                {t({
                  fr: 'Agence de marketing urbain et mobile spécialisée dans la visibilité locale utile, non intrusive et mesurable.',
                  en: 'Urban and mobile marketing agency specializing in useful, non-intrusive, and measurable local visibility.'
                })}
              </p>
              
              <div className="footer-trustpilot">
                <div className="trustpilot-stars">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="tp-star"><Star fill="white" size={14} color="white" /></div>
                  ))}
                </div>
                <span className="trustpilot-text">
                  {t({ fr: 'Excellent ', en: 'Excellent ' })} 
                  <strong>4.9/5</strong> 
                  {t({ fr: ' sur ', en: ' on ' })} 
                  <strong>Trustpilot</strong>
                </span>
              </div>

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
              <h4>{t({ fr: 'Navigation', en: 'Navigation' })}</h4>
              <nav className="footer-nav">
                <Link to="/">{t({ fr: 'Accueil', en: 'Home' })}</Link>
                <Link to="/agence">{t({ fr: "L'Agence", en: 'The Agency' })}</Link>
                <Link to="/expertise">{t({ fr: 'Expertise', en: 'Expertise' })}</Link>
                <Link to="/blog">{t({ fr: 'Blog', en: 'Blog' })}</Link>

                <Link to="/contact">{t({ fr: 'Contact', en: 'Contact' })}</Link>
              </nav>
            </div>

            <div className="footer-col">
              <h4>{t({ fr: "Pôles d'expertise", en: 'Expertise Hubs' })}</h4>
              <nav className="footer-nav">
                {expertiseLinks.map((label) => (
                  <Link key={label} to="/expertise">{label}</Link>
                ))}
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
              <h4>{t({ fr: 'Contact', en: 'Contact' })}</h4>
              <div className="footer-contact">
                <a href="mailto:agencyonekana@gmail.com" className="contact-item">
                  <MailIcon />
                  <span>agencyonekana@gmail.com</span>
                </a>
                <a href="tel:+243986773438" className="contact-item">
                  <PhoneIcon />
                  <span>+243 986 773 438</span>
                </a>
                <div className="contact-item">
                  <MapPinIcon />
                  <span>Avenue Vangu N°2656, Référence Arrêt du Carmel,<br />Quartier Gambela 2, Commune de Lubumbashi</span>
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
              &copy; {new Date().getFullYear()} Onekana. {t({ fr: 'Tous droits réservés.', en: 'All rights reserved.' })}
            </p>
            <div className="footer-bottom-links">
              <Link to="/">{t({ fr: 'Mentions légales', en: 'Legal notices' })}</Link>
              <Link to="/">{t({ fr: 'Politique de confidentialité', en: 'Privacy Policy' })}</Link>
            </div>
            <button className="back-to-top" onClick={scrollToTop} aria-label={t({ fr: 'Retour en haut', en: 'Back to top' })}>
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

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 })
  const [cursorState, setCursorState] = useState('') // 'hovered' or 'link-hovered' or ''

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    let frameId
    const updateOuter = () => {
      setOuterPosition((prev) => {
        const dx = position.x - prev.x
        const dy = position.y - prev.y
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        }
      })
      frameId = requestAnimationFrame(updateOuter)
    }
    frameId = requestAnimationFrame(updateOuter)
    return () => cancelAnimationFrame(frameId)
  }, [position])

  useEffect(() => {
    const addListeners = () => {
      const links = document.querySelectorAll('a, button, [role="button"], .brochure-dropdown, .magnetic-wrap')
      links.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          if (el.classList.contains('btn') || el.classList.contains('btn-hero-primary') || el.classList.contains('btn-hero-secondary')) {
            setCursorState('link-hovered')
          } else {
            setCursorState('hovered')
          }
        })
        el.addEventListener('mouseleave', () => {
          setCursorState('')
        })
      })
    }

    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div 
        className={`cursor-follower ${cursorState}`} 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      <div 
        className={`cursor-follower-outer ${cursorState}`} 
        style={{ left: `${outerPosition.x}px`, top: `${outerPosition.y}px` }} 
      />
    </>
  )
}

// App Content Component (inside Router)
const AppContent = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const { pathname, search } = useLocation()

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
      const showTimer = setTimeout(() => setIsPageLoading(true), 0)

      // Hide preloader after a short delay
      const timer = setTimeout(() => {
        setIsPageLoading(false)
      }, 800) // 800ms for page transitions

      return () => {
        clearTimeout(showTimer)
        clearTimeout(timer)
      }
    }
  }, [pathname, isInitialLoad])

  return (
    <div className={`app ${!isInitialLoad && !isPageLoading ? 'loaded' : ''}`}>
      <CustomCursor />
      
      {/* Floating Language Badge on Mobile */}
      <FloatingLanguageBadge />

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
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/contact" element={<Contact key={search} />} />
          <Route path="/blog" element={<Blog />} />

        </Routes>
      </main>
      <Footer />

      {/* Floating Campaign Button */}
      <FloatingCampaignButton />


      <CookiePopup />
    </div>
  )
}

// Floating Campaign Button Component with Popup
const FloatingCampaignButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

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
        title={t({ fr: "Créer une campagne", en: "Create a campaign" })}
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
              <h3>{t({ fr: "Lancez votre campagne", en: "Launch your campaign" })}</h3>
              <p>{t({ fr: "Choisissez comment vous souhaitez procéder", en: "Choose how you would like to proceed" })}</p>
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
                  <p>{t({ fr: "Créez votre compte professionnel et gérez vos campagnes en toute autonomie", en: "Create your professional account and manage your campaigns independently" })}</p>
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
                  <h4>{t({ fr: "Nous contacter", en: "Contact us" })}</h4>
                  <p>{t({ fr: "Envoyez-nous un message pour obtenir plus d'informations sur nos services", en: "Send us a message to get more information about our services" })}</p>
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
