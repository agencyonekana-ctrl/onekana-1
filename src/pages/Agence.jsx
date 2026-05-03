import { useEffect } from 'react'
import { Lightbulb, Award, Users, Rocket, TrendingUp, Briefcase, Star, Calendar } from 'lucide-react'

function Agence() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
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

  // const team = [
  //   {
  //     name: 'Marie Dubois',
  //     role: 'Directrice Créative',
  //     description: '10 ans d\'expérience en design digital'
  //   },
  //   {
  //     name: 'Thomas Martin',
  //     role: 'Lead Developer',
  //     description: 'Expert en technologies web modernes'
  //   },
  //   {
  //     name: 'Sophie Bernard',
  //     role: 'UX Designer',
  //     description: 'Spécialiste de l\'expérience utilisateur'
  //   },
  //   {
  //     name: 'Lucas Petit',
  //     role: 'Stratège Digital',
  //     description: 'Consultant en transformation digitale'
  //   }
  // ]

  const stats = [
    { icon: Briefcase, number: '50+', label: 'Projets réalisés' },
    { icon: Users, number: '30+', label: 'Clients satisfaits' },
    { icon: Calendar, number: '5', label: 'Années d\'expérience' },
    { icon: Star, number: '12', label: 'Récompenses' },
  ]

  return (
    <div className="page">
      {/* Page Header */}
      <section className="page-header">
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
          {/* Panneau publicitaire */}
          <svg className="ph-obj ph-obj-5" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="8" width="52" height="32" rx="3" stroke="currentColor" strokeWidth="2" />
            <line x1="32" y1="40" x2="32" y2="58" stroke="currentColor" strokeWidth="2" />
            <line x1="24" y1="58" x2="40" y2="58" stroke="currentColor" strokeWidth="2" />
            <line x1="14" y1="18" x2="50" y2="18" stroke="currentColor" strokeWidth="1.5" />
            <line x1="14" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1.5" />
            <line x1="14" y1="30" x2="36" y2="30" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Wifi / Signal */}
          <svg className="ph-obj ph-obj-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 24C16 16 48 16 56 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 32C22 26 42 26 48 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 40C27 37 37 37 40 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="48" r="3" fill="currentColor" />
          </svg>
          {/* Étoile / Rating */}
          <svg className="ph-obj ph-obj-7" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 6L38.5 22H56L42.5 32L48 48L32 38L16 48L21.5 32L8 22H25.5L32 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          {/* Graphique / Analytics */}
          <svg className="ph-obj ph-obj-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="8,52 8,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <polyline points="8,52 56,52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <polyline points="14,40 24,28 34,34 44,18 54,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="14" cy="40" r="2.5" fill="currentColor" />
            <circle cx="24" cy="28" r="2.5" fill="currentColor" />
            <circle cx="34" cy="34" r="2.5" fill="currentColor" />
            <circle cx="44" cy="18" r="2.5" fill="currentColor" />
            <circle cx="54" cy="22" r="2.5" fill="currentColor" />
          </svg>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-label">L'Agence</span>
          <h1 className="page-title">Onekana</h1>
          <p className="page-subtitle">
            Une agence passionnée par la création d'expériences digitales exceptionnelles
          </p>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="section">
        <div className="container">
          <div className="about-grid-agence">
            <div className="about-content reveal">
              <span className="section-label">Notre Histoire</span>
              <h2 className="section-title">
                De l'idée à l'<span className="text-accent">agence</span>
              </h2>
              <p className="about-text">
                Fondée en 2020 par une équipe de passionnés du digital, Onekana est née d'une vision simple :
                créer des expériences web qui allient esthétique et performance. Notre nom, inspiré d'un mot
                swahili signifiant "apparaître", reflète notre mission : faire émerger votre marque dans
                l'univers digital.
              </p>
              <p className="about-text">
                Au fil des années, nous avons accompagné des entreprises de toutes tailles, des startups
                ambitieuses aux grandes marques établies, en passant par des PME en pleine croissance.
                Chaque projet est pour nous une nouvelle aventure, une nouvelle histoire à écrire.
              </p>
            </div>
            <div className="about-image reveal">
              <div className="image-frame">
                <div className="image-placeholder">
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
          <div className="section-header reveal">
            <span className="section-label">Nos Valeurs</span>
            <h2 className="section-title">Ce qui nous définit</h2>
          </div>
          <div className="values-grid-agence">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card-agence reveal"
                style={{ transitionDelay: `${index * 0.1}s` }}
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

      {/* Notre Équipe */}
      {/* <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">L'Équipe</span>
            <h2 className="section-title">Les talents derrière Onekana</h2>
          </div>
          <div className="team-grid-agence">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-card-agence reveal"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="team-avatar">
                  <div className="avatar-placeholder">{member.name.charAt(0)}</div>
                </div>
                <h3 className="team-name">{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p className="team-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats */}
      <section className="section section-alt">
        <div className="container">
          <div className="stats-grid-agence reveal">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item-agence reveal"
                style={{ transitionDelay: `${index * 0.1}s` }}
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