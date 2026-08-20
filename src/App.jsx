import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { ArrowRight, Bot, Eye, Globe, Linkedin, MessageCircle, Radio, Rocket, Send, X, Zap } from 'lucide-react'
import { useLanguage } from './hooks/useLanguage'
import './App.css'
import Home from './pages/Home'
import Preloader from './components/Preloader'
import CookiePopup from './components/CookiePopup'
import TikTokIcon from './components/TikTokIcon'

const Agence = lazy(() => import('./pages/Agence'))
const Expertise = lazy(() => import('./pages/Expertise'))
const Contact = lazy(() => import('./pages/Contact'))
const Journal = lazy(() => import('./pages/Journal'))

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
          <Link to="/journal" className={location.pathname === '/journal' ? 'active' : ''} style={{ '--i': 3 }}>
            {t({ fr: 'Journal', en: 'Journal' })}
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

const CONTACT_EMAIL = 'contact@onekana-agency.com'
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61591640678284'
const LINKEDIN_URL = 'https://www.linkedin.com/in/onekana-agency-officiel-999147429'
const TIKTOK_URL = 'https://www.tiktok.com/@onekanaagencyofficiel?is_from_webapp=1&sender_device=pc'

// Social Icons
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14 8.5h2V5h-2.4C10.7 5 9 6.7 9 9.4V11H7v3.5h2V21h3.8v-6.5h2.7L16 11h-3.2V9.7c0-.8.4-1.2 1.2-1.2Z" />
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
    { name: 'Facebook', icon: <FacebookIcon />, url: FACEBOOK_URL },
    { name: 'LinkedIn', icon: <Linkedin size={20} aria-hidden="true" />, url: LINKEDIN_URL },
    { name: 'TikTok', icon: <TikTokIcon />, url: TIKTOK_URL },
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
              
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-icon"
                    aria-label={social.name}
                    title={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
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
                <Link to="/journal">{t({ fr: 'Journal', en: 'Journal' })}</Link>

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
                <a href={`mailto:${CONTACT_EMAIL}`} className="contact-item">
                  <MailIcon />
                  <span>{CONTACT_EMAIL}</span>
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
  const cursorRef = useRef(null)
  const outerRef = useRef(null)
  const targetPosition = useRef({ x: 0, y: 0 })
  const outerPosition = useRef({ x: 0, y: 0 })
  const [cursorState, setCursorState] = useState('')
  const [enabled, setEnabled] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(min-width: 992px) and (pointer: fine)').matches
  ))

  useEffect(() => {
    const media = window.matchMedia('(min-width: 992px) and (pointer: fine)')
    const handleChange = (event) => setEnabled(event.matches)
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    const handleMouseMove = (e) => {
      targetPosition.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enabled])

  useEffect(() => {
    if (!enabled) return undefined
    let frameId
    const updateOuter = () => {
      const current = outerPosition.current
      current.x += (targetPosition.current.x - current.x) * 0.15
      current.y += (targetPosition.current.y - current.y) * 0.15
      if (outerRef.current) {
        outerRef.current.style.left = `${current.x}px`
        outerRef.current.style.top = `${current.y}px`
      }
      frameId = requestAnimationFrame(updateOuter)
    }
    frameId = requestAnimationFrame(updateOuter)
    return () => cancelAnimationFrame(frameId)
  }, [enabled])

  useEffect(() => {
    if (!enabled) return undefined
    const selector = 'a, button, [role="button"], .magnetic-wrap'
    const handlePointerOver = (event) => {
      const interactive = event.target.closest(selector)
      if (!interactive) return
      setCursorState(interactive.classList.contains('btn') || interactive.classList.contains('btn-hero-secondary') ? 'link-hovered' : 'hovered')
    }
    const handlePointerOut = (event) => {
      const interactive = event.target.closest(selector)
      if (interactive && !interactive.contains(event.relatedTarget)) setCursorState('')
    }

    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerout', handlePointerOut)
    return () => {
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={cursorRef} className={`cursor-follower ${cursorState}`} />
      <div ref={outerRef} className={`cursor-follower-outer ${cursorState}`} />
    </>
  )
}

// App Content Component (inside Router)
const AppContent = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const { pathname, search } = useLocation()
  const previousPath = useRef(pathname)

  // Initial load preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, 2000) // 2 seconds for initial load

    return () => clearTimeout(timer)
  }, [])

  // Page transition preloader - show on every route change
  useEffect(() => {
    if (!isInitialLoad && previousPath.current !== pathname) {
      previousPath.current = pathname
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
    return undefined
  }, [pathname, isInitialLoad])

  return (
    <div className={`app ${!isInitialLoad && !isPageLoading ? 'loaded' : ''}`}>
      <CustomCursor />
      
      {/* Floating Language Badge on Mobile */}
      <FloatingLanguageBadge />

      {/* Initial Load Preloader */}
      {isInitialLoad && <Preloader />}

      {/* Page Transition Preloader */}
      {!isInitialLoad && isPageLoading && <Preloader />}

      <ScrollToTop />
      <Navigation />
      <main>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agence" element={<Agence />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/contact" element={<Contact key={search} />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/blog" element={<Navigate to="/journal" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />

      {/* Floating Campaign Button */}
      <FloatingCampaignButton />


      <CookiePopup />
    </div>
  )
}

const FloatingCampaignButton = () => {
  const { lang, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isSending, setIsSending] = useState(false)
  const [chatError, setChatError] = useState('')
  const aiChatUrl = window.ONEKANA_CONFIG?.aiChatUrl?.trim() || ''
  const label = t({ fr: "Ouvrir l'assistant IA Onekana", en: 'Open the Onekana AI assistant' })

  const handleChatSubmit = async (event) => {
    event.preventDefault()
    const userMessage = message.trim()

    if (!userMessage || !aiChatUrl || isSending) return

    setMessages((current) => [...current, { role: 'user', content: userMessage }])
    setMessage('')
    setChatError('')
    setIsSending(true)

    try {
      const response = await fetch(aiChatUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          language: lang,
        }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message)
      }

      const assistantMessage = result.reply || result.response || result.message
      if (!assistantMessage) {
        throw new Error()
      }

      setMessages((current) => [...current, { role: 'assistant', content: assistantMessage }])
    } catch {
      setChatError(t({
        fr: "L'assistant est momentanément indisponible. Veuillez réessayer.",
        en: 'The assistant is temporarily unavailable. Please try again.',
      }))
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="floating-campaign-btn">
      {isOpen && (
        <section className="ai-chat-panel" role="dialog" aria-modal="false" aria-labelledby="ai-chat-title">
          <header className="ai-chat-header">
            <div className="ai-chat-identity">
              <span className="ai-chat-avatar"><Bot size={21} /></span>
              <div>
                <strong id="ai-chat-title">Onekana Assistant</strong>
                <span>{t({ fr: 'Conseils et orientation', en: 'Advice and guidance' })}</span>
              </div>
            </div>
            <button
              type="button"
              className="ai-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label={t({ fr: 'Fermer le chat', en: 'Close chat' })}
            >
              <X size={20} />
            </button>
          </header>

          <div className="ai-chat-messages" aria-live="polite">
            <div className="ai-chat-message assistant">
              {t({
                fr: 'Bonjour, je suis l’assistant Onekana. Comment pouvons-nous faire circuler votre marque ?',
                en: 'Hello, I am the Onekana assistant. How can we help your brand move through the city?',
              })}
            </div>
            {messages.map((chatMessage, index) => (
              <div className={`ai-chat-message ${chatMessage.role}`} key={`${chatMessage.role}-${index}`}>
                {chatMessage.content}
              </div>
            ))}
            {isSending && (
              <div className="ai-chat-typing" aria-label={t({ fr: 'Réponse en cours', en: 'Reply in progress' })}>
                <span />
                <span />
                <span />
              </div>
            )}
            {chatError && <p className="ai-chat-error" role="alert">{chatError}</p>}
          </div>

          <form className="ai-chat-form" onSubmit={handleChatSubmit}>
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t({ fr: 'Écrivez votre question...', en: 'Write your question...' })}
              aria-label={t({ fr: 'Votre message', en: 'Your message' })}
              maxLength="1000"
            />
            <button
              type="submit"
              disabled={!aiChatUrl || !message.trim() || isSending}
              title={!aiChatUrl ? t({ fr: 'Assistant bientôt disponible', en: 'Assistant coming soon' }) : undefined}
              aria-label={t({ fr: 'Envoyer le message', en: 'Send message' })}
            >
              <Send size={19} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="btn btn-primary btn-large"
        aria-label={isOpen ? t({ fr: 'Fermer le chat', en: 'Close chat' }) : label}
        title={label}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={30} /> : <MessageCircle size={32} />}
      </button>
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
