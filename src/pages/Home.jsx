import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Move3d, Layers, Network, Eye, Brain, Phone, CheckCircle,
  Car, ArrowRight, Backpack, FileText, Award, BarChart3, Monitor,
  MessageSquareText, Route, ChartNoAxesCombined
} from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

/* ─── Magnetic Button ─── */
const MagneticBtn = ({ children, className, to, ...props }) => {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`
  }

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }

  if (to) {
    return (
      <Link ref={ref} to={to} className={`${className} btn-magnetic-parent`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <div ref={ref} className={`${className} btn-magnetic-parent`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ display: 'inline-block', transition: 'transform 0.15s ease' }}>
      {children}
    </div>
  )
}

/* ─── Scroll Reveal Hook ─── */
const useScrollReveal = (selector) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('active')
        }
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll(selector).forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [selector])
}

/* ─── Spotlight Mouse Mover Helper ─── */
const handleMouseMoveSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
}

/* ══════════════════════════════════════════════════════════
   HERO SECTION — Cinematic full-screen with interactive particles & grid
   ══════════════════════════════════════════════════════════ */
const Hero = () => {
  const canvasRef = useRef(null)
  const { t } = useLanguage()
  const textItems = t({
    fr: ['la Rue.', 'la Ville.', 'votre Marque.', "l'Avenir."],
    en: ['the Street.', 'the City.', 'your Brand.', 'the Future.']
  })
  const [textIndex, setTextIndex] = useState(0)
  const [fade, setFade] = useState(true)

  // Rotating text
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setTextIndex(i => (i + 1) % textItems.length)
        setFade(true)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [textItems.length])

  // Interactive Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    const particles = []

    let mouse = { x: null, y: null, radius: 120 }

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        o: Math.random() * 0.6 + 0.15,
      })
    }

    const handleMouseMoveCanvas = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeaveCanvas = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMoveCanvas)
    window.addEventListener('mouseleave', handleMouseLeaveCanvas)

    let frame
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        // Interactivity: push particles away from cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius
            p.x += (dx / dist) * force * 4
            p.y += (dy / dist) * force * 4
          }
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(234, 0, 1, ${p.o})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > W) p.dx *= -1
        if (p.y < 0 || p.y > H) p.dy *= -1
      })
      frame = requestAnimationFrame(draw)
    }
    draw()

    const handleResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMoveCanvas)
      window.removeEventListener('mouseleave', handleMouseLeaveCanvas)
    }
  }, [])

  return (
    <section className="hero-cinematic">
      <video className="hero-bg-video" autoPlay muted loop playsInline preload="metadata" poster="/images/hero_bg_3d.png" aria-hidden="true">
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-overlay" />
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="cinematic-grid-bg" />
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: -1,
          background: 'radial-gradient(circle at 80% 20%, rgba(234, 0, 1, 0.05) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(234, 0, 1, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}
      />

      {/* Animated background shapes */}
      <div className="hero-bg-shapes">
        <div className="hbs hbs-1" />
        <div className="hbs hbs-2" />
        <div className="hbs hbs-3" />
      </div>

      <div className="container hero-cinematic-inner">
        <div className="hero-badge reveal-up active">
          <span className="badge-dot" />
          {t({ fr: 'Publicité urbaine à Lubumbashi', en: 'Urban advertising in Lubumbashi' })}
        </div>

        <h1 className="hero-headline reveal-up active">
          <span className="split-line-wrap">
            <span className="split-line-inner">{t({ fr: 'La publicité qui fait', en: 'Advertising that makes' })}</span>
          </span>
          <span className="split-line-wrap">
            <span className="split-line-inner">
              {t({ fr: 'bouger', en: 'move' })}&nbsp;
              <span className={`hero-rotating-text ${fade ? 'fade-in' : 'fade-out'}`}>
                {textItems[textIndex]}
              </span>
            </span>
          </span>
        </h1>

        <p className="hero-lead reveal-up active" style={{ transitionDelay: '0.15s' }}>
          {t({ fr: 'Réseau urbain de Publicité — soyez vu, remarqué et mémorisé.', en: 'Urban & mobile advertising — visible, memorized, measurable.' })}
        </p>

        <div className="hero-actions reveal-up active" style={{ transitionDelay: '0.3s' }}>
          <MagneticBtn to="/expertise" className="btn-hero-secondary magnetic-wrap" style={{ position: 'relative', zIndex: 1 }}>
            <ArrowRight size={16} /> {t({ fr: 'Voir nos supports', en: 'View our media' })}
          </MagneticBtn>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>{t({ fr: 'Découvrir', en: 'Discover' })}</span>
        </div>
      </div>

    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   MARQUEE TICKER
   ══════════════════════════════════════════════════════════ */
const Marquee = () => {
  const items = [
    'Affichage Mobile', 'Digi\'Street', 'DOOH', 'Marketing Urbain',
    'Visibilité Locale', 'WhatsApp Marketing', 'Publicité Taxi',
    'Promotion Commerce', 'Impact Trafic', 'Campagnes Ciblées',
  ]

  return (
    <div className="marquee-bar">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot">◆</span> {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   PARTNERS SECTION
   ══════════════════════════════════════════════════════════ */
const AboutPreview = () => {
  useScrollReveal('.about-reveal')
  const { t } = useLanguage()

  return (
    <section className="about-premium section">
      <div className="cinematic-grid-bg" />
      <div className="container">
        <div className="section-eyebrow about-reveal reveal-up">
          {t({ fr: 'À propos', en: 'About' })}
        </div>
        <h2 className="section-heading about-reveal reveal-up" style={{ transitionDelay: '0.1s' }}>
          {t({ fr: 'Une agence de terrain', en: 'A field-first agency' })} <span className="text-accent">{t({ fr: 'mesurable', en: 'built to measure' })}</span>
        </h2>

        <div className="about-grid reveal-stagger about-reveal">
          {/* Card 1 */}
          <div
            className="acard acard-dark card-spotlight"
            onMouseMove={handleMouseMoveSpotlight}
          >
            <div className="acard-number">01</div>
            <div className="acard-icon-wrap">
              <Move3d size={32} strokeWidth={1.5} />
            </div>
            <h3 className="acard-title">{t({ fr: 'Nous activons', en: 'We activate' })}</h3>
            <ul className="acard-list">
              <li><span className="acard-bullet" />{t({ fr: 'les véhicules', en: 'vehicles' })}</li>
              <li><span className="acard-bullet" />{t({ fr: 'les rues', en: 'streets' })}</li>
              <li><span className="acard-bullet" />{t({ fr: 'les écrans', en: 'screens' })}</li>
            </ul>
            <p className="acard-cta">{t({ fr: 'pour créer une visibilité locale utile, mémorisable et non intrusive.', en: 'to create useful, memorable and non-intrusive local visibility.' })}</p>
          </div>

          {/* Card 2 — accent */}
          <div
            className="acard acard-accent card-spotlight"
            onMouseMove={handleMouseMoveSpotlight}
          >
            <div className="acard-number">02</div>
            <div className="acard-icon-wrap">
              <Layers size={32} strokeWidth={1.5} />
            </div>
            <h3 className="acard-title">{t({ fr: 'Notre promesse', en: 'Our promise' })}</h3>
            <div className="promise-chain">
              {[
                { icon: Eye, label: t({ fr: 'Être vu', en: 'Be seen' }) },
                { icon: Brain, label: t({ fr: 'Mémorisé', en: 'Remembered' }) },
                { icon: Phone, label: t({ fr: 'Contacté', en: 'Contacted' }) },
                { icon: CheckCircle, label: t({ fr: 'Choisi', en: 'Chosen' }) },
              ].map(({ label }, i) => (
                <div key={i} className="chain-step">
                  <div className="chain-icon"><CheckCircle size={20} strokeWidth={1.5} /></div>
                  <span>{label}</span>
                  {i < 3 && <div className="chain-arrow">→</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="acard acard-dark card-spotlight"
            onMouseMove={handleMouseMoveSpotlight}
          >
            <div className="acard-number">03</div>
            <div className="acard-icon-wrap">
              <Network size={32} strokeWidth={1.5} />
            </div>
            <h3 className="acard-title">{t({ fr: 'Notre méthode', en: 'Our method' })}</h3>
            <div className="funnel">
              {[
                t({ fr: 'Création', en: 'Creation' }),
                t({ fr: 'Diffusion terrain', en: 'Field activation' }),
                t({ fr: 'Observation', en: 'Observation' }),
                t({ fr: 'Reporting', en: 'Reporting' }),
                t({ fr: 'Optimisation', en: 'Optimization' }),
              ].map((s, i) => (
                <div key={i} className="funnel-step" style={{ width: `${100 - i * 12}%`, opacity: 1 - i * 0.05 }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-cta-wrap about-reveal reveal-up" style={{ transitionDelay: '0.4s' }}>
          <MagneticBtn className="magnetic-wrap">
            <Link to="/agence" className="btn btn-primary about-cta-link">
              {t({ fr: "Découvrir l'agence", en: 'Discover the agency' })} <ArrowRight size={18} />
            </Link>
          </MagneticBtn>
        </div>
      </div>
    </section>
  )
}

const CampaignJourney = () => {
  useScrollReveal('.journey-reveal')
  const { t } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      icon: MessageSquareText,
      label: t({ fr: 'Votre brief', en: 'Your brief' }),
      title: t({ fr: 'Nous clarifions le mouvement à créer.', en: 'We clarify the movement to create.' }),
      description: t({
        fr: 'Objectif, public et zones prioritaires deviennent une direction simple pour la campagne.',
        en: 'Your objective, audience and priority areas become a clear campaign direction.',
      }),
      result: t({ fr: 'Une recommandation adaptée', en: 'A tailored recommendation' }),
      image: SUPPORT_IMAGES.design,
    },
    {
      icon: Route,
      label: t({ fr: 'Le déploiement', en: 'Deployment' }),
      title: t({ fr: 'Votre message entre dans la ville.', en: 'Your message enters the city.' }),
      description: t({
        fr: 'Onekana coordonne les supports, les équipes et les points de contact adaptés au terrain.',
        en: 'Onekana coordinates the media, teams and touchpoints suited to the field.',
      }),
      result: t({ fr: 'Une présence visible et cohérente', en: 'A visible, consistent presence' }),
      image: SUPPORT_IMAGES.backpackMediaStreets,
    },
    {
      icon: ChartNoAxesCombined,
      label: t({ fr: 'Le suivi', en: 'Tracking' }),
      title: t({ fr: 'Vous gardez une lecture claire.', en: 'You keep a clear view.' }),
      description: t({
        fr: 'Les observations terrain et les données utiles sont réunies dans un reporting compréhensible.',
        en: 'Field observations and useful data come together in an easy-to-read report.',
      }),
      result: t({ fr: 'Des enseignements pour la suite', en: 'Insights for what comes next' }),
      image: SUPPORT_IMAGES.reporting,
    },
  ]

  const active = steps[activeStep]
  const ActiveIcon = active.icon

  return (
    <section className="home-journey section" aria-labelledby="home-journey-title">
      <div className="container">
        <div className="home-journey-heading journey-reveal reveal-up">
          <div>
            <div className="section-eyebrow">{t({ fr: 'De l’idée au terrain', en: 'From idea to field' })}</div>
            <h2 id="home-journey-title" className="section-heading">
              {t({ fr: 'Une campagne,', en: 'One campaign,' })}{' '}
              <span className="text-accent">{t({ fr: 'trois temps clairs.', en: 'three clear stages.' })}</span>
            </h2>
          </div>
          <p>
            {t({
              fr: 'Vous partagez votre ambition. Onekana construit, déploie et suit le dispositif.',
              en: 'You share your ambition. Onekana builds, deploys and tracks the campaign.',
            })}
          </p>
        </div>

        <div className="home-journey-shell journey-reveal reveal-up" style={{ transitionDelay: '0.12s' }}>
          <div className="home-journey-tabs" role="tablist" aria-label={t({ fr: 'Étapes de campagne', en: 'Campaign steps' })}>
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <button
                  key={step.label}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === index}
                  aria-controls="home-journey-panel"
                  className={activeStep === index ? 'active' : ''}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="home-journey-index">0{index + 1}</span>
                  <Icon size={21} strokeWidth={1.8} />
                  <span>{step.label}</span>
                </button>
              )
            })}
          </div>

          <div id="home-journey-panel" className="home-journey-panel" role="tabpanel" key={activeStep}>
            <div className="home-journey-media">
              <img src={active.image} alt="" loading="lazy" decoding="async" />
              <span>{t({ fr: 'Étape', en: 'Step' })} 0{activeStep + 1}</span>
            </div>
            <div className="home-journey-copy">
              <ActiveIcon size={28} strokeWidth={1.7} aria-hidden="true" />
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <div className="home-journey-result">
                <CheckCircle size={18} aria-hidden="true" />
                <span>{active.result}</span>
              </div>
              <Link to={activeStep === 0 ? '/contact' : '/expertise'} className="home-journey-link">
                {activeStep === 0
                  ? t({ fr: 'Parler de votre projet', en: 'Discuss your project' })
                  : t({ fr: 'Découvrir les supports', en: 'Discover the media' })}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   WHY LUBUMBASHI — with Staggered spotlight cards
   ══════════════════════════════════════════════════════════ */
const SUPPORT_IMAGES = {
  carFlyers: '/images/onekana/supports/car-flyers.png',
  carScreen: '/images/onekana/supports/car-screen.png',
  tetiere: '/images/onekana/supports/tetiere.png',
  backpackFlag: '/images/onekana/supports/backpack-flag.png',
  backpackMediaStreets: '/images/onekana/supports/backpack-media-streets.png',
  backpackMediaDooh: '/images/onekana/supports/backpack-media-dooh.png',
  carScreenDooh: '/images/onekana/supports/car-screen-dooh.png',
  reporting: '/images/onekana/supports/reporting.png',
  design: '/images/onekana/supports/design-flyers-affiches.png',
  magazine: '/images/onekana/supports/onekana-life-magazine.png',
}

const PillarsSection = () => {
  useScrollReveal('.pillar-reveal')

  const pillars = [
    {
      icon: Car,
      title: 'Onekana MediaMove',
      image: SUPPORT_IMAGES.carFlyers,
      desc: 'Supports mobiles disponibles sur véhicules: panneaux de siège, écrans embarqués et têtières.',
    },
    {
      icon: Backpack,
      title: 'Onekana Streets',
      image: SUPPORT_IMAGES.backpackFlag,
      desc: 'Backpack Flag, écrans mobiles piétons, stands et animations de zones pour créer le contact direct avec le public.',
    },
    {
      icon: Monitor,
      title: 'Onekana DOOH',
      image: SUPPORT_IMAGES.backpackMediaDooh,
      desc: 'Supports digitaux sur site et en mobilité, pensés pour des campagnes visibles et dynamiques.',
    },
    {
      icon: BarChart3,
      title: 'Onekana Connect',
      image: SUPPORT_IMAGES.reporting,
      desc: 'Services marketing mesurables: statistiques, reporting et lecture claire des retombées.',
    },
    {
      icon: Award,
      title: 'Onekana Studio',
      image: SUPPORT_IMAGES.design,
      desc: 'Création de flyers, affiches et concepts visuels adaptés aux supports et au terrain.',
    },
    {
      icon: FileText,
      title: 'Onekana Life',
      image: SUPPORT_IMAGES.magazine,
      desc: 'Le magazine Onekana: contenu, culture urbaine et espace éditorial pour raconter les marques.',
    },
  ]

  return (
    <section className="onekana-pillars section">
      <div className="container">
        <div className="section-eyebrow pillar-reveal reveal-up" style={{ textAlign: 'center' }}>Pôles d'expertise</div>
        <h2 className="section-heading pillar-reveal reveal-up" style={{ textAlign: 'center', transitionDelay: '0.1s' }}>
          Comment votre publicité circule avec <span className="text-accent">Onekana</span>
        </h2>
        <p className="pillars-note pillar-reveal reveal-up" style={{ transitionDelay: '0.15s' }}>
          Des supports physiques, digitaux et créatifs coordonnés pour être vus dans la rue, compris par le public et suivis avec des données utiles.
        </p>

        <div className="pillars-grid pillar-reveal reveal-stagger">
          {pillars.map((pillar, index) => (
            <article key={pillar.title} className="pillar-card card-spotlight" onMouseMove={handleMouseMoveSpotlight}>
              <img src={pillar.image} alt="" className="pillar-image" loading="lazy" decoding="async" />
              <div className="pillar-content">
                <div className="pillar-icon"><pillar.icon size={24} strokeWidth={1.6} /></div>
                <span className="pillar-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const SupportsShowcase = () => {
  useScrollReveal('.support-reveal')

  const supports = [
    { group: 'Onekana MediaMove', title: 'Car Flyers', image: SUPPORT_IMAGES.carFlyers, desc: 'Panneau de siège avec espace flyers pour capter les passagers pendant le trajet.' },
    { group: 'Onekana MediaMove', title: 'Car Screen', image: SUPPORT_IMAGES.carScreen, desc: 'Écran taxi pour diffuser des contenus dynamiques dans les déplacements urbains.' },
    { group: 'Onekana MediaMove', title: 'Têtière', image: SUPPORT_IMAGES.tetiere, desc: "Housse d'appui-tête publicitaire, visible à hauteur de regard pendant le trajet." },
    { group: 'Onekana Streets', title: 'Backpack Flag', image: SUPPORT_IMAGES.backpackFlag, desc: 'Sac à dos drapeau avec distribution de flyers pour rendre une activation visible dans une zone précise.' },
    { group: 'Onekana Streets', title: 'Backpack Media', image: SUPPORT_IMAGES.backpackMediaStreets, desc: 'Sac à dos écran avec distribution de flyers pour une présence mobile et animée.' },
    { group: 'Onekana DOOH', title: 'Backpack Media DOOH', image: SUPPORT_IMAGES.backpackMediaDooh, desc: 'Écran porté pour diffuser des messages digitaux dans les lieux à fort passage.' },
    { group: 'Onekana DOOH', title: 'Car Screen DOOH', image: SUPPORT_IMAGES.carScreenDooh, desc: 'Écran embarqué taxi pour une campagne vidéo visible en mobilité.' },
    { group: 'Onekana Connect', title: 'Statistiques / Reporting', image: SUPPORT_IMAGES.reporting, desc: 'Suivi des actions, synthèse des performances et reporting exploitable.' },
    { group: 'Onekana Studio', title: 'Design flyers / affiches', image: SUPPORT_IMAGES.design, desc: 'Création de visuels prêts à vivre sur les supports terrain et digitaux.' },
    { group: 'Onekana Life', title: 'Magazine Onekana', image: SUPPORT_IMAGES.magazine, desc: "Un format éditorial pour prolonger l'histoire des marques et des lieux." },
  ]

  return (
    <section className="supports-showcase section section-alt">
      <div className="container">
        <div className="section-eyebrow support-reveal reveal-up" style={{ textAlign: 'center' }}>Supports & services</div>
        <h2 className="section-heading support-reveal reveal-up" style={{ textAlign: 'center', transitionDelay: '0.1s' }}>
          Chaque point de contact a son <span className="text-accent">rôle</span>
        </h2>
        <div className="supports-grid support-reveal reveal-stagger">
          {supports.map((support) => (
            <article key={`${support.group}-${support.title}`} className="support-card card-spotlight" onMouseMove={handleMouseMoveSpotlight}>
              <img src={support.image} alt="" className="support-image" loading="lazy" decoding="async" />
              <div className="support-content">
                <span>{support.group}</span>
                <h3>{support.title}</h3>
                <p>{support.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   DIGISTREET — Bold feature section with 3D Orbit
   ══════════════════════════════════════════════════════════ */
function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutPreview />
      <CampaignJourney />
      <PillarsSection />
      <SupportsShowcase />
    </>
  )
}

export default Home
