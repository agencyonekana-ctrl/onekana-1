import { useEffect } from 'react'
import { ArrowRight, Backpack, BarChart3, Car, FileText, Monitor, Palette } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

const supportImages = {
  carFlyers: '/images/onekana/supports/car-flyers.png',
  carMedia: '/images/onekana/supports/car-media.png',
  carScreen: '/images/onekana/supports/car-screen.png',
  taxiTop: '/images/onekana/supports/taxi-top.png',
  tetiere: '/images/onekana/supports/tetiere.png',
  backpackFlag: '/images/onekana/supports/backpack-flag.png',
  backpackMediaStreets: '/images/onekana/supports/backpack-media-streets.png',
  backpackMediaDooh: '/images/onekana/supports/backpack-media-dooh.png',
  carScreenDooh: '/images/onekana/supports/car-screen-dooh.png',
  reporting: '/images/onekana/supports/reporting.png',
  design: '/images/onekana/supports/design-flyers-affiches.png',
  clips: '/images/onekana/supports/clips-publicitaires.png',
  magazine: '/images/onekana/supports/onekana-life-magazine.png',
}

const handleMouseMoveSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}

function Expertise() {
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active')
        })
      },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-stagger, .reveal-scale, .reveal-blur, .reveal-rotate').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const pillars = [
    {
      name: 'Onekana MediaMove',
      icon: Car,
      image: supportImages.carMedia,
      intro: 'Tous supports mobiles sur véhicules, pour rendre la marque visible pendant les trajets et les arrêts.',
      supports: [
        { title: 'Car Flyers', image: supportImages.carFlyers, desc: 'Panneau de siège avec flyers intégrés pour une exposition captive dans le véhicule.' },
        { title: 'Car Media', image: supportImages.carMedia, desc: 'Aimants de taxi pour transformer les véhicules en médias mobiles visibles.' },
        { title: 'Car Screen', image: supportImages.carScreen, desc: 'Écran taxi pour diffuser des contenus animés et vidéos en mobilité.' },
        { title: 'Taxi Top', image: supportImages.taxiTop, desc: 'Enseigne lumineuse sur taxi pour une visibilité haute, urbaine et nocturne.' },
        { title: 'Têtière', image: supportImages.tetiere, desc: "Housse d'appui-tête publicitaire placée dans le champ de regard des passagers." },
      ],
    },
    {
      name: 'Onekana Streets',
      icon: Backpack,
      image: supportImages.backpackFlag,
      intro: 'Supports mobiles piétons, stands et animations de zones pour engager les publics là où ils circulent.',
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
        { title: 'Clips publicitaires', image: supportImages.clips, desc: 'Création audiovisuelle courte pour écrans, activations et diffusion digitale.' },
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

  const process = [
    { step: '01', title: 'Cadrage', desc: 'Objectifs, audience, zones de diffusion et formats adaptés.' },
    { step: '02', title: 'Création', desc: 'Visuels, contenus vidéos et messages conçus pour le terrain.' },
    { step: '03', title: 'Activation', desc: 'Déploiement des supports mobiles, digitaux ou piétons.' },
    { step: '04', title: 'Reporting', desc: 'Retour terrain et statistiques pour mesurer et optimiser.' },
  ]

  return (
    <div className="page">
      <section className="page-header page-header-expertise">
        <div className="cinematic-grid-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-label reveal-up active">{t({ fr: 'Expertise', en: 'Expertise' })}</span>
          <h1 className="page-title reveal-up active" style={{ transitionDelay: '0.1s' }}>{t({ fr: "Pôles d'expertise", en: 'Expertise Hubs' })}</h1>
          <p className="page-subtitle reveal-up active" style={{ transitionDelay: '0.2s' }}>
            {t({
              fr: 'Des supports mobiles, digitaux, créatifs et mesurables pour faire vivre votre publicité à Lubumbashi.',
              en: 'Mobile, digital, creative and measurable media that bring your advertising to life in Lubumbashi.'
            })}
          </p>
        </div>
      </section>

      <section className="section expertise-hubs-section">
        <div className="container">
          <div className="section-header reveal-rotate">
            <span className="section-label">Supports & services</span>
            <h2 className="section-title">Chaque solution a son contexte visuel</h2>
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
                      <span>Pôle d'expertise</span>
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

          <p className="visual-disclaimer reveal-up">
            Les visuels générés servent d'inspiration pour équilibrer l'esthétique générale et les couleurs. Ils ne constituent pas des photos contractuelles.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header reveal-blur">
            <span className="section-label">Méthodologie</span>
            <h2 className="section-title">Comment la publicité se fait avec Onekana</h2>
          </div>
          <div className="process-expertise-grid reveal-stagger">
            {process.map((item, index) => (
              <div key={item.step} className="process-expertise-card">
                <span className="process-expertise-step">{item.step}</span>
                <h3 className="process-expertise-title">{item.title}</h3>
                <p className="process-expertise-description">{item.desc}</p>
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
