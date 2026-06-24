import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Eye,
  Lightbulb,
  MapPin,
  Rocket,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useScrollReveal } from '../hooks/useScrollReveal'
import AccentText from '../components/AccentText'
import InnerPageHero from '../components/InnerPageHero'

const handleMouseMoveSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
}

function Agence() {
  const { t } = useLanguage()
  const [activeFocus, setActiveFocus] = useState('terrain')
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)

  useScrollReveal()

  const heroSlides = [
    {
      image: '/images/onekana/supports/car-flyers.png',
      label: 'Onekana MediaMove',
      alt: t({ fr: 'Activation publicitaire mobile Onekana à Lubumbashi', en: 'Onekana mobile advertising activation in Lubumbashi' }),
    },
    {
      image: '/images/onekana/streets-dooh.png',
      label: 'Onekana Streets & DOOH',
      alt: t({ fr: 'Activation piétonne et digitale Onekana à Lubumbashi', en: 'Onekana street and digital activation in Lubumbashi' }),
    },
    {
      image: '/images/onekana/studio-connect-life.png',
      label: 'Onekana Studio & Connect',
      alt: t({ fr: 'Équipe créative et reporting Onekana', en: 'Onekana creative and reporting team' }),
    },
  ]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length)
    }, 4800)
    return () => window.clearInterval(timer)
  }, [heroSlides.length])

  const changeHeroSlide = (direction) => {
    setActiveHeroSlide((current) => (current + direction + heroSlides.length) % heroSlides.length)
  }

  const focusItems = [
    {
      id: 'terrain',
      label: t({ fr: 'Terrain', en: 'Field' }),
      icon: MapPin,
      image: '/images/onekana/supports/car-flyers.png',
      title: t({ fr: 'Nous partons des flux réels', en: 'We start from real movement' }),
      text: t({
        fr: 'Quartiers, taxis, lieux de passage, commerces et habitudes locales guident chaque dispositif.',
        en: 'Neighborhoods, taxis, high-traffic places, shops and local habits guide every campaign.',
      }),
      stat: t({ fr: 'Zones utiles', en: 'Useful zones' }),
    },
    {
      id: 'creation',
      label: t({ fr: 'Création', en: 'Creation' }),
      icon: Sparkles,
      image: '/images/onekana/studio-connect-life.png',
      title: t({ fr: 'Nous créons pour être compris vite', en: 'We create for fast understanding' }),
      text: t({
        fr: 'Flyers, affiches, clips et messages sont pensés pour la rue, le mouvement et les écrans.',
        en: 'Flyers, posters, clips and messages are designed for streets, movement and screens.',
      }),
      stat: t({ fr: 'Visuels terrain', en: 'Field visuals' }),
    },
    {
      id: 'mesure',
      label: t({ fr: 'Mesure', en: 'Measure' }),
      icon: BarChart3,
      image: '/images/onekana/supports/reporting.png',
      title: t({ fr: 'Nous rendons l’action lisible', en: 'We make action readable' }),
      text: t({
        fr: 'Onekana Connect structure les retours terrain, les statistiques et les observations utiles.',
        en: 'Onekana Connect structures field feedback, statistics and useful observations.',
      }),
      stat: t({ fr: 'Reporting clair', en: 'Clear reporting' }),
    },
    {
      id: 'impact',
      label: t({ fr: 'Impact', en: 'Impact' }),
      icon: Target,
      image: '/images/onekana/streets-dooh.png',
      title: t({ fr: 'Nous prolongeons la présence de marque', en: 'We extend brand presence' }),
      text: t({
        fr: 'Les supports mobiles, piétons, digitaux et éditoriaux créent une présence qui reste visible.',
        en: 'Mobile, pedestrian, digital and editorial media create presence that remains visible.',
      }),
      stat: t({ fr: 'Présence locale', en: 'Local presence' }),
    },
  ]

  const active = focusItems.find((item) => item.id === activeFocus) || focusItems[0]

  const processSteps = [
    {
      icon: Eye,
      title: t({ fr: 'Ecouter', en: 'Listen' }),
      text: t({ fr: 'Lire les zones, les flux et les habitudes avant de choisir le support.', en: 'Read zones, flows and habits before choosing the medium.' }),
    },
    {
      icon: Lightbulb,
      title: t({ fr: 'Concevoir', en: 'Plan' }),
      text: t({ fr: 'Adapter le message aux véhicules, à la rue, aux écrans et au contact direct.', en: 'Adapt the message to vehicles, streets, screens and direct contact.' }),
    },
    {
      icon: Rocket,
      title: t({ fr: 'Déployer', en: 'Deploy' }),
      text: t({ fr: 'Activer les bons supports Onekana au bon endroit, avec une équipe terrain.', en: 'Activate the right Onekana media in the right place, with a field team.' }),
    },
    {
      icon: BarChart3,
      title: t({ fr: 'Mesurer', en: 'Measure' }),
      text: t({ fr: 'Rassembler les retours, les chiffres et les retours d\'expériences pour améliorer.', en: 'Collect feedback, numbers and learnings to improve.' }),
    },
  ]

  const values = [
    {
      icon: Lightbulb,
      title: t({ fr: 'Créativité', en: 'Creativity' }),
      description: t({
        fr: 'Nous repoussons les limites pour créer des designs uniques et mémorables.',
        en: 'We push boundaries to create unique and memorable designs.',
      }),
    },
    {
      icon: Award,
      title: t({ fr: 'Excellence', en: 'Excellence' }),
      description: t({
        fr: 'Chaque projet est une opportunité de dépasser les attentes.',
        en: 'Every project is an opportunity to exceed expectations.',
      }),
    },
    {
      icon: Users,
      title: t({ fr: 'Collaboration', en: 'Collaboration' }),
      description: t({
        fr: 'Nous travaillons main dans la main avec nos clients pour des résultats optimaux.',
        en: 'We work hand in hand with our clients to achieve the best results.',
      }),
    },
    {
      icon: Rocket,
      title: t({ fr: 'Innovation', en: 'Innovation' }),
      description: t({
        fr: 'Nous restons à la pointe des dernières technologies et tendances.',
        en: 'We stay at the forefront of the latest technologies and trends.',
      }),
    },
  ]

  const stats = [
    { number: '50+', label: t({ fr: 'Clients actifs', en: 'Active clients' }) },
    { number: '200+', label: t({ fr: 'Campagnes lancées', en: 'Campaigns launched' }) },
    { number: '3 ans', label: t({ fr: "D'expérience", en: 'Experience' }) },
    { number: '98%', label: t({ fr: 'Satisfaction client', en: 'Client satisfaction' }) },
  ]

  return (
    <div className="page agence-page">
      <InnerPageHero
        variant="agency"
        eyebrow={t({ fr: "L'Agence", en: 'The Agency' })}
        title={t({
          fr: [{ text: 'La ville devient ' }, { text: 'votre média.', accent: true }],
          en: [{ text: 'The city becomes ' }, { text: 'your media.', accent: true }],
        })}
        description={t({
          fr: ['Une agence ancrée à ', { text: 'Lubumbashi', accent: true }, ', où stratégie, création et terrain avancent ensemble.'],
          en: ['An agency rooted in ', { text: 'Lubumbashi', accent: true }, ', where strategy, creation and field execution move together.'],
        })}
        meta={t({ fr: ['Terrain', 'Création', 'Mesure'], en: ['Field', 'Creation', 'Measure'] })}
      >
        <div className="agency-hero-visual">
          <img
            key={heroSlides[activeHeroSlide].image}
            src={heroSlides[activeHeroSlide].image}
            alt={heroSlides[activeHeroSlide].alt}
            className="agency-hero-slide"
          />
          <div className="agency-hero-stamp"><MapPin size={18} /> Lubumbashi</div>
          <div className="agency-hero-signal"><span />{t({ fr: 'Présence active', en: 'Live presence' })}</div>
          <div className="agency-hero-caption" aria-live="polite">
            <small>{String(activeHeroSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}</small>
            <strong>{heroSlides[activeHeroSlide].label}</strong>
          </div>
          <div className="agency-hero-controls">
            <button type="button" onClick={() => changeHeroSlide(-1)} aria-label={t({ fr: 'Image précédente', en: 'Previous image' })}><ChevronLeft size={20} /></button>
            <div className="agency-hero-dots">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  className={activeHeroSlide === index ? 'active' : ''}
                  onClick={() => setActiveHeroSlide(index)}
                  aria-label={`${t({ fr: 'Afficher', en: 'Show' })} ${slide.label}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => changeHeroSlide(1)} aria-label={t({ fr: 'Image suivante', en: 'Next image' })}><ChevronRight size={20} /></button>
          </div>
        </div>
      </InnerPageHero>

      <section className="agence-focus-section section">
        <div className="container">
          <div className="agence-focus-grid">
            <div className="agence-focus-copy reveal-left">
              <span className="section-label">{t({ fr: 'Notre rôle', en: 'Our role' })}</span>
              <h2 className="section-title">
                {t({ fr: 'Transformer les rues, les véhicules et les écrans en points de contact.', en: 'Turn streets, vehicles and screens into contact points.' })}
              </h2>
              <p className="about-text accent-description">
                <AccentText parts={t({
                  fr: ['Onekana relie stratégie, création, activation terrain et reporting. La marque devient ', { text: 'visible dans les vrais mouvements de la ville.', accent: true }],
                  en: ['Onekana connects strategy, creation, field activation and reporting. The brand becomes ', { text: 'visible in the city’s real movement.', accent: true }],
                })} />
              </p>

              <div className="agence-focus-tabs" role="tablist" aria-label={t({ fr: 'Axes Onekana', en: 'Onekana focus areas' })}>
                {focusItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`agence-focus-tab${activeFocus === item.id ? ' active' : ''}`}
                    onClick={() => setActiveFocus(item.id)}
                  >
                    <item.icon size={18} strokeWidth={1.8} />
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="agence-focus-panel card-spotlight" onMouseMove={handleMouseMoveSpotlight}>
                <span>{active.stat}</span>
                <h3>{active.title}</h3>
                <p>{active.text}</p>
              </div>
            </div>

            <div className="agence-visual-card reveal-right">
              <img src={active.image} alt="" className="agence-visual-image" />
              <div className="agence-floating-badge badge-terrain">
                <MapPin size={16} /> {t({ fr: 'Terrain', en: 'Field' })}
              </div>
              <div className="agence-floating-badge badge-creation">
                <Sparkles size={16} /> {t({ fr: 'Création', en: 'Creation' })}
              </div>
              <div className="agence-floating-badge badge-mesure">
                <BarChart3 size={16} /> {t({ fr: 'Mesure', en: 'Measure' })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="agence-process-section section section-alt">
        <div className="container">
          <div className="section-header reveal-rotate">
            <span className="section-label">{t({ fr: 'Notre façon de faire', en: 'How we work' })}</span>
            <h2 className="section-title">{t({ fr: 'Un parcours simple, du terrain au reporting', en: 'A simple path from field to reporting' })}</h2>
          </div>
          <div className="agence-process-track reveal-stagger">
            <div className="agence-process-line" aria-hidden="true" />
            <div className="agence-process-grid">
            {processSteps.map((step, index) => (
              <article key={step.title} className="agence-process-card card-spotlight" onMouseMove={handleMouseMoveSpotlight}>
                <span className="process-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="process-icon"><step.icon size={26} strokeWidth={1.6} /></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="agence-values-section section">
        <div className="container">
          <div className="section-header reveal-rotate">
            <span className="section-label">{t({ fr: 'Nos valeurs', en: 'Our values' })}</span>
            <h2 className="section-title">{t({ fr: 'Ce qui nous définit', en: 'What defines us' })}</h2>
          </div>
          <div className="agence-values-grid reveal-stagger">
            {values.map((value) => (
              <article key={value.title} className="agence-value-card card-spotlight" onMouseMove={handleMouseMoveSpotlight}>
                <div className="value-icon">
                  <value.icon size={28} strokeWidth={1.6} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="agence-stats-section section section-alt">
        <div className="container">
          <div className="agence-stats-card reveal-up">
            {stats.map((stat, index) => (
              <div key={stat.label} className="agence-stat-item">
                <strong>{stat.number}</strong>
                <span>{stat.label}</span>
                {index < stats.length - 1 && <i aria-hidden="true" />}
              </div>
            ))}
          </div>
          <div className="agence-bottom-cta reveal-up">
            <p>{t({ fr: 'Besoin de rendre votre marque visible dans la ville ?', en: 'Need to make your brand visible in the city?' })}</p>
            <Link to="/contact" className="btn btn-primary">
              {t({ fr: 'Parler à Onekana', en: 'Talk to Onekana' })} <CheckCircle size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Agence
