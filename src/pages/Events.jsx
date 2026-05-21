import { useEffect, useState } from 'react'
import { Calendar, MapPin, Clock, Tag, ArrowRight, ExternalLink } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

const handleMouseMoveSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
}

const CATEGORIES_FR = ['Tous', 'Mining', 'Business', 'Tech', 'Finance', 'Networking']
const CATEGORIES_EN = ['All', 'Mining', 'Business', 'Tech', 'Finance', 'Networking']

function Events() {
  const { t, lang } = useLanguage()
  const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active')
        })
      },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right, .reveal-stagger, .reveal-scale, .reveal-blur, .reveal-rotate'
    ).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const events = [
    {
      id: 1,
      featured: true,
      category: 'Mining',
      title: t({
        fr: 'DRC Mining Week 2026',
        en: 'DRC Mining Week 2026',
      }),
      excerpt: t({
        fr: "Le plus grand salon minier d'Afrique centrale revient à Lubumbashi pour sa 18ème édition. Trois jours d'expositions, de conférences et de networking au cœur du cuivre et du cobalt congolais.",
        en: "Central Africa's largest mining trade show returns to Lubumbashi for its 18th edition. Three days of exhibitions, conferences, and networking at the heart of Congolese copper and cobalt.",
      }),
      date: t({ fr: '24 – 26 Juin 2026', en: 'June 24 – 26, 2026' }),
      location: t({ fr: 'Pullman Grand Karavia, Lubumbashi', en: 'Pullman Grand Karavia, Lubumbashi' }),
      time: '08h00 – 18h00',
      tags: ['Mining', 'Export', 'Investissement'],
      link: 'https://www.drcminingweek.com',
      accent: '#ea0001',
      gradient: 'linear-gradient(135deg, rgba(234,0,1,0.12) 0%, rgba(234,0,1,0.03) 100%)',
      imagePlaceholder: 'DRC MINING WEEK',
    },
    {
      id: 2,
      featured: false,
      category: 'Business',
      title: t({
        fr: 'Forum des PME de Lubumbashi 2026',
        en: 'Lubumbashi SME Forum 2026',
      }),
      excerpt: t({
        fr: "Rencontrez les acteurs clés de l'économie locale. Accès aux financements, pitch startups, et ateliers de croissance pour les PME congolaises.",
        en: "Meet key players in the local economy. Access to financing, startup pitches, and growth workshops for Congolese SMEs.",
      }),
      date: t({ fr: '10 Juillet 2026', en: 'July 10, 2026' }),
      location: 'Hôtel Karibu, Lubumbashi',
      time: '09h00 – 17h00',
      tags: ['PME', 'Startup', 'Finance'],
      link: '#',
      accent: '#0066cc',
      gradient: 'linear-gradient(135deg, rgba(0,102,204,0.08) 0%, rgba(0,102,204,0.02) 100%)',
      imagePlaceholder: 'FORUM PME',
    },
    {
      id: 3,
      featured: false,
      category: 'Tech',
      title: t({
        fr: 'Katanga Tech Summit 2026',
        en: 'Katanga Tech Summit 2026',
      }),
      excerpt: t({
        fr: "Le premier sommet technologique du Katanga : IA, fintech, agritech et transformation numérique des entreprises minières congolaises.",
        en: "The first tech summit of Katanga: AI, fintech, agritech, and digital transformation of Congolese mining companies.",
      }),
      date: t({ fr: '5 Août 2026', en: 'August 5, 2026' }),
      location: t({ fr: 'Centre Culturel Boboto, Lubumbashi', en: 'Centre Culturel Boboto, Lubumbashi' }),
      time: '09h00 – 18h00',
      tags: ['Tech', 'IA', 'Digital'],
      link: '#',
      accent: '#7c3aed',
      gradient: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.02) 100%)',
      imagePlaceholder: 'KATANGA TECH',
    },
    {
      id: 4,
      featured: false,
      category: 'Finance',
      title: t({
        fr: 'Rencontre Investisseurs & Secteur Minier RDC',
        en: 'DRC Mining Investor Meetup',
      }),
      excerpt: t({
        fr: "Séance de networking exclusive entre investisseurs internationaux et opérateurs miniers congolais. Opportunités en cuivre, cobalt, lithium et or.",
        en: "Exclusive networking session between international investors and Congolese mining operators. Opportunities in copper, cobalt, lithium, and gold.",
      }),
      date: t({ fr: '25 Juin 2026 (DRC Mining Week)', en: 'June 25, 2026 (DRC Mining Week)' }),
      location: 'Pullman Grand Karavia, Lubumbashi',
      time: '17h30 – 20h00',
      tags: ['Investissement', 'Mining', 'B2B'],
      link: 'https://www.drcminingweek.com',
      accent: '#ea0001',
      gradient: 'linear-gradient(135deg, rgba(234,0,1,0.08) 0%, rgba(234,0,1,0.02) 100%)',
      imagePlaceholder: 'INVESTOR MEETUP',
    },
    {
      id: 5,
      featured: false,
      category: 'Networking',
      title: t({
        fr: 'Nuit du Business Lubumbashi',
        en: 'Lubumbashi Business Night',
      }),
      excerpt: t({
        fr: "Soirée exclusive de networking réunissant les chefs d'entreprise, directeurs généraux et personnalités économiques de Lubumbashi.",
        en: "Exclusive networking evening bringing together business leaders, managing directors, and economic personalities of Lubumbashi.",
      }),
      date: t({ fr: '18 Septembre 2026', en: 'September 18, 2026' }),
      location: 'Golf Club de Lubumbashi',
      time: '19h00 – 23h00',
      tags: ['Networking', 'Gala', 'Business'],
      link: '#',
      accent: '#d97706',
      gradient: 'linear-gradient(135deg, rgba(217,119,6,0.08) 0%, rgba(217,119,6,0.02) 100%)',
      imagePlaceholder: 'BUSINESS NIGHT',
    },
    {
      id: 6,
      featured: false,
      category: 'Mining',
      title: t({
        fr: 'Conférence Cobalt & Transition Énergétique',
        en: 'Cobalt & Energy Transition Conference',
      }),
      excerpt: t({
        fr: "Le cobalt congolais au cœur de la transition verte mondiale. Débats sur la chaîne de valeur, la traçabilité et les normes ESG dans l'extraction.",
        en: "Congolese cobalt at the heart of the global green transition. Debates on value chain, traceability, and ESG standards in extraction.",
      }),
      date: t({ fr: '26 Juin 2026 (DRC Mining Week)', en: 'June 26, 2026 (DRC Mining Week)' }),
      location: 'Pullman Grand Karavia, Lubumbashi',
      time: '10h00 – 16h00',
      tags: ['Cobalt', 'ESG', 'Green'],
      link: 'https://www.drcminingweek.com',
      accent: '#059669',
      gradient: 'linear-gradient(135deg, rgba(5,150,105,0.08) 0%, rgba(5,150,105,0.02) 100%)',
      imagePlaceholder: 'COBALT CONFERENCE',
    },
  ]

  const categories = lang === 'fr' ? CATEGORIES_FR : CATEGORIES_EN

  const filtered = activeCategory === 0
    ? events
    : events.filter((e) => e.category === CATEGORIES_EN[activeCategory])

  const featured = events[0]

  return (
    <div className="page">

      {/* ── Page Header ── */}
      <section className="page-header page-header-agence">
        <div className="cinematic-grid-bg" />
        <div className="page-header-objects" aria-hidden="true">
          {/* Calendar icon */}
          <svg className="ph-obj ph-obj-1" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="10" width="52" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
            <line x1="6" y1="22" x2="58" y2="22" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="6" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="44" y1="6" x2="44" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <rect x="16" y="30" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="28" y="30" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="40" y="30" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Pin icon */}
          <svg className="ph-obj ph-obj-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 6C22.06 6 14 14.06 14 24C14 36 32 58 32 58C32 58 50 36 50 24C50 14.06 41.94 6 32 6Z" stroke="currentColor" strokeWidth="2" />
            <circle cx="32" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
          </svg>
          {/* Trophy icon */}
          <svg className="ph-obj ph-obj-3" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 8H44V30C44 38.84 38.84 44 30 44H34C25.16 44 20 38.84 20 30V8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M20 14H10C10 22 14 26 20 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M44 14H54C54 22 50 26 44 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="32" y1="44" x2="32" y2="54" stroke="currentColor" strokeWidth="2" />
            <line x1="22" y1="54" x2="42" y2="54" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-label reveal-up active">
            {t({ fr: 'Lubumbashi Business', en: 'Lubumbashi Business' })}
          </span>
          <h1 className="page-title reveal-up active" style={{ transitionDelay: '0.1s' }}>
            {t({ fr: 'Événements & Actualités', en: 'Events & Business News' })}
          </h1>
          <p className="page-subtitle reveal-up active" style={{ transitionDelay: '0.2s' }}>
            {t({
              fr: "Restez connectés aux grands rendez-vous économiques, miniers et business de Lubumbashi et du Katanga.",
              en: "Stay connected to the major economic, mining, and business events of Lubumbashi and Katanga.",
            })}
          </p>
        </div>
      </section>

      {/* ── Featured Event: DRC Mining Week ── */}
      <section className="section events-featured-section">
        <div className="container">
          <div className="events-featured-card reveal-up card-spotlight" onMouseMove={handleMouseMoveSpotlight}>
            <div className="events-featured-badge">
              <span>⭐ {t({ fr: 'Événement phare', en: 'Featured Event' })}</span>
            </div>

            <div className="events-featured-grid">
              <div className="events-featured-visual">
                <div className="events-featured-img-wrap">
                  <div className="events-featured-img-placeholder">
                    <span className="events-featured-img-text">DRC</span>
                    <span className="events-featured-img-sub">MINING WEEK</span>
                    <span className="events-featured-img-year">2026</span>
                  </div>
                  <div className="events-featured-img-glow" />
                </div>
                <div className="events-featured-meta-side">
                  <div className="events-meta-item">
                    <Calendar size={16} />
                    <span>{featured.date}</span>
                  </div>
                  <div className="events-meta-item">
                    <MapPin size={16} />
                    <span>{featured.location}</span>
                  </div>
                  <div className="events-meta-item">
                    <Clock size={16} />
                    <span>{featured.time}</span>
                  </div>
                </div>
              </div>

              <div className="events-featured-content">
                <div className="events-featured-cat">
                  <Tag size={14} />
                  <span>{featured.category}</span>
                </div>
                <h2 className="events-featured-title">{featured.title}</h2>
                <p className="events-featured-excerpt">{featured.excerpt}</p>
                <div className="events-featured-tags">
                  {featured.tags.map((tag, i) => (
                    <span key={i} className="events-tag events-tag-accent">{tag}</span>
                  ))}
                </div>
                <div className="events-featured-actions">
                  <a
                    href={featured.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    {t({ fr: "S'inscrire / En savoir plus", en: 'Register / Learn more' })}
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Events Grid ── */}
      <section className="section" style={{ paddingTop: '2rem !important' }}>
        <div className="container">
          <div className="section-header reveal-rotate">
            <span className="section-label">
              {t({ fr: 'Agenda 2026', en: '2026 Calendar' })}
            </span>
            <h2 className="section-title">
              {t({ fr: 'Tous les ', en: 'All ' })}
              <span className="text-accent">{t({ fr: 'événements', en: 'events' })}</span>
            </h2>
          </div>

          {/* Category Filter */}
          <div className="events-filter reveal-up">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`events-filter-btn ${activeCategory === i ? 'active' : ''}`}
                onClick={() => setActiveCategory(i)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="events-grid">
            {filtered.map((event, index) => (
              <article
                key={event.id}
                className="events-card reveal-up card-spotlight"
                style={{
                  transitionDelay: `${index * 0.08}s`,
                  background: event.gradient,
                  borderLeft: `3px solid ${event.accent}`,
                }}
                onMouseMove={handleMouseMoveSpotlight}
              >
                <div className="events-card-header">
                  <div
                    className="events-card-visual"
                    style={{ borderColor: event.accent + '33' }}
                  >
                    <span style={{ color: event.accent, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px', textAlign: 'center', lineHeight: 1.3 }}>
                      {event.imagePlaceholder}
                    </span>
                  </div>
                  <div className="events-card-cat" style={{ background: event.accent + '18', color: event.accent }}>
                    {event.category}
                  </div>
                </div>

                <div className="events-card-body">
                  <h3 className="events-card-title">{event.title}</h3>
                  <p className="events-card-excerpt">{event.excerpt}</p>

                  <div className="events-card-meta">
                    <span className="events-meta-item">
                      <Calendar size={13} />
                      {event.date}
                    </span>
                    <span className="events-meta-item">
                      <MapPin size={13} />
                      {event.location.split(',')[0]}
                    </span>
                  </div>

                  <div className="events-card-tags">
                    {event.tags.map((tag, i) => (
                      <span key={i} className="events-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="events-card-link"
                  style={{ color: event.accent }}
                >
                  {t({ fr: 'Voir les détails', en: 'View details' })}
                  <ArrowRight size={14} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events
