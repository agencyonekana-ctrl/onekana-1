import { useEffect, useState } from 'react'
import { ExternalLink, ArrowRight, Star } from 'lucide-react'

function Portfolio() {
  const [filter, setFilter] = useState('tous')

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

  const categories = [
    { id: 'tous', label: 'Tous' },
    { id: 'web', label: 'Web Design' },
    { id: 'branding', label: 'Branding' },
    { id: 'uiux', label: 'UI/UX' }
  ]

  const projects = [
    {
      title: 'E-commerce Luxe',
      category: 'web',
      categoryLabel: 'Web Design / Développement',
      year: '2024',
      description: 'Refonte complète d\'une boutique en ligne de maroquinerie de luxe avec expérience d\'achat premium.',
      client: 'Maison Dubois'
    },
    {
      title: 'Application Fintech',
      category: 'uiux',
      categoryLabel: 'UI/UX Design',
      year: '2024',
      description: 'Design d\'une application mobile de gestion financière avec focus sur la simplicité et la sécurité.',
      client: 'FinApp'
    },
    {
      title: 'Brand Identity',
      category: 'branding',
      categoryLabel: 'Branding',
      year: '2023',
      description: 'Création d\'une identité visuelle complète pour une startup dans le secteur de la santé digitale.',
      client: 'HealthTech'
    },
    {
      title: 'Site Corporate',
      category: 'web',
      categoryLabel: 'Web Design',
      year: '2023',
      description: 'Conception et développement du site web d\'un cabinet d\'avocats international.',
      client: 'Lex & Partners'
    },
    {
      title: 'Restaurant App',
      category: 'uiux',
      categoryLabel: 'UI/UX Design',
      year: '2023',
      description: 'Application de réservation et menu digital pour une chaîne de restaurants gastronomiques.',
      client: 'Gourmet Chain'
    },
    {
      title: 'Marque Sportswear',
      category: 'branding',
      categoryLabel: 'Branding',
      year: '2023',
      description: 'Création d\'une nouvelle marque de vêtements de sport éco-responsables.',
      client: 'EcoSport'
    },
    {
      title: 'Plateforme SaaS',
      category: 'web',
      categoryLabel: 'Web Design / Développement',
      year: '2022',
      description: 'Design et développement d\'une plateforme de gestion de projet pour équipes remote.',
      client: 'TeamFlow'
    },
    {
      title: 'Redesign Mobile',
      category: 'uiux',
      categoryLabel: 'UI/UX Design',
      year: '2022',
      description: 'Refonte UX d\'une application de livraison de courses à domicile.',
      client: 'QuickDelivery'
    }
  ]

  const filteredProjects = filter === 'tous'
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <div className="page">
      {/* Page Header */}
      <section className="page-header page-header-portfolio">
        {/* Objets décoratifs multimédia & publicité */}
        <div className="page-header-objects" aria-hidden="true">
          {/* Appareil photo */}
          <svg className="ph-obj ph-obj-1" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="18" width="52" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
            <path d="M22 18L26 10H38L42 18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="32" cy="36" r="10" stroke="currentColor" strokeWidth="2" />
            <circle cx="32" cy="36" r="5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="48" cy="26" r="3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Palette de couleurs */}
          <svg className="ph-obj ph-obj-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 8C18 8 8 18 8 30C8 40 16 48 28 50C32 51 34 48 32 44C30 40 34 36 38 38C44 40 56 36 56 28C56 17 45 8 32 8Z" stroke="currentColor" strokeWidth="2" />
            <circle cx="20" cy="24" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="32" cy="16" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="44" cy="22" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="46" cy="34" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="18" cy="36" r="3" fill="currentColor" opacity="0.6" />
          </svg>
          {/* Caméra vidéo */}
          <svg className="ph-obj ph-obj-3" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="18" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
            <path d="M40 26L58 18V46L40 38V26Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="18" cy="32" r="6" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="18" cy="32" r="2" fill="currentColor" />
          </svg>
          {/* Écran / Présentation */}
          <svg className="ph-obj ph-obj-4" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="56" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
            <line x1="24" y1="44" x2="20" y2="56" stroke="currentColor" strokeWidth="2" />
            <line x1="40" y1="44" x2="44" y2="56" stroke="currentColor" strokeWidth="2" />
            <line x1="16" y1="56" x2="48" y2="56" stroke="currentColor" strokeWidth="2" />
            <rect x="12" y="14" width="24" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="46" cy="22" r="6" stroke="currentColor" strokeWidth="1.5" />
            <line x1="43" y1="22" x2="49" y2="22" stroke="currentColor" strokeWidth="1.5" />
            <line x1="46" y1="19" x2="46" y2="25" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Crayon / Design */}
          <svg className="ph-obj ph-obj-5" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 8L56 20L20 56L8 56L8 44L44 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <line x1="36" y1="16" x2="48" y2="28" stroke="currentColor" strokeWidth="1.5" />
            <line x1="8" y1="44" x2="20" y2="56" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Mégaphone */}
          <svg className="ph-obj ph-obj-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 24H20L44 12V52L20 40H8V24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <line x1="20" y1="40" x2="20" y2="52" stroke="currentColor" strokeWidth="2" />
            <line x1="14" y1="52" x2="26" y2="52" stroke="currentColor" strokeWidth="2" />
            <path d="M50 20C52.5 23 52.5 41 50 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M54 16C58 21 58 43 54 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {/* Étoile */}
          <svg className="ph-obj ph-obj-7" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 6L38.5 22H56L42.5 32L48 48L32 38L16 48L21.5 32L8 22H25.5L32 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          {/* Lien / Réseau */}
          <svg className="ph-obj ph-obj-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="32" r="8" stroke="currentColor" strokeWidth="2" />
            <circle cx="48" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
            <circle cx="48" cy="48" r="8" stroke="currentColor" strokeWidth="2" />
            <line x1="24" y1="28" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5" />
            <line x1="24" y1="36" x2="40" y2="44" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-label">Portfolio</span>
          <h1 className="page-title">Nos Projets</h1>
          <p className="page-subtitle">
            Découvrez une sélection de nos réalisations récentes
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="section section-small">
        <div className="container">
          <div className="filter-bar-modern reveal">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn-modern ${filter === cat.id ? 'active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section">
        <div className="container">
          <div className="portfolio-grid-modern">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="portfolio-item-modern reveal"
                style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
              >
                <div className="portfolio-image-modern">
                  <div className="portfolio-placeholder-modern">
                    <span>{project.title}</span>
                  </div>
                  <div className="portfolio-overlay-modern">
                    <button className="portfolio-view-btn">
                      <ExternalLink size={18} />
                      <span>Voir le projet</span>
                    </button>
                  </div>
                </div>
                <div className="portfolio-info-modern">
                  <div className="portfolio-meta-top-modern">
                    <span className="portfolio-category-modern">{project.categoryLabel}</span>
                    <span className="portfolio-year-modern">{project.year}</span>
                  </div>
                  <h3 className="portfolio-title-modern">{project.title}</h3>
                  <p className="portfolio-client-modern">Client: {project.client}</p>
                  <p className="portfolio-description-modern">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Témoignages</span>
            <h2 className="section-title">Ce que disent nos clients</h2>
          </div>
          <div className="testimonials-grid-modern">
            <div className="testimonial-card-modern reveal">
              <div className="testimonial-stars">
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
              </div>
              <p className="testimonial-text-modern">
                "Onekana a transformé notre vision en réalité. Leur créativité et leur professionnalisme
                ont dépassé toutes nos attentes."
              </p>
              <div className="testimonial-author-modern">
                <div className="author-avatar-modern">JD</div>
                <div className="author-info-modern">
                  <span className="author-name-modern">Jean Dubois</span>
                  <span className="author-role-modern">CEO, Maison Dubois</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card-modern reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="testimonial-stars">
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
              </div>
              <p className="testimonial-text-modern">
                "Une équipe à l'écoute, réactive et talentueuse. Notre nouveau site a boosté
                nos conversions de 150%."
              </p>
              <div className="testimonial-author-modern">
                <div className="author-avatar-modern">ML</div>
                <div className="author-info-modern">
                  <span className="author-name-modern">Marie Lefebvre</span>
                  <span className="author-role-modern">Directrice Marketing, FinApp</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card-modern reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="testimonial-stars">
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
              </div>
              <p className="testimonial-text-modern">
                "Leur approche stratégique et leur souci du détail font toute la différence.
                Un partenaire de confiance."
              </p>
              <div className="testimonial-author-modern">
                <div className="author-avatar-modern">PM</div>
                <div className="author-info-modern">
                  <span className="author-name-modern">Pierre Martin</span>
                  <span className="author-role-modern">Fondateur, HealthTech</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Portfolio
