import { useEffect } from 'react'
import { Lightbulb, Award, Users, Rocket, Briefcase, Star, Calendar } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

const handleMouseMoveSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
}

function Agence() {
  const { t } = useLanguage()
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-stagger, .reveal-scale, .reveal-blur, .reveal-rotate, .reveal-wipe').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const values = [
    {
      icon: Lightbulb,
      title: 'Créativité',
      description: 'Nous repoussons les limites pour créer des designs uniques et mémorables.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Chaque projet est une opportunité de dépasser les attentes.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Nous travaillons main dans la main avec nos clients pour des résultats optimaux.'
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Nous restons à la pointe des dernières technologies et tendances.'
    }
  ]

  const stats = [
    { icon: Briefcase, number: '50+', label: 'Projets réalisés' },
    { icon: Users, number: '30+', label: 'Clients satisfaits' },
    { icon: Calendar, number: '5', label: 'Années d\'expérience' },
    { icon: Star, number: '12', label: 'Récompenses' },
  ]

  return (
    <div className="page">
      {/* Page Header */}
      <section className="page-header page-header-agence">
        <div className="cinematic-grid-bg" />
        {/* Objets décoratifs multimédia & publicité */}
        <div className="page-header-objects" aria-hidden="true">
          {/* Écran / Monitor */}
          <svg className="ph-obj ph-obj-1" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="56" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
            <line x1="24" y1="44" x2="20" y2="56" stroke="currentColor" strokeWidth="2" />
            <line x1="40" y1="44" x2="44" y2="56" stroke="currentColor" strokeWidth="2" />
            <line x1="16" y1="56" x2="48" y2="56" stroke="currentColor" strokeWidth="2" />
            <rect x="12" y="14" width="24" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="46" cy="22" r="6" stroke="currentColor" strokeWidth="1.5" />
            <line x1="43" y1="22" x2="49" y2="22" stroke="currentColor" strokeWidth="1.5" />
            <line x1="46" y1="19" x2="46" y2="25" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Mégaphone / Publicité */}
          <svg className="ph-obj ph-obj-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 24H20L44 12V52L20 40H8V24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <line x1="20" y1="40" x2="20" y2="52" stroke="currentColor" strokeWidth="2" />
            <line x1="14" y1="52" x2="26" y2="52" stroke="currentColor" strokeWidth="2" />
            <path d="M50 20C52.5 23 52.5 41 50 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M54 16C58 21 58 43 54 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {/* Caméra vidéo */}
          <svg className="ph-obj ph-obj-3" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="18" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
            <path d="M40 26L58 18V46L40 38V26Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="18" cy="32" r="6" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="18" cy="32" r="2" fill="currentColor" />
          </svg>
          {/* Smartphone */}
          <svg className="ph-obj ph-obj-4" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="4" width="32" height="56" rx="6" stroke="currentColor" strokeWidth="2" />
            <line x1="16" y1="12" x2="48" y2="12" stroke="currentColor" strokeWidth="1.5" />
            <line x1="16" y1="52" x2="48" y2="52" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="32" cy="57" r="2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="22" y="18" width="20" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <line x1="22" y1="36" x2="42" y2="36" stroke="currentColor" strokeWidth="1.5" />
            <line x1="22" y1="41" x2="36" y2="41" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-label reveal-up active">{t({ fr: "L'Agence", en: "The Agency" })}</span>
          <h1 className="page-title reveal-up active" style={{ transitionDelay: '0.1s' }}>Onekana</h1>
          <p className="page-subtitle reveal-up active" style={{ transitionDelay: '0.2s' }}>
            {t({
              fr: "Une agence passionnée par la création d'expériences digitales exceptionnelles",
              en: "An agency passionate about creating exceptional digital experiences"
            })}
          </p>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="section">
        <div className="container">
          <div className="about-grid-agence">
            <div className="about-content reveal-left">
              <span className="section-label reveal-blur">Notre Histoire</span>
              <h2 className="section-title reveal-up" style={{ transitionDelay: '0.1s' }}>
                De l'idée à l'<span className="text-accent">agence</span>
              </h2>
              <p className="about-text reveal-up" style={{ transitionDelay: '0.2s' }}>
                Fondée en 2020 par une équipe de passionnés du digital, Onekana est née d'une vision simple :
                créer des expériences web qui allient esthétique et performance. Notre nom, inspiré d'un mot
                swahili signifiant "apparaître", reflète notre mission : faire émerger votre marque dans
                l'univers digital.
              </p>
              <p className="about-text reveal-up" style={{ transitionDelay: '0.35s' }}>
                Au fil des années, nous avons accompagné des entreprises de toutes tailles, des startups
                ambitieuses aux grandes marques établies, en passant par des PME en pleine croissance.
                Chaque projet est pour nous une nouvelle aventure, une nouvelle histoire à écrire.
              </p>
            </div>
            <div className="about-image reveal-right">
              <div className="image-frame">
                <div className="image-placeholder reveal-scale" style={{ transitionDelay: '0.15s' }}>
                  <span>Notre Histoire</span>
                </div>
                <div className="image-accent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header reveal-rotate">
            <span className="section-label">Nos Valeurs</span>
            <h2 className="section-title">Ce qui nous définit</h2>
          </div>
          <div className="values-grid-agence reveal-stagger">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card-agence card-spotlight"
                onMouseMove={handleMouseMoveSpotlight}
              >
                <div className="value-icon">
                  <value.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section-alt">
        <div className="container">
          <div className="stats-grid-agence reveal-stagger">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item-agence card-spotlight"
                onMouseMove={handleMouseMoveSpotlight}
              >
                <div className="stat-icon">
                  <stat.icon size={28} strokeWidth={1.5} />
                </div>
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Agence