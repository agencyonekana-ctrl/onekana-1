import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Move3d, Layers, Network, Eye, Brain, Phone, CheckCircle, Car, Store, Smartphone, Target, ArrowRight, Backpack, Play, MousePointer, Sun, Check, Package, DollarSign, Zap, Users, Star, Download, FileText, ChevronDown } from 'lucide-react'
import { getPacksCommerciaux } from '../services/apiService'

// Brochure Download Button with dropdown
const BrochureDropdown = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    const brochures = [
        {
            label: 'Présentation commerciale',
            file: '/brochures/03_2025_12_Présentation_commerciale_ Onekana.pptx.pdf',
        },
        {
            label: 'Présentation & Prix',
            file: '/brochures/2025_12_Présentation_commerciale_ Onekana_Prix.pptx.pdf',
        },
    ]

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="brochure-dropdown" ref={ref}>
            <button
                className="btn btn-primary brochure-btn"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
            >
                <Download size={18} strokeWidth={2} />
                Télécharger nos brochures
                <ChevronDown size={16} strokeWidth={2} className={`brochure-chevron${open ? ' open' : ''}`} />
            </button>
            {open && (
                <div className="brochure-menu">
                    {brochures.map((b, i) => (
                        <a
                            key={i}
                            href={b.file}
                            download
                            className="brochure-item"
                            onClick={() => setOpen(false)}
                        >
                            <FileText size={16} strokeWidth={1.5} />
                            {b.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}

// Hero Section
const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-image">
                    <video
                        className="hero-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                    >
                        <source src="/hero-bg.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="hero-gradient"></div>
                <div className="hero-pattern"></div>
            </div>
            <div className="hero-content">
                {/* <p className="hero-subtitle animate-fade-in">
                    <img src="/onek.png" alt="Onek" style={{ width: '40px', height: '40px', marginRight: '10px', verticalAlign: 'middle' }} />
                    Onekana Agency
                </p> */}
                <h1 className="hero-title">
                    <span className="line animate-fade-in-up" style={{ animationDelay: '0.2s' }}>la publicité</span>
                    <span className="line animate-fade-in-up" style={{ animationDelay: '0.4s' }}>bouge au rythme</span>
                    <span className="line accent animate-fade-in-up" style={{ animationDelay: '0.6s' }}>de la ville !</span>
                </h1>
                <p className="hero-description animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    Agence de marketing urbain et mobile spécialisée dans la visibilité locale
                    utile, non intrusive et mesurable.
                </p>
                <div className="hero-cta animate-fade-in-up" style={{ animationDelay: '1s' }}>
                    <BrochureDropdown />
                    <Link to="/contact" className="btn">Nous contacter</Link>
                </div>
            </div>
            <div className="hero-scroll">
                <span>Scroll</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    )
}

// About Section - NEW DESIGN
const AboutPreview = () => {
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

    return (
        <section className="about-modern section">
            <div className="container">
                <div className="about-header reveal">
                    <span className="section-label">Notre Vision</span>
                    <h2 className="section-title">Marketing Urbain Redéfini</h2>
                </div>

                <div className="about-cards">
                    {/* Transform Card */}
                    <div className="about-card reveal" style={{ transitionDelay: '0.1s' }}>
                        <div className="card-icon">
                            <Move3d size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="card-title">Nous transformons</h3>
                        <ul className="card-list">
                            <li><span className="bullet">→</span> les déplacements</li>
                            <li><span className="bullet">→</span> les temps d'attente</li>
                            <li><span className="bullet">→</span> les espaces urbains</li>
                        </ul>
                        <p className="card-conclusion">en opportunités commerciales concrètes.</p>
                    </div>

                    {/* Promise Card */}
                    <div className="about-card reveal card-accent" style={{ transitionDelay: '0.2s' }}>
                        <div className="card-icon">
                            <Layers size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="card-title">Notre promesse</h3>
                        <div className="promise-flow">
                            <div className="flow-item">
                                <Eye size={20} strokeWidth={1.5} className="flow-icon-lucide" />
                                <span className="flow-text">Être vu</span>
                            </div>
                            <div className="flow-arrow">→</div>
                            <div className="flow-item">
                                <Brain size={20} strokeWidth={1.5} className="flow-icon-lucide" />
                                <span className="flow-text">Mémorisé</span>
                            </div>
                            <div className="flow-arrow">→</div>
                            <div className="flow-item">
                                <Phone size={20} strokeWidth={1.5} className="flow-icon-lucide" />
                                <span className="flow-text">Contacté</span>
                            </div>
                            <div className="flow-arrow">→</div>
                            <div className="flow-item">
                                <CheckCircle size={20} strokeWidth={1.5} className="flow-icon-lucide" />
                                <span className="flow-text">Choisi</span>
                            </div>
                        </div>
                    </div>

                    {/* Logic Card */}
                    <div className="about-card reveal" style={{ transitionDelay: '0.3s' }}>
                        <div className="card-icon">
                            <Network size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="card-title">Notre logique</h3>
                        <div className="logic-chain">
                            <div className="logic-item">
                                <span className="logic-dot"></span>
                                <span>Exposition physique</span>
                            </div>
                            <div className="logic-item">
                                <span className="logic-dot"></span>
                                <span>Interaction</span>
                            </div>
                            <div className="logic-item">
                                <span className="logic-dot"></span>
                                <span>Donnée</span>
                            </div>
                            <div className="logic-item">
                                <span className="logic-dot"></span>
                                <span>Relance</span>
                            </div>
                            <div className="logic-item">
                                <span className="logic-dot"></span>
                                <span className="highlight">Conversion</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-cta reveal" style={{ transitionDelay: '0.4s' }}>
                    <Link to="/agence" className="btn btn-primary btn-large">
                        Découvrir notre approche
                    </Link>
                </div>
            </div>
        </section>
    )
}

// Why Lubumbashi Section - NEW
const WhyLubumbashi = () => {
    const reasons = [
        { icon: Car, text: "Les taxis sont des médias mobiles permanents" },
        { icon: Store, text: "Les commerces de proximité concentrent l'attention" },
        { icon: Smartphone, text: "WhatsApp est le canal n°1 de conversion" },
        { icon: Eye, text: "Peu de concurrence sur le DOOH & médias mobiles" },
        { icon: Target, text: "Forte mémorisation des supports utiles et visibles" },
    ]

    return (
        <section id="why-lubumbashi" className="why-lubumbashi section">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-label">POURQUOI ONEKANA</span>
                    <h2 className="section-title">À Lubumbashi ?</h2>
                    <p className="section-subtitle">Onekana est conçue pour le terrain lushois</p>
                </div>
                <div className="reasons-grid">
                    {reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="reason-card reveal"
                            style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                            <div className="reason-icon">
                                <reason.icon size={28} strokeWidth={1.5} />
                            </div>
                            <p className="reason-text">{reason.text}</p>
                        </div>
                    ))}
                </div>
                <div className="result-card reveal" style={{ transitionDelay: '0.5s' }}>
                    <div className="result-icon">
                        <ArrowRight size={24} strokeWidth={1.5} />
                    </div>
                    <p className="result-text">
                        <span className="result-label">Résultat :</span> plus d'impact dans la masse de sollicitations publicitaires
                    </p>
                </div>
            </div>
        </section>
    )
}

// DigiStreet Section - NEW
const Digistreet = () => {
    const features = [
        { icon: Backpack, text: "Sac à dos écran LED" },
        { icon: Play, text: "Vidéo / animation" },
        { icon: MousePointer, text: "Interaction directe" },
        { icon: Sun, text: "Jour & nuit" },
    ]

    return (
        <section id="digistreet" className="digistreet section">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-label">Affichage Mobile Innovant</span>
                    <h2 className="section-title">Digi'Street</h2>
                </div>
                <div className="digistreet-content">
                    {/* <div className="digistreet-image reveal" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <img src="/onek.png" alt="Onek" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                    </div> */}
                    <div className="digistreet-features">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="feature-card reveal"
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                <div className="feature-icon">
                                    <feature.icon size={32} strokeWidth={1.5} />
                                </div>
                                <p className="feature-text">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="digistreet-objective reveal" style={{ transitionDelay: '0.4s' }}>
                        <div className="objective-icon">
                            <Target size={28} strokeWidth={1.5} />
                        </div>
                        <p className="objective-text">
                            <span className="objective-label">Objectif :</span> impact visuel fort
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Pack Section
const PackSection = () => {
    const [packs, setPacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPacks = async () => {
            try {
                setLoading(true)
                const response = await getPacksCommerciaux()
                console.log('API Response for packs:', response)

                // Transformation des données API vers format frontend
                let packsData = []

                if (response && response.data) {
                    packsData = response.data
                } else if (Array.isArray(response)) {
                    packsData = response
                } else {
                    packsData = response || []
                }

                // Transformation des champs API vers frontend
                const frontendPacks = packsData.map(pack => ({
                    id: pack.id,
                    name: pack.nom,                    // nom → name
                    budget_min: pack.budget_min,
                    budget_max: pack.budget_max,
                    budget_description: pack.budget_description,
                    description: pack.description,
                    categorie: pack.categorie,
                    ideal_pour: pack.ideal_pour,
                    fonctionnalites: pack.fonctionnalites || []
                }))

                console.log('Transformed packs:', JSON.stringify(frontendPacks, null, 2))
                setPacks(frontendPacks)

            } catch (err) {
                console.error('Error fetching packs:', err)
                setError(err.message)
                // Données par défaut en cas d'erreur
                setPacks([
                    {
                        id: 1,
                        name: "START VISIBILITÉ",
                        budget_min: 250,
                        budget_max: 600,
                        budget_description: null,
                        description: "Être vu localement",
                        categorie: "visibilité",
                        ideal_pour: "Idéal commerces & tests de marché",
                        fonctionnalites: ["Affichage mobile simple", "Flyers ciblés", "QR WhatsApp", "Suivi terrain"]
                    },
                    {
                        id: 2,
                        name: "IMPACT TRAFIC",
                        budget_min: 700,
                        budget_max: 1500,
                        budget_description: null,
                        description: "Générer des visiteurs",
                        categorie: "trafic",
                        ideal_pour: "ROI visible et mesurable",
                        fonctionnalites: ["Sac écran ou taxi premium", "Street marketing", "QR + CTA", "WhatsApp / SMS", "Leads + reporting"]
                    }
                ])
            } finally {
                setLoading(false)
            }
        }

        fetchPacks()
    }, [])

    const getPackIcon = (name) => {
        if (!name || typeof name !== 'string') return Eye
        const nameUpper = name.toUpperCase()
        if (nameUpper.includes('START')) return Eye
        if (nameUpper.includes('IMPACT')) return Zap
        if (nameUpper.includes('DOMINATION')) return Users
        if (nameUpper.includes('ÉVÉNEMENTIELLE') || nameUpper.includes('EVENEMENTIELLE')) return Star
        if (nameUpper.includes('SUR-MESURE') || nameUpper.includes('SUR MESURE')) return Target
        return Eye
    }

    const formatBudget = (pack) => {
        if (pack.budget_description) {
            return pack.budget_description
        } else if (pack.budget_min && pack.budget_max) {
            return `${pack.budget_min} $ – ${pack.budget_max} $`
        } else if (pack.budget_min) {
            return `À partir de ${pack.budget_min} $`
        }
        return 'Sur devis'
    }

    if (loading) {
        return (
            <section id="packs" className="pack-section section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">PACKS COMMERCIAUX</span>
                        <h2 className="section-title">ANNEXE I - PACKS ONEKANA</h2>
                    </div>
                    <div className="loading-message">
                        <div className="loading-spinner"></div>
                        <p>Chargement des packs commerciaux...</p>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section id="packs" className="pack-section section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">PACKS COMMERCIAUX</span>
                        <h2 className="section-title">ANNEXE I - PACKS ONEKANA</h2>
                    </div>
                    <div className="error-message">
                        <p>Erreur lors du chargement des packs: {error}</p>
                        <p>Les données par défaut sont affichées</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="packs" className="pack-section section">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-label">PACKS COMMERCIAUX</span>
                    <h2 className="section-title">ANNEXE I - PACKS ONEKANA</h2>
                </div>

                <div className="packs-grid">
                    {packs.map((pack, index) => {
                        const IconComponent = getPackIcon(pack.name)
                        return (
                            <div
                                key={pack.id || index}
                                className="pack-card reveal"
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                <div className="pack-header">
                                    <div className="pack-icon">
                                        <IconComponent size={24} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="pack-name">{pack.name}</h3>
                                    <div className="pack-budget">
                                        <DollarSign size={16} strokeWidth={1.5} />
                                        {formatBudget(pack)}
                                    </div>
                                </div>
                                <div className="pack-description">{pack.description}</div>
                                <ul className="pack-features">
                                    {(pack.fonctionnalites || pack.features || []).map((feature, fIndex) => (
                                        <li key={fIndex}>
                                            <Check size={16} strokeWidth={2} />
                                            {feature || 'Fonctionnalité non spécifiée'}
                                        </li>
                                    ))}
                                </ul>
                                <div className="pack-ideal">
                                    <CheckCircle size={16} strokeWidth={1.5} />
                                    {pack.ideal_pour || pack.ideal}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="options-section reveal" style={{ transitionDelay: '0.5s' }}>
                    <h3 className="options-title">OPTIONS COMPLÉMENTAIRES</h3>
                    <div className="options-grid">
                        {[
                            "Impression flyers : dès 80 $",
                            "WhatsApp supplémentaire : +100 $",
                            "Landing + QR tracking : +120 $",
                            "Extension durée / zone : +15–30 %",
                            "Exclusivité zone : +25 %",
                            "Création visuelle : 150–300 $"
                        ].map((option, index) => (
                            <div
                                key={index}
                                className="option-card"
                            >
                                <Check size={16} strokeWidth={2} />
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}


// Home Page Component
function Home() {
    return (
        <>
            <Hero />
            <AboutPreview />
            <WhyLubumbashi />
            <Digistreet />
            {/* <ContactCTA /> */}
        </>
    )
}

export default Home