import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Move3d, Layers, Network, Eye, Brain, Phone, CheckCircle,
  Car, Store, Smartphone, Target, ArrowRight, Backpack, Play,
  MousePointer, Sun, Check, Star, FileText,
  TrendingUp, Users, Award, MapPin, Radio, BarChart3, CreditCard, ShieldCheck, Wallet, Monitor
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
      <video className="hero-bg-video" autoPlay muted loop playsInline aria-hidden="true">
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
          {t({ fr: 'Agence #1 à Lubumbashi', en: '#1 Agency in Lubumbashi' })}
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

        {/* Trustpilot Block */}
        <div className="hero-trustpilot reveal-up active" style={{ transitionDelay: '0.2s' }}>
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
const Partners = () => {
  const { t } = useLanguage()
  useScrollReveal('.partners-reveal')

  const partnerLogos = [
    { name: 'Rawbank', logo: <img src="/images/partners/rawbank-logo.png" alt="Rawbank" className="partner-img" /> },
    { name: 'Vodacom', logo: <img src="/images/partners/vodacom-logo.png" alt="Vodacom" className="partner-img" /> },
    { name: 'Airtel', logo: <img src="/images/partners/airtel-logo.png" alt="Airtel" className="partner-img" /> },
    { name: 'Orange', logo: <img src="/images/partners/orange-logo.png" alt="Orange" className="partner-img" /> },
    { name: 'Canal+', logo: <img src="/images/partners/canalplus-logo.png" alt="Canal+" className="partner-img" /> },
    { name: 'BCDC', logo: <img src="/images/partners/equity-bank-logo.png" alt="Equity BCDC" className="partner-img" /> },
  ]

  return (
    <section className="partners-section section">
      <div className="container">
        <div className="section-eyebrow partners-reveal reveal-up" style={{ textAlign: 'center' }}>
          {t({ fr: 'Partenaires', en: 'Partners' })}
        </div>
        <h2 className="section-heading partners-reveal reveal-up" style={{ textAlign: 'center', transitionDelay: '0.1s', marginBottom: '3rem' }}>
          {t({ fr: 'Ils nous font confiance', en: 'They Trust Us' })}
        </h2>
        <div className="partners-logos-container partners-reveal reveal-up" style={{ transitionDelay: '0.2s' }}>
          <div className="partners-track">
            {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((p, i) => (
              <div key={i} className="partner-card">
                {p.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   ABOUT SECTION — with staggered cards & Spotlight hover
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

/* ══════════════════════════════════════════════════════════
   WHY LUBUMBASHI — with Staggered spotlight cards
   ══════════════════════════════════════════════════════════ */
const WhyLubumbashi = () => {
  const { t } = useLanguage()
  useScrollReveal('.wl-reveal')

  const reasons = [
    {
      icon: Car,
      title: t({ fr: 'Médias mobiles', en: 'Mobile Media' }),
      text: t({
        fr: 'Les taxis sont des médias mobiles permanents, circulant partout dans la ville.',
        en: 'Taxis are permanent mobile media, circulating everywhere in the city.'
      })
    },
    {
      icon: Store,
      title: t({ fr: 'Commerces de proximité', en: 'Local Shops' }),
      text: t({
        fr: 'Les commerces concentrent l\'attention et drainent un trafic qualifié quotidien.',
        en: 'Shops concentrate attention and drain qualified daily traffic.'
      })
    },
    {
      icon: Smartphone,
      title: t({ fr: 'WhatsApp #1', en: 'WhatsApp #1' }),
      text: t({
        fr: 'WhatsApp est le canal numéro 1 de conversion dans notre marché.',
        en: 'WhatsApp is the number 1 conversion channel in our market.'
      })
    },
    {
      icon: Eye,
      title: t({ fr: 'Faible concurrence', en: 'Low Competition' }),
      text: t({
        fr: 'Peu de concurrence sur le DOOH & médias mobiles — une opportunité réelle.',
        en: 'Little competition on DOOH & mobile media — a real opportunity.'
      })
    },
    {
      icon: Target,
      title: t({ fr: 'Forte mémorisation', en: 'High Memorization' }),
      text: t({
        fr: 'Les supports utiles et visibles génèrent une mémorisation supérieure.',
        en: 'Useful and visible mediums generate superior recall.'
      })
    },
  ]

  return (
    <section id="why-lubumbashi" className="wl-section section">
      <div className="wl-bg-accent" />
      <div className="container">
        <div className="section-eyebrow wl-reveal reveal-up" style={{ color: 'rgba(10,10,10,0.6)' }}>
          {t({ fr: 'Pourquoi Onekana', en: 'Why Onekana' })}
        </div>
        <h2 className="section-heading wl-reveal reveal-up" style={{ color: '#0a0a0a', transitionDelay: '0.1s' }}>
          {t({ fr: 'À Lubumbashi ?', en: 'In Lubumbashi?' })}
        </h2>
        <p className="wl-subtitle wl-reveal reveal-up" style={{ color: '#555555', transitionDelay: '0.2s' }}>
          {t({ fr: 'Onekana est conçue pour le terrain lushois', en: 'Onekana is designed for the Lubumbashi market' })}
        </p>

        <div className="wl-cards-grid wl-reveal reveal-stagger">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="wl-card card-spotlight"
              onMouseMove={handleMouseMoveSpotlight}
            >
              <div className="wl-card-icon">
                <r.icon size={28} strokeWidth={1.5} />
              </div>
              <h4 className="wl-card-title">{r.title}</h4>
              <p className="wl-card-text">{r.text}</p>
            </div>
          ))}
        </div>

        <div className="wl-result wl-reveal reveal-up" style={{ transitionDelay: '0.6s' }}>
          <ArrowRight size={24} strokeWidth={2} />
          <p><strong>{t({ fr: 'Résultat :', en: 'Result:' })}</strong> {t({ fr: "plus d'impact dans la masse de sollicitations publicitaires", en: 'more impact in the mass of advertising messages' })}</p>
        </div>
      </div>
    </section>
  )
}

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
              <img src={pillar.image} alt="" className="pillar-image" loading="lazy" />
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
              <img src={support.image} alt="" className="support-image" loading="lazy" />
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
const Digistreet = () => {
  useScrollReveal('.ds-reveal')
  const { t } = useLanguage()

  const features = [
    { icon: Backpack, label: t({ fr: 'Sac à dos', en: 'Backpack display' }), sub: t({ fr: 'Écran LED haute luminosité', en: 'High-brightness LED screen' }) },
    { icon: Play, label: t({ fr: 'Vidéo/Animation', en: 'Video/Animation' }), sub: t({ fr: 'Contenus dynamiques', en: 'Dynamic content' }) },
    { icon: MousePointer, label: t({ fr: 'Interaction directe', en: 'Direct interaction' }), sub: t({ fr: 'Engagement immédiat', en: 'Immediate engagement' }) },
    { icon: Sun, label: t({ fr: 'Jour & nuit', en: 'Day & night' }), sub: t({ fr: 'Visibilité 24/7', en: '24/7 visibility' }) },
  ]

  return (
    <section id="digistreet" className="ds-section section">
      <div className="container">
        <div className="ds-layout">
          <div className="ds-left ds-reveal reveal-left">
            <div className="section-eyebrow" style={{ color: 'var(--color-accent)' }}>
              {t({ fr: 'Innovation Publicitaire', en: 'Advertising Innovation' })}
            </div>
            <h2 className="section-heading">
              Digi'<span className="text-accent">Street</span>
            </h2>
            <p className="ds-lead">
              {t({
                fr: "L'affichage mobile qui s'impose là où les gens vivent, se déplacent et s'arrêtent.",
                en: "Mobile advertising that stands out where people live, move and stop."
              })}
            </p>
            <div className="ds-features">
              {features.map((f, i) => (
                <div key={i} className="ds-feature">
                  <div className="ds-feature-icon"><f.icon size={22} strokeWidth={1.5} /></div>
                  <div>
                    <strong>{f.label}</strong>
                    <span>{f.sub}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="ds-objective">
              <Target size={20} strokeWidth={2} />
              <span>
                <strong>{t({ fr: 'Objectif :', en: 'Goal:' })}</strong> {t({ fr: 'impact visuel fort, contact direct, mémorisation maximale', en: 'strong visual impact, direct contact, maximum recall' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   SERVICES STRIP — with spotlight cards
   ══════════════════════════════════════════════════════════ */
const ServicesStrip = () => {
  useScrollReveal('.ss-reveal')

  const services = [
    { icon: Radio, title: 'Affichage DOOH', desc: 'Écrans LED mobiles en zones à fort trafic' },
    { icon: Car, title: 'Pub Taxi', desc: 'Branding sur flotte de taxis urbains' },
    { icon: Smartphone, title: 'WhatsApp Mktg', desc: 'Campagnes ciblées sur le canal n°1' },
    { icon: BarChart3, title: 'Analytics', desc: 'Mesure précise de vos retombées' },
    { icon: MapPin, title: 'Géolocalisation', desc: 'Ciblage hyper-local par quartier' },
    { icon: Award, title: 'Branding', desc: 'Identité visuelle forte et mémorable' },
  ]

  return (
    <section className="ss-section section">
      <div className="container">
        <div className="section-eyebrow ss-reveal reveal-up" style={{ textAlign: 'center' }}>Nos Services</div>
        <h2 className="section-heading ss-reveal reveal-up" style={{ textAlign: 'center', transitionDelay: '0.1s' }}>
          Ce que nous faisons
        </h2>

        <div className="ss-grid ss-reveal reveal-stagger">
          {services.map((s, i) => (
            <div
              key={i}
              className="ss-card card-spotlight"
              onMouseMove={handleMouseMoveSpotlight}
            >
              <div className="ss-card-top">
                <div className="ss-icon"><s.icon size={28} strokeWidth={1.5} /></div>
                <div className="ss-num">0{i + 1}</div>
              </div>
              <h4 className="ss-title">{s.title}</h4>
              <p className="ss-desc">{s.desc}</p>
              <div className="ss-hover-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   PAYMENT SECTION — Modern payment options overview
   ══════════════════════════════════════════════════════════ */
const PaymentSection = () => {
  const { t } = useLanguage()
  useScrollReveal('.pay-reveal')

  const payments = [
    {
      type: 'image',
      logos: [
        '/images/partners/airtel-money-logo.png',
        '/images/partners/orange-money-logo.png',
        '/images/partners/mpesa-logo.png', // M-Pesa is Vodacom
        '/images/partners/afrimoney-logo.png'
      ],
      title: t({ fr: 'Mobile Money', en: 'Mobile Money' }),
      desc: t({
        fr: 'M-Pesa, Airtel Money, Orange Money. Simple et instantané.',
        en: 'M-Pesa, Airtel Money, Orange Money. Simple & instant.'
      }),
      color: '#eab308'
    },
    {
      type: 'image',
      logos: [
        '/images/partners/visa-logo.png',
        '/images/partners/mastercard-logo.png'
      ],
      title: t({ fr: 'Cartes de Crédit', en: 'Credit Cards' }),
      desc: t({
        fr: 'Visa, Mastercard acceptées de manière sécurisée.',
        en: 'Visa, Mastercard accepted securely.'
      }),
      color: '#3b82f6'
    },
    {
      type: 'icon',
      icon: Wallet,
      title: t({ fr: 'Virement & Cash', en: 'Transfer & Cash' }),
      desc: t({
        fr: 'Virements bancaires nationaux/internationaux, ou paiement physique.',
        en: 'National/international bank transfers, or physical payments.'
      }),
      color: '#10b981'
    }
  ]

  return (
    <section className="payment-section section section-alt">
      <div className="container">
        <div className="section-eyebrow pay-reveal reveal-up" style={{ textAlign: 'center' }}>
          {t({ fr: 'Solutions de Paiement', en: 'Payment Solutions' })}
        </div>
        <h2 className="section-heading pay-reveal reveal-up" style={{ textAlign: 'center', transitionDelay: '0.1s', marginBottom: '1.5rem' }}>
          {t({ fr: 'Payez en toute ', en: 'Pay with absolute ' })}<span className="text-accent">{t({ fr: 'simplicité', en: 'simplicity' })}</span>
        </h2>
        <p className="pay-subtitle pay-reveal reveal-up" style={{ textAlign: 'center', transitionDelay: '0.15s', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', color: 'var(--color-text-muted)' }}>
          {t({
            fr: 'Nous proposons une large gamme de méthodes de paiement locales et internationales adaptées à vos besoins professionnels.',
            en: 'We offer a wide range of local and international payment methods tailored to your business needs.'
          })}
        </p>

        <div className="payment-methods-grid pay-reveal reveal-stagger">
          {payments.map((p, i) => (
            <div
              key={i}
              className="payment-method-card card-spotlight"
              onMouseMove={handleMouseMoveSpotlight}
            >
              {p.type === 'image' ? (
                <div className="payment-logos-showcase">
                  {p.logos.map((logo, idx) => (
                    <img key={idx} src={logo} alt="Payment Logo" className="payment-brand-logo-large" />
                  ))}
                </div>
              ) : (
                <div className="payment-icon-wrap" style={{ '--icon-color': p.color }}>
                  <p.icon size={26} strokeWidth={1.5} style={{ color: p.color }} />
                </div>
              )}
              <h4 className="payment-method-name">{p.title}</h4>
              <p className="payment-method-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="payment-trust-badges pay-reveal reveal-up" style={{ transitionDelay: '0.4s' }}>
          <div className="payment-trust-badge">
            <ShieldCheck size={16} /> {t({ fr: 'Transactions 100% sécurisées', en: '100% Secure Transactions' })}
          </div>
          <div className="payment-trust-badge" style={{ marginLeft: '1rem' }}>
            <Check size={16} /> {t({ fr: 'Facturation transparente', en: 'Transparent Invoicing' })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   TESTIMONIALS — double marquee: two rows scrolling in opposite directions
   ══════════════════════════════════════════════════════════ */
const Testimonials = () => {
  const { t } = useLanguage()

  const testimonials = [
    {
      name: 'Jean-Bosco M.',
      role: t({ fr: 'Gérant, Supermarché', en: 'Manager, Supermarket' }),
      text: t({
        fr: "Depuis que nous utilisons les supports mobiles Onekana, notre fréquentation a augmenté le weekend. Un investissement qui se voit.",
        en: "Since we started using Onekana mobile media, our weekend traffic has increased. An investment people notice."
      }),
      stars: 5,
      avatar: 'JB'
    },
    {
      name: 'Nadia K.',
      role: t({ fr: 'Directrice Marketing', en: 'Marketing Director' }),
      text: t({
        fr: "Une approche innovante qui nous a permis de toucher notre cible directement dans les quartiers populaires.",
        en: 'An innovative approach that allowed us to reach our target audience directly in popular neighborhoods.'
      }),
      stars: 5,
      avatar: 'NK'
    },
    {
      name: 'Dieudonné T.',
      role: t({ fr: 'Fondateur, Startup', en: 'Founder, Startup' }),
      text: t({
        fr: "Le suivi est clair et l'équipe Onekana est très réactive. La campagne terrain a vraiment renforcé notre présence locale.",
        en: 'The reporting is clear and the Onekana team is very responsive. The field campaign really strengthened our local presence.'
      }),
      stars: 4,
      avatar: 'DT'
    },
  ]

  const items = testimonials.map(s => ({ text: s.text, name: s.name }))

  const rowStyles = {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    alignItems: 'flex-start',
    minWidth: 'max-content',
  }

  const rowLeftStyles = {
    ...rowStyles,
    animation: 'marquee-left 26s linear infinite',
  }

  const rowRightStyles = {
    ...rowStyles,
    animation: 'marquee-right 32s linear infinite',
  }

  const itemStyles = {
    minWidth: '360px',
    maxWidth: '420px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
    border: '2px solid #ea0001',
    borderRadius: '20px',
    padding: '1.8rem 1.6rem',
    flex: '0 0 auto',
    boxShadow: '0 20px 50px rgba(234,0,1,0.2), inset 0 1px 0 rgba(255,255,255,0.9)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  }

  const quoteStyle = {
    position: 'absolute',
    top: '0.5rem',
    left: '1rem',
    fontSize: '3.5rem',
    color: 'rgba(234,0,1,0.15)',
    fontFamily: 'Georgia, serif',
    lineHeight: '1',
  }

  const starContainerStyle = {
    display: 'flex',
    gap: '0.3rem',
    marginBottom: '0.8rem',
  }

  const starStyle = {
    color: '#ea0001',
    fontSize: '1.2rem',
  }

  const sectionStyle = {
    background: 'linear-gradient(180deg, rgba(234,0,1,0.03) 0%, rgba(255,255,255,0.5) 50%, rgba(234,0,1,0.02) 100%)',
    padding: '4.5rem 0',
    position: 'relative',
  }

  return (
    <section className="testi-section section" style={sectionStyle}>
      <div className="testi-bg-blob" />
      <div className="container">
        <div className="section-eyebrow" style={{ textAlign: 'center', color: 'rgba(10,10,10,0.6)' }}>
          {t({ fr: 'Témoignages', en: 'Testimonials' })}
        </div>
        <h2 className="section-heading" style={{ textAlign: 'center', color: '#0a0a0a', marginBottom: '2.5rem' }}>
          {t({ fr: 'Ce que disent nos clients', en: 'What our clients say' })}
        </h2>

        <div className="testi-marquee-wrapper" style={{ overflow: 'hidden', width: '100%', display: 'block' }}>
          <div className="testi-marquee testi-row-left" style={rowLeftStyles}>
            {[...items, ...items].map((it, i) => (
              <div key={i} className="testi-item" style={itemStyles}>
                <div style={quoteStyle}>"</div>
                <div style={starContainerStyle}>
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={starStyle}>★</span>
                  ))}
                </div>
                <p className="testi-item-text" style={{ margin: 0, lineHeight: 1.7, color: '#222', fontSize: '1rem', fontWeight: 500, paddingTop: '0.5rem' }}>{it.text}</p>
                <div className="testi-item-by" style={{ marginTop: '1.2rem', fontSize: '1rem', color: '#ea0001', fontWeight: 700, letterSpacing: '0.5px' }}>— {it.name}</div>
              </div>
            ))}
          </div>

          <div className="testi-marquee testi-row-right" style={rowRightStyles}>
            {[...items, ...items].map((it, i) => (
              <div key={i} className="testi-item" style={itemStyles}>
                <div style={quoteStyle}>"</div>
                <div style={starContainerStyle}>
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={starStyle}>★</span>
                  ))}
                </div>
                <p className="testi-item-text" style={{ margin: 0, lineHeight: 1.7, color: '#222', fontSize: '1rem', fontWeight: 500, paddingTop: '0.5rem' }}>{it.text}</p>
                <div className="testi-item-by" style={{ marginTop: '1.2rem', fontSize: '1rem', color: '#ea0001', fontWeight: 700, letterSpacing: '0.5px' }}>— {it.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════════ */
function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutPreview />
      <PillarsSection />
      <SupportsShowcase />
    </>
  )
}

export default Home
