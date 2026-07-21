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
  const [activeTeamRole, setActiveTeamRole] = useState('strategy')
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

  const teamRoles = [
    {
      id: 'strategy',
      label: t({ fr: 'Stratégie', en: 'Strategy' }),
      icon: Target,
      image: '/images/onekana/agency-behind-campaign.png',
      title: t({ fr: 'Donner une direction au mouvement', en: 'Give direction to the movement' }),
      text: t({
        fr: 'L’équipe transforme l’objectif de la marque en choix de publics, de zones et de supports cohérents.',
        en: 'The team turns the brand objective into coherent audience, area and media choices.',
      }),
      output: t({ fr: 'Direction de campagne', en: 'Campaign direction' }),
    },
    {
      id: 'creative',
      label: t({ fr: 'Création', en: 'Creation' }),
      icon: Sparkles,
      image: '/images/onekana/studio-connect-life.png',
      title: t({ fr: 'Créer pour être compris dans la ville', en: 'Create for understanding in the city' }),
      text: t({
        fr: 'Les messages et visuels sont adaptés au rythme de la rue, des véhicules et des écrans.',
        en: 'Messages and visuals are adapted to the pace of streets, vehicles and screens.',
      }),
      output: t({ fr: 'Concepts prêts pour le terrain', en: 'Field-ready concepts' }),
    },
    {
      id: 'field',
      label: t({ fr: 'Terrain', en: 'Field' }),
      icon: MapPin,
      image: '/images/onekana/streets-dooh.png',
      title: t({ fr: 'Faire vivre le dispositif au bon endroit', en: 'Bring the campaign to life in the right place' }),
      text: t({
        fr: 'Les coordinateurs organisent les supports, les équipes et les points de contact dans la ville.',
        en: 'Coordinators organize the media, teams and touchpoints across the city.',
      }),
      output: t({ fr: 'Activation coordonnée', en: 'Coordinated activation' }),
    },
    {
      id: 'measurement',
      label: t({ fr: 'Mesure', en: 'Measurement' }),
      icon: BarChart3,
      image: '/images/onekana/supports/reporting.png',
      title: t({ fr: 'Transformer le terrain en lecture utile', en: 'Turn field activity into useful insight' }),
      text: t({
        fr: 'Les observations et données disponibles sont structurées pour comprendre et améliorer la campagne.',
        en: 'Available observations and data are structured to understand and improve the campaign.',
      }),
      output: t({ fr: 'Reporting compréhensible', en: 'Clear reporting' }),
    },
  ]

  const activeTeam = teamRoles.find((role) => role.id === activeTeamRole) || teamRoles[0]
  const ActiveTeamIcon = activeTeam.icon

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
          <div className="agence-role-header section-header reveal-up">
            <span className="section-label">{t({ fr: 'Notre rôle', en: 'Our role' })}</span>
            <h2 className="section-title">
              {t({ fr: 'Transformer les rues, les véhicules et les écrans en ', en: 'Turn streets, vehicles and screens into ' })}
              <span className="text-accent">{t({ fr: 'points de contact.', en: 'contact points.' })}</span>
            </h2>
            <p className="about-text accent-description">
              <AccentText parts={t({
                fr: ['Onekana relie stratégie, création, activation terrain et reporting. La marque devient ', { text: 'visible dans les vrais mouvements de la ville.', accent: true }],
                en: ['Onekana connects strategy, creation, field activation and reporting. The brand becomes ', { text: 'visible in the city’s real movement.', accent: true }],
              })} />
            </p>
          </div>

          <div className="agence-role-team-label reveal-up">
            <span>{t({ fr: 'Derrière chaque campagne', en: 'Behind every campaign' })}</span>
            <p>{t({
              fr: 'Une même équipe relie la réflexion, la création, le terrain et la lecture des résultats.',
              en: 'One team connects thinking, creation, field execution and the reading of results.',
            })}</p>
          </div>

          <div className="agence-team-layout">
            <figure className="agence-team-visual reveal-left">
              <img
                key={activeTeam.image}
                src={activeTeam.image}
                alt={t({
                  fr: `Expertise ${activeTeam.label} de l’équipe Onekana à Lubumbashi`,
                  en: `Onekana ${activeTeam.label} expertise in Lubumbashi`,
                })}
                className="agence-team-image-active"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span />
                {t({ fr: 'Création et coordination en équipe', en: 'Team creation and coordination' })}
              </figcaption>
            </figure>

            <div className="agence-team-workspace reveal-right">
              <div className="agence-team-tabs" role="tablist" aria-label={t({ fr: 'Métiers Onekana', en: 'Onekana skills' })}>
                {teamRoles.map((role) => {
                  const RoleIcon = role.icon
                  return (
                    <button
                      key={role.id}
                      type="button"
                      role="tab"
                      aria-selected={activeTeamRole === role.id}
                      className={activeTeamRole === role.id ? 'active' : ''}
                      onClick={() => setActiveTeamRole(role.id)}
                    >
                      <RoleIcon size={19} strokeWidth={1.8} />
                      {role.label}
                    </button>
                  )
                })}
              </div>

              <div className="agence-team-panel" key={activeTeamRole} role="tabpanel">
                <ActiveTeamIcon size={30} strokeWidth={1.6} aria-hidden="true" />
                <h3>{activeTeam.title}</h3>
                <p>{activeTeam.text}</p>
                <div className="agence-team-output">
                  <CheckCircle size={18} aria-hidden="true" />
                  <span>{activeTeam.output}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="agence-process-section section section-alt">
        <div className="container">
          <div className="section-header reveal-rotate">
            <span className="section-label">{t({ fr: 'Notre façon de faire', en: 'How we work' })}</span>
            <h2 className="section-title">
              {t({ fr: 'Un parcours simple, ', en: 'A simple path ' })}
              <span className="text-accent">{t({ fr: 'du terrain au reporting', en: 'from field to reporting' })}</span>
            </h2>
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
            <h2 className="section-title">
              {t({ fr: 'Ce qui nous ', en: 'What ' })}<span className="text-accent">{t({ fr: 'définit', en: 'defines us' })}</span>
            </h2>
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

      <section className="agence-cta-section section section-alt">
        <div className="container">
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
