import { Backpack, BarChart3, Car, FileText, MapPin, Monitor, Palette, Target, Users } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useScrollReveal } from '../hooks/useScrollReveal'
import AccentText from '../components/AccentText'
import InnerPageHero from '../components/InnerPageHero'

const supportImages = {
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

const handleMouseMoveSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}

function Expertise() {
  const { t } = useLanguage()

  useScrollReveal()

  const pillars = [
    {
      name: 'Onekana MediaMove',
      icon: Car,
      image: supportImages.carFlyers,
      intro: 'Supports disponibles sur véhicules, pour rendre la marque visible pendant les trajets et les arrêts.',
      supports: [
        { title: 'Car Flyers', image: supportImages.carFlyers, desc: 'Panneau de siège avec flyers intégrés pour une exposition captive dans le véhicule.' },
        { title: 'Car Screen', image: supportImages.carScreen, desc: 'Écran taxi pour diffuser des contenus animés et vidéos en mobilité.' },
        { title: 'Têtière', image: supportImages.tetiere, desc: "Housse d'appui-tête publicitaire placée dans le champ de regard des passagers." },
      ],
    },
    {
      name: 'Onekana Streets',
      icon: Backpack,
      image: supportImages.backpackFlag,
      intro: 'Backpack Flag, écrans mobiles piétons, stands et animations de zones pour engager les publics là où ils circulent.',
      supports: [
        { title: 'Backpack Flag', image: supportImages.backpackFlag, desc: 'Sac à dos drapeau avec distribution de flyers pour activer une zone précise.' },
        { title: 'Backpack Media', image: supportImages.backpackMediaStreets, desc: 'Sac à dos écran avec flyers pour combiner visibilité, mouvement et contact direct.' },
      ],
    },
    {
      name: 'Onekana DOOH',
      icon: Monitor,
      image: supportImages.backpackMediaDooh,
      intro: 'Supports digitaux sur site ou en mobilité pour donner du mouvement aux messages publicitaires.',
      supports: [
        { title: 'Backpack Media', image: supportImages.backpackMediaDooh, desc: 'Écran porté pour diffuser un message digital au plus près des flux piétons.' },
        { title: 'Car Screen', image: supportImages.carScreenDooh, desc: 'Écran taxi pour diffuser des contenus vidéos auprès des passagers et zones traversées.' },
      ],
    },
    {
      name: 'Onekana Connect',
      icon: BarChart3,
      image: supportImages.reporting,
      intro: 'Services marketing mesurables pour lire, suivre et améliorer les campagnes.',
      supports: [
        { title: 'Statistiques / Reporting', image: supportImages.reporting, desc: 'Synthèse de campagne, observations terrain et indicateurs utiles à la décision.' },
      ],
    },
    {
      name: 'Onekana Studio',
      icon: Palette,
      image: supportImages.design,
      intro: 'Services créatifs pour concevoir les contenus qui vivent sur les supports Onekana.',
      supports: [
        { title: 'Design flyers / affiches', image: supportImages.design, desc: 'Création de supports visuels adaptés à la rue, aux véhicules et aux écrans.' },
      ],
    },
    {
      name: 'Onekana Life',
      icon: FileText,
      image: supportImages.magazine,
      intro: 'Le magazine Onekana, pensé comme un prolongement éditorial des marques et de la vie urbaine.',
      supports: [
        { title: 'Magazine Onekana', image: supportImages.magazine, desc: 'Un espace de récit, de lifestyle local et de visibilité éditoriale.' },
      ],
    },
  ]

  const campaignCanvas = [
    {
      icon: Target,
      label: t({ fr: '01 / Intention', en: '01 / Intent' }),
      title: t({ fr: 'Votre objectif', en: 'Your objective' }),
      desc: t({ fr: 'Notoriété, lancement, trafic ou proximité : le rôle de la campagne guide tous les choix.', en: 'Awareness, launch, traffic or proximity: the campaign role guides every choice.' }),
      options: t({ fr: ['Faire connaître', 'Faire agir'], en: ['Build awareness', 'Drive action'] }),
    },
    {
      icon: Users,
      label: t({ fr: '02 / Public', en: '02 / Audience' }),
      title: t({ fr: 'Les personnes à toucher', en: 'The people to reach' }),
      desc: t({ fr: 'Nous identifions les habitudes, les trajets et les moments où le message sera vraiment utile.', en: 'We identify habits, journeys and moments when the message will truly matter.' }),
      options: t({ fr: ['Flux urbains', 'Communautés'], en: ['Urban flows', 'Communities'] }),
    },
    {
      icon: MapPin,
      label: t({ fr: '03 / Présence', en: '03 / Presence' }),
      title: t({ fr: 'Le mix de supports', en: 'The media mix' }),
      desc: t({ fr: 'Véhicules, agents piétons, écrans et création sont combinés selon le contexte réel.', en: 'Vehicles, street teams, screens and creative assets are combined for the real context.' }),
      options: t({ fr: ['Mobile', 'Terrain', 'Digital'], en: ['Mobile', 'Field', 'Digital'] }),
    },
    {
      icon: BarChart3,
      label: t({ fr: '04 / Preuves', en: '04 / Evidence' }),
      title: t({ fr: 'Les signaux à suivre', en: 'Signals to track' }),
      desc: t({ fr: 'Les observations terrain et indicateurs utiles sont définis avant le lancement, pas après.', en: 'Useful field observations and indicators are defined before launch, not after.' }),
      options: t({ fr: ['Reporting', 'Optimisation'], en: ['Reporting', 'Optimization'] }),
    },
  ]

  return (
    <div className="page expertise-page">
      <InnerPageHero
        variant="expertise"
        eyebrow={t({ fr: 'Expertise', en: 'Expertise' })}
        title={t({
          fr: [{ text: 'Des supports qui ' }, { text: 'prennent la ville.', accent: true }],
          en: [{ text: 'Media that ' }, { text: 'moves through the city.', accent: true }],
        })}
        description={t({
          fr: ['Mobile, terrain, digital et création : un écosystème conçu pour ', { text: 'faire circuler votre message.', accent: true }],
          en: ['Mobile, field, digital and creative: an ecosystem built to ', { text: 'move your message.', accent: true }],
        })}
        meta={t({ fr: ['6 pôles', '13 supports', '1 réseau'], en: ['6 hubs', '13 formats', '1 network'] })}
      >
        <div className="expertise-hero-stack">
          <figure className="expertise-hero-tile tile-car">
            <img src={supportImages.carFlyers} alt="Onekana MediaMove" />
            <figcaption>MediaMove</figcaption>
          </figure>
          <figure className="expertise-hero-tile tile-street">
            <img src={supportImages.backpackFlag} alt="Onekana Streets" />
            <figcaption>Streets</figcaption>
          </figure>
          <figure className="expertise-hero-tile tile-screen">
            <img src={supportImages.backpackMediaDooh} alt="Onekana DOOH" />
            <figcaption>DOOH</figcaption>
          </figure>
        </div>
      </InnerPageHero>

      <section className="section expertise-hubs-section">
        <div className="container">
          <div className="section-header reveal-rotate">
            <span className="section-label">{t({ fr: 'Supports & services', en: 'Media & services' })}</span>
            <h2 className="section-title">
              {t({ fr: 'Chaque solution joue ', en: 'Every solution has ' })}<span className="text-accent">{t({ fr: 'un rôle précis', en: 'a precise role' })}</span>
            </h2>
            <p className="section-intro accent-description">
              <AccentText parts={t({
                fr: ['Choisissez le contexte, nous construisons ', { text: 'la présence qui lui correspond.', accent: true }],
                en: ['Choose the context, we build ', { text: 'the presence that fits it.', accent: true }],
              })} />
            </p>
          </div>

          <div className="expertise-hubs-list">
            {pillars.map((pillar) => (
              <article key={pillar.name} className="expertise-hub-card card-spotlight reveal-up" onMouseMove={handleMouseMoveSpotlight}>
                <div className="expertise-hub-media">
                  <img src={pillar.image} alt="" loading="lazy" />
                </div>
                <div className="expertise-hub-content">
                  <div className="expertise-hub-title">
                    <div className="expertise-hub-icon"><pillar.icon size={28} strokeWidth={1.5} /></div>
                    <div>
                      <h3>{pillar.name}</h3>
                    </div>
                  </div>
                  <p>{pillar.intro}</p>
                  <div className="expertise-supports-grid">
                    {pillar.supports.map((support) => (
                      <div key={support.title} className="expertise-support-item">
                        <img src={support.image} alt="" loading="lazy" />
                        <div>
                          <h4>{support.title}</h4>
                          <p>{support.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      <section className="section section-alt expertise-method-section">
        <div className="container">
          <div className="expertise-method-layout">
            <div className="expertise-method-intro reveal-up">
              <span className="section-label">{t({ fr: 'Méthodologie', en: 'Methodology' })}</span>
              <h2 className="section-title">
                {t({ fr: 'Une architecture de campagne, ', en: 'A campaign architecture, ' })}<span className="text-accent">{t({ fr: 'pas une recette figée', en: 'not a fixed recipe' })}</span>
              </h2>
              <p>{t({ fr: 'La méthode Onekana met quatre décisions sur la même table. Leur combinaison construit un dispositif adapté à votre marque et à la ville.', en: 'The Onekana method puts four decisions on the same table. Their combination builds a campaign suited to your brand and the city.' })}</p>
              <div className="expertise-method-summary">
                <strong>{t({ fr: '1 brief', en: '1 brief' })}</strong>
                <span>{t({ fr: '4 angles de décision', en: '4 decision angles' })}</span>
              </div>
            </div>

            <div className="expertise-canvas reveal-stagger">
              {campaignCanvas.map((item) => (
                <article key={item.title} className="expertise-canvas-card card-spotlight" onMouseMove={handleMouseMoveSpotlight}>
                  <div className="expertise-canvas-card-head">
                    <div className="expertise-canvas-icon"><item.icon size={24} strokeWidth={1.7} /></div>
                    <span>{item.label}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="expertise-canvas-options">
                    {item.options.map((option) => <span key={option}>{option}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Expertise
