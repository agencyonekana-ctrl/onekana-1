import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, BookOpen, Calendar, Clock3, User, X } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useScrollReveal } from '../hooks/useScrollReveal'
import AccentText from '../components/AccentText'
import InnerPageHero from '../components/InnerPageHero'

const handleMouseMoveSpotlight = (event) => {
  if (window.matchMedia('(pointer: coarse)').matches) return
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
}

function Journal() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState(null)
  useScrollReveal()

  const articles = useMemo(() => [
    {
      id: 1,
      title: t({ fr: 'Pourquoi lancer votre prochaine campagne avec Onekana ?', en: 'Why launch your next campaign with Onekana?' }),
      excerpt: t({ fr: 'Expertise locale, supports mobiles et lecture du terrain : les bases d’une visibilité utile.', en: 'Local expertise, mobile media and field intelligence: the foundations of useful visibility.' }),
      body: t({ fr: 'Une campagne urbaine performante commence par une compréhension concrète des lieux, des trajets et des habitudes. Onekana assemble création, présence mobile et observation terrain pour construire une visibilité adaptée à Lubumbashi.', en: 'A strong urban campaign starts with a practical understanding of places, journeys and habits. Onekana combines creativity, mobile presence and field observation to build visibility suited to Lubumbashi.' }),
      category: t({ fr: 'Agence', en: 'Agency' }),
      categoryKey: 'agency',
      date: t({ fr: '18 Mai 2026', en: 'May 18, 2026' }),
      author: 'Onekana Team',
      readTime: '4 min',
      image: '/images/onekana/supports/car-flyers.png',
      highlights: t({ fr: ['Connaissance locale', 'Supports en mouvement', 'Retour terrain'], en: ['Local knowledge', 'Moving media', 'Field feedback'] }),
    },
    {
      id: 2,
      title: t({ fr: 'Lire les flux urbains de Lubumbashi', en: 'Reading Lubumbashi’s urban flows' }),
      excerpt: t({ fr: 'Comprendre où, quand et comment une marque peut rencontrer son public dans la ville.', en: 'Understand where, when and how a brand can meet its audience in the city.' }),
      body: t({ fr: 'Les axes fréquentés ne racontent pas tous la même histoire. Les heures, les profils et les motifs de déplacement permettent de choisir les zones et supports qui donneront du sens à la campagne.', en: 'Busy routes do not all tell the same story. Time, audience profiles and travel patterns help select the zones and media that will make the campaign meaningful.' }),
      category: 'Data & Analytics',
      categoryKey: 'data',
      date: t({ fr: '15 Mai 2026', en: 'May 15, 2026' }),
      author: 'Data Lab',
      readTime: '5 min',
      image: '/images/onekana/supports/reporting.png',
      highlights: t({ fr: ['Zones utiles', 'Moments clés', 'Lecture des trajets'], en: ['Useful zones', 'Key moments', 'Journey insights'] }),
    },
    {
      id: 3,
      title: t({ fr: 'Mesurer l’impact d’un affichage mobile', en: 'Measuring mobile advertising impact' }),
      excerpt: t({ fr: 'Les signaux qui rendent une activation plus lisible et facilitent les décisions suivantes.', en: 'The signals that make an activation clearer and improve the next decisions.' }),
      body: t({ fr: 'Le reporting utile ne se limite pas à un chiffre final. Il rassemble les zones couvertes, les observations des équipes et les réactions constatées pour éclairer la prochaine activation.', en: 'Useful reporting is more than a final number. It combines covered zones, team observations and observed reactions to inform the next activation.' }),
      category: t({ fr: 'Mesure', en: 'Measurement' }),
      categoryKey: 'measure',
      date: t({ fr: '10 Mai 2026', en: 'May 10, 2026' }),
      author: 'Onekana Connect',
      readTime: '4 min',
      image: '/images/onekana/supports/car-screen.png',
      highlights: t({ fr: ['Couverture', 'Observations', 'Optimisation'], en: ['Coverage', 'Observations', 'Optimization'] }),
    },
    {
      id: 4,
      title: t({ fr: 'Les formats urbains qui captent le regard', en: 'Urban formats that capture attention' }),
      excerpt: t({ fr: 'Écrans mobiles, backpack media et présence piétonne au service d’un message vivant.', en: 'Mobile screens, backpack media and street presence serving a living message.' }),
      body: t({ fr: 'Un bon format rapproche le message de son contexte. Mouvement, lumière, hauteur et durée d’exposition deviennent des leviers créatifs pour rendre la marque immédiatement identifiable.', en: 'A strong format connects the message to its context. Movement, light, height and exposure time become creative levers that make the brand instantly recognizable.' }),
      category: t({ fr: 'Innovation', en: 'Innovation' }),
      categoryKey: 'innovation',
      date: t({ fr: '05 Mai 2026', en: 'May 5, 2026' }),
      author: 'Onekana Studio',
      readTime: '6 min',
      image: '/images/onekana/streets-dooh.png',
      highlights: t({ fr: ['Mouvement', 'Visibilité', 'Créativité'], en: ['Movement', 'Visibility', 'Creativity'] }),
    },
    {
      id: 5,
      title: t({ fr: 'Créer un message fait pour la rue', en: 'Creating a message made for the street' }),
      excerpt: t({ fr: 'Clarté, rythme et mémorisation : trois règles pour parler vite sans perdre l’idée.', en: 'Clarity, rhythm and recall: three rules for speaking fast without losing the idea.' }),
      body: t({ fr: 'Dans la rue, le message dispose de quelques secondes. Une hiérarchie simple, un contraste fort et une promesse directe permettent au visuel de fonctionner sur un véhicule, un écran ou un support piéton.', en: 'On the street, a message has only a few seconds. Simple hierarchy, strong contrast and a direct promise allow the visual to work on a vehicle, screen or street format.' }),
      category: t({ fr: 'Création', en: 'Creative' }),
      categoryKey: 'creative',
      date: t({ fr: '28 Avril 2026', en: 'April 28, 2026' }),
      author: 'Onekana Studio',
      readTime: '5 min',
      image: '/images/onekana/studio-connect-life.png',
      highlights: t({ fr: ['Clarté', 'Contraste', 'Mémorisation'], en: ['Clarity', 'Contrast', 'Recall'] }),
    },
  ], [t])

  const featured = articles[0]
  const categories = [
    { key: 'all', label: t({ fr: 'Tous', en: 'All' }) },
    ...articles.slice(1).map((article) => ({ key: article.categoryKey, label: article.category })),
  ]
  const filteredArticles = activeCategory === 'all'
    ? articles.slice(1)
    : articles.slice(1).filter((article) => article.categoryKey === activeCategory)

  useEffect(() => {
    if (!selectedArticle) return undefined
    const handleEscape = (event) => {
      if (event.key === 'Escape') setSelectedArticle(null)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [selectedArticle])

  return (
    <div className="page journal-page">
      <InnerPageHero
        variant="journal"
        eyebrow={t({ fr: 'Le journal Onekana', en: 'The Onekana journal' })}
        title={t({
          fr: [{ text: 'Les idées qui font ' }, { text: 'bouger la ville.', accent: true }],
          en: [{ text: 'Ideas that ' }, { text: 'move the city.', accent: true }],
        })}
        description={t({
          fr: ['Tendances, terrain et création pour regarder ', { text: 'la publicité urbaine autrement.', accent: true }],
          en: ['Trends, field stories and creativity to see ', { text: 'urban advertising differently.', accent: true }],
        })}
        meta={t({ fr: ['Terrain', 'Culture', 'Insights'], en: ['Field', 'Culture', 'Insights'] })}
      >
        <button type="button" className="journal-hero-feature" onClick={() => setSelectedArticle(featured)}>
          <img src={featured.image} alt="" />
          <span className="journal-hero-feature-shade" />
          <span className="journal-hero-feature-copy">
            <small>{t({ fr: 'À la une', en: 'Featured' })}</small>
            <strong>{featured.title}</strong>
            <em>{featured.readTime}</em>
          </span>
        </button>
      </InnerPageHero>

      <section className="section journal-editorial-section">
        <div className="container">
          <div className="journal-editorial-head reveal-up">
            <div>
              <span className="section-label">{t({ fr: 'Dernières publications', en: 'Latest stories' })}</span>
              <h2 className="section-title">
                {t({ fr: 'Explorer le ', en: 'Explore the ' })}<span className="text-accent">{t({ fr: 'mouvement', en: 'movement' })}</span>
              </h2>
              <p className="section-intro accent-description">
                <AccentText parts={t({
                  fr: ['Des lectures courtes pour transformer ', { text: 'une observation en idée.', accent: true }],
                  en: ['Short reads that turn ', { text: 'an observation into an idea.', accent: true }],
                })} />
              </p>
            </div>
            <div className="journal-filter" aria-label={t({ fr: 'Filtrer les articles', en: 'Filter articles' })}>
              {categories.map((category) => (
                <button key={category.key} type="button" className={activeCategory === category.key ? 'active' : ''} onClick={() => setActiveCategory(category.key)}>
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="journal-story-grid reveal-stagger">
            {filteredArticles.map((article) => (
              <article key={article.id} className="journal-story-card card-spotlight" onMouseMove={handleMouseMoveSpotlight}>
                <button type="button" className="journal-story-media" onClick={() => setSelectedArticle(article)} aria-label={`${t({ fr: 'Ouvrir', en: 'Open' })} ${article.title}`}>
                  <img src={article.image} alt="" loading="lazy" decoding="async" />
                  <span>{article.category}</span>
                </button>
                <div className="journal-story-content">
                  <div className="journal-story-meta"><Calendar size={14} /> {article.date}<span /><Clock3 size={14} /> {article.readTime}</div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <button type="button" className="journal-read-button" onClick={() => setSelectedArticle(article)}>
                    {t({ fr: 'Lire l’aperçu', en: 'Read preview' })}<ArrowRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedArticle && (
        <div className="article-preview-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedArticle(null)
        }}>
          <article className="article-preview" role="dialog" aria-modal="true" aria-labelledby="article-preview-title">
            <button type="button" className="article-preview-close" onClick={() => setSelectedArticle(null)} aria-label={t({ fr: 'Fermer', en: 'Close' })}><X size={22} /></button>
            <div className="article-preview-media"><img src={selectedArticle.image} alt="" /></div>
            <div className="article-preview-content">
              <span className="section-label">{selectedArticle.category}</span>
              <h2 id="article-preview-title">{selectedArticle.title}</h2>
              <div className="article-preview-meta"><User size={15} /> {selectedArticle.author}<span /><Calendar size={15} /> {selectedArticle.date}</div>
              <p>{selectedArticle.body}</p>
              <div className="article-preview-highlights">
                {selectedArticle.highlights.map((item) => <span key={item}><BookOpen size={14} />{item}</span>)}
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}

export default Journal
