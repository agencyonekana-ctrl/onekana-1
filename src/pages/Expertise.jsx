import { useEffect } from 'react'
import { Car, Bus, Van, Headphones, Eye, Lightbulb, Monitor, Backpack, ArrowRight } from 'lucide-react'

function Expertise() {
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

  const transportServices = [
    {
      icon: Van,
      number: '01',
      title: 'Aimants Taxi/bus',
      description: 'Visibilité extérieure mobile, fort impact dans les zones à fort traffic. Supports à forte répétition visuelle, idéals pour la notoriété locale et les campagnes longues.',
      price: 'A partir de : 30 $ / support / mois (ou campagne)',
      options: ['Prestation design ou vidéo à partir de : 150 $', 'Option exclusivité : sur devis'],
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Aimants+Taxi'
    },
    {
      icon: Bus,
      number: '02',
      title: 'Panneau de siège',
      description: 'Excellent outil de publicité « captive ». L’audience ne peut échapper à l’exposition. Possibilité de co-branding pour augmenter la valeur perçue de la marque. Compartiment flyers pour distribution de tracts.',
      price: 'A partir de : 50 $ / support / mois (ou campagne)',
      options: ['Activation terrain – 2 000 flyers distribués : 170 $', 'Prestation design ou video à partir de : 150 $', 'Option exclusivité : sur devis'],
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Panneau+Siege'
    },
    {
      icon: Headphones,
      number: '03',
      title: 'Housse d’appui tête publicitaire',
      description: 'Visibilité optimisée grâce au monopole sur le support. Stratégiquement positionnée à hauteur du regard. Temps d’exposition prolongée.',
      price: 'A partir de : 40 $ / support / mois (ou campagne)',
      options: ['Prestation design ou video à partir de : 150 $'],
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Housse+Appui+Tete'
    },
    {
      icon: Car,
      number: '04',
      title: 'Housse de rétroviseurs extérieurs',
      description: 'Visible en circulation ou stationnement. Original, effet Wouaou garanti. Idéale pour opérations ponctuelles ou évènementielles.',
      price: 'A partir de : 30 $ / support / jours ou campagne',
      options: ['Prestation design ou vidéo : 150 $', 'Option exclusivité : sur devis'],
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Housse+Retro'
    },
    {
      icon: Eye,
      number: '05',
      title: 'Accroche pare-brise désodorisante',
      description: 'Longue durée d’exposition. Contact quotidien répétés. Expérience client par l’odeur, mémorisation de la marque favorisée.',
      price: 'A partir de : 15 $ / support / mois (ou campagne)',
      options: ['Prestation design ou vidéo à partir de : 150 $', 'Option exclusivité : sur devis'],
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Accroche+Desodorisante'
    },
    {
      icon: Lightbulb,
      number: '06',
      title: 'Enseigne lumineuse',
      description: 'Image premium de la marque. Domination urbaine avec une visibilité au dessus de la foule et du trafic. Temps d’exposition long. Visibilité de jour comme de nuit. Co-branding à privilégier pour augmenter la valeur perçue de la marque.',
      price: 'A partir de : 120 $ / support / mois (ou campagne)',
      options: ['Prestation design ou vidéo : 150 $', 'Option exclusivité : sur devis'],
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Enseigne+Lumineuse'
    },
    {
      icon: Monitor,
      number: '07',
      title: 'Ecran digitaux embarqué',
      description: 'Image premium. Temps d’exposition prolongé. Publicité dynamique. Narratif percutant. Effet Wouaou.',
      price: 'A partir de : 240 $ / support / mois (ou campagne)',
      options: ['Prestation design ou vidéo : 150 $', 'Nous consulter pour d’autres lieux d’exposition', 'Option exclusivité : sur devis'],
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Ecran+Embarque'
    },
    {
      icon: Backpack,
      number: '08',
      title: 'Bannière sac à dos',
      description: 'Très visible. Idéal pour lancement de marque et opération évènementielle. Parfait pour le ciblage d’une zone.',
      price: 'A partir de : 120 $ / jour / agent',
      options: ['Mission activable à partir de 2 jours minimum', 'Activation terrain – 2 000 flyers distribués : 170 $', 'Prestation design ou vidéo : 150 $', 'Option exclusivité : sur devis'],
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Banniere+Sac'
    },
    {
      icon: Monitor,
      number: '09',
      title: 'Ecran sac à dos',
      description: 'Image de marque premium. Affichage vidéo dynamique. Visibilité de nuit. Effet Wouaou garanti.',
      price: 'A partir de : 300 $ / jour / agent',
      options: ['Mission activable à partir de 2 jours minimum', 'Activation terrain – 2 000 flyers distribués : 170 $', 'Prestation design ou vidéo : 150 $', 'Option exclusivité : sur devis'],
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Ecran+Sac'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Découverte',
      description: 'Nous prenons le temps de comprendre votre entreprise, vos objectifs et vos défis.'
    },
    {
      step: '02',
      title: 'Stratégie',
      description: 'Nous définissons ensemble la meilleure approche pour atteindre vos objectifs.'
    },
    {
      step: '03',
      title: 'Création',
      description: 'Notre équipe travaille sur vos livrables avec créativité et précision.'
    },
    {
      step: '04',
      title: 'Livraison',
      description: 'Nous finalisons, testons et déployons votre projet avec soin.'
    }
  ]

  const additionalInfo = [
    'Les tarifs peuvent varier selon la zone de diffusion, les horaires, le volume et le niveau d’exclusivité.',
    'Nous proposons des solutions sur mesure adaptées à votre budget et vos objectifs.',
    'Tous nos services incluent une prestation de design ou vidéo pour optimiser votre campagne.'
  ]

  return (
    <div className="page">
      {/* Page Header */}
      <section className="page-header">
        {/* Objets décoratifs multimédia & publicité */}
        <div className="page-header-objects" aria-hidden="true">
          {/* Taxi / Voiture */}
          <svg className="ph-obj ph-obj-1" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="24" width="52" height="22" rx="4" stroke="currentColor" strokeWidth="2" />
            <path d="M14 24L20 12H44L50 24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="18" cy="46" r="6" stroke="currentColor" strokeWidth="2" />
            <circle cx="46" cy="46" r="6" stroke="currentColor" strokeWidth="2" />
            <rect x="24" y="14" width="16" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <line x1="6" y1="34" x2="58" y2="34" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Écran LED / DOOH */}
          <svg className="ph-obj ph-obj-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="56" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
            <line x1="24" y1="44" x2="20" y2="56" stroke="currentColor" strokeWidth="2" />
            <line x1="40" y1="44" x2="44" y2="56" stroke="currentColor" strokeWidth="2" />
            <line x1="16" y1="56" x2="48" y2="56" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20L28 28L36 22L44 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="20" cy="20" r="2" fill="currentColor" />
            <circle cx="44" cy="30" r="2" fill="currentColor" />
          </svg>
          {/* Mégaphone */}
          <svg className="ph-obj ph-obj-3" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 24H20L44 12V52L20 40H8V24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <line x1="20" y1="40" x2="20" y2="52" stroke="currentColor" strokeWidth="2" />
            <line x1="14" y1="52" x2="26" y2="52" stroke="currentColor" strokeWidth="2" />
            <path d="M50 20C52.5 23 52.5 41 50 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M54 16C58 21 58 43 54 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {/* Sac à dos écran */}
          <svg className="ph-obj ph-obj-4" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12C20 8 44 8 44 12V56H20V12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M20 20C16 20 12 24 12 28V52H20" stroke="currentColor" strokeWidth="2" />
            <path d="M44 20C48 20 52 24 52 28V52H44" stroke="currentColor" strokeWidth="2" />
            <rect x="24" y="16" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <line x1="28" y1="22" x2="36" y2="22" stroke="currentColor" strokeWidth="1.5" />
            <line x1="28" y1="26" x2="36" y2="26" stroke="currentColor" strokeWidth="1.5" />
            <line x1="28" y1="30" x2="33" y2="30" stroke="currentColor" strokeWidth="1.5" />
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
          {/* Ampoule / Enseigne lumineuse */}
          <svg className="ph-obj ph-obj-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 8C22 8 14 16 14 26C14 33 18 39 24 42V48H40V42C46 39 50 33 50 26C50 16 42 8 32 8Z" stroke="currentColor" strokeWidth="2" />
            <line x1="24" y1="52" x2="40" y2="52" stroke="currentColor" strokeWidth="2" />
            <line x1="26" y1="56" x2="38" y2="56" stroke="currentColor" strokeWidth="2" />
            <line x1="32" y1="14" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="18" x2="24" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="44" y1="18" x2="40" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {/* QR Code */}
          <svg className="ph-obj ph-obj-7" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="8" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
            <rect x="12" y="12" width="12" height="12" rx="1" fill="currentColor" opacity="0.4" />
            <rect x="36" y="8" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
            <rect x="40" y="12" width="12" height="12" rx="1" fill="currentColor" opacity="0.4" />
            <rect x="8" y="36" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
            <rect x="12" y="40" width="12" height="12" rx="1" fill="currentColor" opacity="0.4" />
            <line x1="36" y1="36" x2="44" y2="36" stroke="currentColor" strokeWidth="2" />
            <line x1="36" y1="44" x2="44" y2="44" stroke="currentColor" strokeWidth="2" />
            <line x1="36" y1="52" x2="44" y2="52" stroke="currentColor" strokeWidth="2" />
            <line x1="52" y1="36" x2="52" y2="44" stroke="currentColor" strokeWidth="2" />
            <line x1="52" y1="52" x2="52" y2="56" stroke="currentColor" strokeWidth="2" />
          </svg>
          {/* Signal / Wifi */}
          <svg className="ph-obj ph-obj-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 24C16 16 48 16 56 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 32C22 26 42 26 48 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 40C27 37 37 37 40 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="48" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-label">Expertise</span>
          <h1 className="page-title">Transport Urbain</h1>
          <p className="page-subtitle">
            Des solutions de publicité outdoor innovantes pour maximiser votre visibilité urbaine
          </p>
        </div>
      </section>

      {/* Transport Services */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Services de Transport</span>
            <h2 className="section-title">Nos solutions publicitaires urbaines</h2>
          </div>
          <div className="services-expertise-grid">
            {transportServices.map((service, index) => (
              <div
                key={index}
                className="service-expertise-card reveal"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {service.image && (
                  <div className="service-expertise-bg" style={{ backgroundImage: `url(${service.image})` }}></div>
                )}
                <div className="service-expertise-content">
                  <div className="service-expertise-header">
                    <div className="service-expertise-icon">
                      <service.icon size={32} strokeWidth={1.5} />
                    </div>
                    <span className="service-expertise-number">{service.number}</span>
                  </div>
                  <h3 className="service-expertise-title">{service.title}</h3>
                  <p className="service-expertise-description">{service.description}</p>
                  <div className="service-expertise-price">
                    {service.price}
                  </div>
                  <ul className="service-expertise-features">
                    {service.options.map((option, fIndex) => (
                      <li key={fIndex}>
                        <ArrowRight size={14} strokeWidth={2} />
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Informations importantes</span>
            <h2 className="section-title">Points à noter</h2>
          </div>
          <div className="additional-services-grid">
            {additionalInfo.map((info, index) => (
              <div
                key={index}
                className="additional-service-card reveal"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="additional-service-icon">
                  <Lightbulb size={28} strokeWidth={1.5} />
                </div>
                <p className="additional-service-description">{info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Méthodologie</span>
            <h2 className="section-title">Notre processus</h2>
          </div>
          <div className="process-expertise-grid">
            {process.map((item, index) => (
              <div
                key={index}
                className="process-expertise-card reveal"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <span className="process-expertise-step">{item.step}</span>
                <h3 className="process-expertise-title">{item.title}</h3>
                <p className="process-expertise-description">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="process-connector">
                    <ArrowRight size={20} strokeWidth={1.5} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Expertise
