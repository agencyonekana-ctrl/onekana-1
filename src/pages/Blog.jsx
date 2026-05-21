import { useEffect, useState } from 'react'
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

const handleMouseMoveSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
}

function Blog() {
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

  const articles = [
    {
      id: 1,
      title: t({ fr: "Pourquoi lancer votre prochaine campagne avec Onekana Agency ?", en: "Why launch your next campaign with Onekana Agency?" }),
      excerpt: t({ fr: "Expertise locale, flotte de véhicules géo-localisés et retour sur investissement mesurable : découvrez nos atouts.", en: "Local expertise, geo-located vehicle fleet, and measurable ROI: discover our strengths." }),
      category: "Agence",
      date: "18 Mai 2026",
      author: "Onekana Team",
      imagePlaceholder: "Onekana"
    },
    {
      id: 2,
      title: t({ fr: "Le trajet le plus fréquenté de ce mois à Lubumbashi", en: "The most frequented route this month in Lubumbashi" }),
      excerpt: t({ fr: "Analyse des flux de circulation : où votre publicité a-t-elle été la plus vue ce mois-ci ?", en: "Traffic flow analysis: where was your ad seen the most this month?" }),
      category: "Data & Analytics",
      date: "15 Mai 2026",
      author: "Data Lab",
      imagePlaceholder: "Routes"
    },
    {
      id: 3,
      title: t({ fr: "Comment mesurer l'impact de votre affichage mobile ?", en: "How to measure the impact of your mobile advertising?" }),
      excerpt: t({ fr: "Impressions, taux de conversion et tracking GPS : les KPIs essentiels de la publicité urbaine.", en: "Impressions, conversion rates, and GPS tracking: the essential KPIs of urban advertising." }),
      category: "Marketing",
      date: "10 Mai 2026",
      author: "Onekana Team",
      imagePlaceholder: "Analytics"
    },
    {
      id: 4,
      title: t({ fr: "Les nouveaux formats publicitaires urbains en 2026", en: "New urban advertising formats in 2026" }),
      excerpt: t({ fr: "De l'affichage dynamique aux véhicules connectés, quelles sont les tendances pour capter l'attention ?", en: "From dynamic displays to connected vehicles, what are the trends to capture attention?" }),
      category: "Innovation",
      date: "05 Mai 2026",
      author: "Tech Lab",
      imagePlaceholder: "Innovation"
    },
    {
      id: 5,
      title: t({ fr: "L'impact du marketing mobile sur la croissance locale", en: "The impact of mobile marketing on local growth" }),
      excerpt: t({ fr: "Découvrez comment les campagnes ciblées sur mobile transforment la visibilité des commerces de proximité.", en: "Discover how targeted mobile campaigns are transforming the visibility of local businesses." }),
      category: "Stratégie",
      date: "28 Avr 2026",
      author: "Onekana Team",
      imagePlaceholder: "Growth"
    }
  ]

  return (
    <div className="page">
      {/* Page Header */}
      <section className="page-header page-header-agence">
        <div className="cinematic-grid-bg" />
        
        {/* Decorative Objects */}
        <div className="page-header-objects" aria-hidden="true">
          {/* Article Icon */}
          <svg className="ph-obj ph-obj-1" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="8" width="40" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="36" x2="36" y2="36" stroke="currentColor" strokeWidth="2" />
          </svg>
          {/* Pen Icon */}
          <svg className="ph-obj ph-obj-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 16L16 48L8 56L16 48Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M40 8L56 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M44 12L52 20L20 52L12 44L44 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-label reveal-up active">{t({ fr: "Notre Blog", en: "Our Blog" })}</span>
          <h1 className="page-title reveal-up active" style={{ transitionDelay: '0.1s' }}>
            {t({ fr: "Actualités & Insights", en: "News & Insights" })}
          </h1>
          <p className="page-subtitle reveal-up active" style={{ transitionDelay: '0.2s' }}>
            {t({
              fr: "Découvrez nos derniers articles, études de cas et tendances de l'industrie",
              en: "Discover our latest articles, case studies, and industry trends"
            })}
          </p>
        </div>
      </section>

      {/* Featured Article & Grid */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal-rotate">
            <span className="section-label">{t({ fr: "Dernières publications", en: "Latest posts" })}</span>
            <h2 className="section-title">
              {t({ fr: "Explorer nos ", en: "Explore our " })}<span className="text-accent">{t({ fr: "articles", en: "articles" })}</span>
            </h2>
          </div>

          <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {articles.map((article, index) => (
              <article 
                key={article.id} 
                className="blog-card reveal-up card-spotlight"
                style={{ 
                  transitionDelay: `${index * 0.1}s`,
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                onMouseMove={handleMouseMoveSpotlight}
              >
                <div className="blog-card-image" style={{ height: '220px', backgroundColor: 'rgba(230, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    {article.imagePlaceholder}
                  </span>
                  <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--color-primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500' }}>
                    {article.category}
                  </div>
                </div>
                
                <div className="blog-card-content" style={{ padding: '2rem' }}>
                  <div className="blog-meta" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={14} /> {article.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={14} /> {article.author}
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: '1.4', color: 'white' }}>
                    {article.title}
                  </h3>
                  
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {article.excerpt}
                  </p>
                  
                  <button className="btn btn-outline" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    {t({ fr: "Lire l'article", en: "Read article" })} <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }} className="reveal-up">
            <button className="btn btn-primary btn-large">
               {t({ fr: "Charger plus d'articles", en: "Load more articles" })}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog
