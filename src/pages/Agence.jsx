import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  BarChart3,
  CheckCircle,
  Eye,
  Layers,
  Lightbulb,
  MapPin,
  Megaphone,
  MousePointer2,
  Rocket,
  Route,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
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
  const [activeFocus, setActiveFocus] = useState('terrain')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active')
        })
      },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    )

    document
      .querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-stagger, .reveal-scale, .reveal-blur, .reveal-rotate, .reveal-wipe')
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const focusItems = [
    {
      id: 'terrain',
      label: t({ fr: 'Terrain', en: 'Field' }),
      icon: MapPin,
      image: '/images/onekana/mediamove.png',
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
      title: t({ fr: 'Observer', en: 'Observe' }),
      text: t({ fr: 'Lire les zones, les flux et les habitudes avant de choisir le support.', en: 'Read zones, flows and habits before choosing the medium.' }),
    },
    {
      icon: Lightbulb,
      title: t({ fr: 'Créer', en: 'Create' }),
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
      text: t({ fr: 'Rassembler les retours, les chiffres et les apprentissages pour améliorer.', en: 'Collect feedback, numbers and learnings to improve.' }),
    },
  ]

  const values = [
    {
      icon: Route,
      title: t({ fr: 'Terrain', en: 'Field' }),
      metric: t({ fr: 'Ville réelle', en: 'Real city' }),
      description: t({
        fr: 'Nous concevons les campagnes pour les trajets, les quartiers et les lieux vécus à Lubumbashi.',
        en: 'We design campaigns for routes, neighborhoods and lived spaces in Lubumbashi.',
      }),
    },
    {
      icon: Sparkles,
      title: t({ fr: 'Créativité utile', en: 'Useful creativity' }),
      metric: t({ fr: 'Compris vite', en: 'Fast clarity' }),
      description: t({
        fr: 'Le beau compte, mais le message doit surtout être clair, mémorisable et adapté au support.',
        en: 'Beauty matters, but the message must be clear, memorable and adapted to the medium.',
      }),
    },
    {
      icon: Users,
      title: t({ fr: 'Proximité', en: 'Proximity' }),
      metric: t({ fr: 'Équipe locale', en: 'Local team' }),
      description: t({
        fr: 'Nous restons proches des marques, des agents terrain et des réalités de la ville.',
        en: 'We stay close to brands, field agents and the realities of the city.',
      }),
    },
    {
      icon: BarChart3,
      title: t({ fr: 'Mesure', en: 'Measure' }),
      metric: t({ fr: 'Retours lisibles', en: 'Readable returns' }),
      description: t({
        fr: 'Les observations et chiffres donnent une base concrète pour décider la suite.',
        en: 'Observations and numbers provide a concrete base for the next decision.',
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
      <section className="page-header page-header-agence agence-hero">
        <div className="cinematic-grid-bg" />
        <div className="page-header-objects" aria-hidden="true">
          <Megaphone className="ph-obj ph-obj-1" strokeWidth={1.2} />
          <MousePointer2 className="ph-obj ph-obj-2" strokeWidth={1.2} />
          <Layers className="ph-obj ph-obj-3" strokeWidth={1.2} />
          <MapPin className="ph-obj ph-obj-4" strokeWidth={1.2} />
        </div>
        <div className="container agence-hero-inner">
          <span className="page-label reveal-up active">{t({ fr: "L'Agence", en: 'The Agency' })}</span>
          <h1 className="page-title reveal-up active" style={{ transitionDelay: '0.1s' }}>
            {t({ fr: 'Onekana fait vivre la publicité dans la ville', en: 'Onekana brings advertising into the city' })}
          </h1>
          <p className="page-subtitle reveal-up active" style={{ transitionDelay: '0.2s' }}>
            {t({
              fr: 'Une agence urbaine, mobile, créative et mesurable, pensée pour les marques qui veulent être vues à Lubumbashi.',
              en: 'An urban, mobile, creative and measurable agency built for brands that want to be seen in Lubumbashi.',
            })}
          </p>
        </div>
      </section>

      <section className="agence-focus-section section">
        <div className="container">
          <div className="agence-focus-grid">
            <div className="agence-focus-copy reveal-left">
              <span className="section-label">{t({ fr: 'Notre rôle', en: 'Our role' })}</span>
              <h2 className="section-title">
                {t({ fr: 'Transformer les rues, les véhicules et les écrans en points de contact.', en: 'Turn streets, vehicles and screens into contact points.' })}
              </h2>
              <p className="about-text">
                {t({
                  fr: "Onekana relie stratégie, création, activation terrain et reporting. L'agence ne raconte pas seulement une marque: elle la rend visible là où les gens circulent, attendent et décident.",
                  en: 'Onekana connects strategy, creation, field activation and reporting. The agency does not only tell a brand story: it makes it visible where people move, wait and decide.',
                })}
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
          <div className="agence-process-grid reveal-stagger">
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
      </section>

      <section className="agence-values-section section">
        <div className="container">
          <div className="section-header reveal-rotate">
            <span className="section-label">{t({ fr: 'Ce qui nous définit', en: 'What defines us' })}</span>
            <h2 className="section-title">{t({ fr: 'Des valeurs qui se voient sur le terrain', en: 'Values you can see in the field' })}</h2>
          </div>
          <div className="agence-values-grid reveal-stagger">
            {values.map((value) => (
              <article key={value.title} className="agence-value-card card-spotlight" onMouseMove={handleMouseMoveSpotlight}>
                <div className="value-icon">
                  <value.icon size={28} strokeWidth={1.6} />
                </div>
                <span>{value.metric}</span>
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
