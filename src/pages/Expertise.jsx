import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Backpack, BarChart3, Car, FileText, MapPin, Monitor, Palette, Target, Users } from 'lucide-react'
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
  const [activeContext, setActiveContext] = useState('vehicle')

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

  const contactContexts = [
    {
      id: 'vehicle',
      icon: Car,
      label: t({ fr: 'Dans un véhicule', en: 'Inside a vehicle' }),
      pole: 'Onekana MediaMove',
      poleSlug: 'mediamove',
      support: 'Car Screen',
      image: supportImages.carScreen,
      title: t({ fr: 'Créer un contact pendant le trajet', en: 'Create contact during the journey' }),
      description: t({
        fr: 'Le Car Screen installe un message animé dans un moment où le passager est disponible et attentif.',
        en: 'Car Screen places an animated message in a moment when passengers are available and attentive.',
      }),
      benefit: t({ fr: 'Visibilité embarquée', en: 'In-vehicle visibility' }),
    },
    {
      id: 'street',
      icon: Users,
      label: t({ fr: 'Dans la rue', en: 'In the street' }),
      pole: 'Onekana Streets',
      poleSlug: 'streets',
      support: 'Backpack Flag',
      image: supportImages.backpackFlag,
      title: t({ fr: 'Rendre une présence visible en mouvement', en: 'Make a presence visible in motion' }),
      description: t({
        fr: 'Le Backpack Flag accompagne les flux piétons et facilite le contact direct avec la distribution de flyers.',
        en: 'Backpack Flag moves with pedestrian flows and supports direct contact through flyer distribution.',
      }),
      benefit: t({ fr: 'Présence piétonne', en: 'Pedestrian presence' }),
    },
    {
      id: 'zone',
      icon: MapPin,
      label: t({ fr: 'Dans une zone précise', en: 'In a specific area' }),
      pole: 'Onekana Streets',
      poleSlug: 'streets',
      support: 'Backpack Media',
      image: supportImages.backpackMediaStreets,
      title: t({ fr: 'Activer un lieu avec image et contact', en: 'Activate a place with image and contact' }),
      description: t({
        fr: 'Le Backpack Media combine écran mobile et présence humaine pour concentrer la campagne sur une zone utile.',
        en: 'Backpack Media combines a mobile screen and human presence to focus the campaign on a useful area.',
      }),
      benefit: t({ fr: 'Activation localisée', en: 'Localized activation' }),
    },
    {
      id: 'screen',
      icon: Monitor,
      label: t({ fr: 'Sur un écran', en: 'On a screen' }),
      pole: 'Onekana DOOH',
      poleSlug: 'dooh',
      support: 'Backpack Media DOOH',
      image: supportImages.backpackMediaDooh,
      title: t({ fr: 'Donner du mouvement au message', en: 'Bring movement to the message' }),
      description: t({
        fr: 'Un écran porté diffuse des créations dynamiques au plus près des zones de passage et des publics.',
        en: 'A wearable screen delivers dynamic creative close to high-traffic areas and audiences.',
      }),
      benefit: t({ fr: 'Impact digital mobile', en: 'Mobile digital impact' }),
    },
    {
      id: 'creative',
      icon: Palette,
      label: t({ fr: 'Créer les visuels', en: 'Create the visuals' }),
      pole: 'Onekana Studio',
      poleSlug: 'studio',
      support: 'Design flyers / affiches',
      image: supportImages.design,
      title: t({ fr: 'Adapter la création à chaque support', en: 'Adapt creative to every medium' }),
      description: t({
        fr: 'Onekana Studio conçoit des visuels lisibles dans la rue, dans les véhicules et sur les écrans.',
        en: 'Onekana Studio designs visuals that remain readable in streets, vehicles and on screens.',
      }),
      benefit: t({ fr: 'Création prête à diffuser', en: 'Ready-to-run creative' }),
    },
    {
      id: 'measure',
      icon: BarChart3,
      label: t({ fr: 'Mesurer la campagne', en: 'Measure the campaign' }),
      pole: 'Onekana Connect',
      poleSlug: 'connect',
      support: 'Statistiques / Reporting',
      image: supportImages.reporting,
      title: t({ fr: 'Transformer l’action en lecture claire', en: 'Turn action into a clear view' }),
      description: t({
        fr: 'Onekana Connect rassemble les observations et indicateurs utiles pour comprendre la campagne et préparer la suite.',
        en: 'Onekana Connect gathers useful observations and indicators to understand the campaign and prepare what comes next.',
      }),
      benefit: t({ fr: 'Décisions mieux informées', en: 'Better-informed decisions' }),
    },
  ]

  const selectedContext = contactContexts.find((item) => item.id === activeContext) || contactContexts[0]
  const SelectedContextIcon = selectedContext.icon

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
        meta={t({ fr: ['6 pôles', '10 supports', '1 réseau'], en: ['6 hubs', '10 formats', '1 network'] })}
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

      <section className="section expertise-finder-section">
        <div className="container">
          <div className="expertise-finder-header section-header reveal-up">
            <span className="section-label">{t({ fr: 'Trouver le bon point de contact', en: 'Find the right touchpoint' })}</span>
            <h2 className="section-title">
              {t({ fr: 'Où votre public doit-il ', en: 'Where should your audience ' })}
              <span className="text-accent">{t({ fr: 'rencontrer votre message ?', en: 'meet your message?' })}</span>
            </h2>
            <p>{t({
              fr: 'Choisissez une situation : nous vous orientons vers le support Onekana le plus pertinent.',
              en: 'Choose a situation and we will guide you toward the most relevant Onekana medium.',
            })}</p>
          </div>

          <div className="expertise-finder-tool reveal-up">
            <div className="expertise-finder-tabs" role="tablist" aria-label={t({ fr: 'Contextes de diffusion', en: 'Media contexts' })}>
              {contactContexts.map((context) => {
                const ContextIcon = context.icon
                return (
                  <button
                    key={context.id}
                    type="button"
                    role="tab"
                    aria-selected={activeContext === context.id}
                    className={activeContext === context.id ? 'active' : ''}
                    onClick={() => setActiveContext(context.id)}
                  >
                    <ContextIcon size={20} strokeWidth={1.8} />
                    <span>{context.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="expertise-finder-result" key={selectedContext.id} role="tabpanel">
              <div className="expertise-finder-media">
                <img src={selectedContext.image} alt="" loading="lazy" decoding="async" />
                <span>{selectedContext.pole}</span>
              </div>
              <div className="expertise-finder-copy">
                <SelectedContextIcon size={30} strokeWidth={1.6} aria-hidden="true" />
                <small>{selectedContext.support}</small>
                <h3>{selectedContext.title}</h3>
                <p>{selectedContext.description}</p>
                <strong>{selectedContext.benefit}</strong>
                <Link
                  to={`/contact?pole=${selectedContext.poleSlug}&support=${encodeURIComponent(selectedContext.support)}`}
                  className="expertise-finder-link"
                >
                  {t({ fr: 'Préparer une demande', en: 'Prepare a request' })}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <img src={pillar.image} alt="" loading="lazy" decoding="async" />
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
                        <img src={support.image} alt="" loading="lazy" decoding="async" />
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
