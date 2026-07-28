import { useState, useEffect } from 'react'
import { Eye, Zap, Users, Star, Target, DollarSign, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { getCampaignTypes } from '../services/apiService'

const PackTable = () => {
    const [packs, setPacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [expandedRows, setExpandedRows] = useState(new Set())

    useEffect(() => {
        const fetchPacks = async () => {
            try {
                setLoading(true)
                const response = await getCampaignTypes()

                if (response && response.data) {
                    setPacks(response.data)
                } else if (Array.isArray(response)) {
                    setPacks(response)
                } else {
                    // Données par défaut si l'API ne fonctionne pas
                    setPacks([
                        {
                            id: 1,
                            name: "START VISIBILITÉ",
                            budget: "250 $ – 600 $",
                            description: "Être vu localement",
                            features: [
                                "Affichage mobile simple",
                                "Flyers ciblés",
                                "QR WhatsApp",
                                "Suivi terrain"
                            ],
                            ideal: "Idéal commerces & tests de marché"
                        },
                        {
                            id: 2,
                            name: "IMPACT TRAFIC",
                            budget: "700 $ – 1 500 $",
                            description: "Générer des visiteurs",
                            features: [
                                "Sac écran ou taxi premium",
                                "Street marketing",
                                "QR + CTA",
                                "WhatsApp / SMS",
                                "Leads + reporting"
                            ],
                            ideal: "ROI visible et mesurable"
                        },
                        {
                            id: 3,
                            name: "DOMINATION URBAINE",
                            budget: "2 000 $ – 5 000 $",
                            description: "Devenir incontournable",
                            features: [
                                "Réseau taxis",
                                "DOOH stratégique",
                                "Street marketing renforcé",
                                "Supports utiles",
                                "WhatsApp + SMS",
                                "Reporting avancé"
                            ],
                            ideal: "Image forte & leadership local"
                        },
                        {
                            id: 4,
                            name: "ACTIVATION ÉVÉNEMENTIELLE",
                            budget: "1 200 $ – 3 000 $",
                            description: "Créer de l'émotion & des leads",
                            features: [
                                "Fan Experience",
                                "Animations sponsorisées",
                                "Collecte de données",
                                "Relance post-event"
                            ],
                            ideal: "Jeunesse, sport, culture"
                        },
                        {
                            id: 5,
                            name: "SUR-MESURE STRATÉGIQUE",
                            budget: "À partir de 5 000 $",
                            description: "Vision long terme",
                            features: [
                                "Audit terrain",
                                "Stratégie omnicanale",
                                "Pilotage mensuel",
                                "Optimisation & ROI"
                            ],
                            ideal: "Institutions & grands comptes"
                        }
                    ])
                }
            } catch (err) {
                console.error('Error fetching packs:', err)
                setError(err.message)
                // Données par défaut en cas d'erreur
                setPacks([
                    {
                        id: 1,
                        name: "START VISIBILITÉ",
                        budget: "250 $ – 600 $",
                        description: "Être vu localement",
                        features: ["Affichage mobile simple", "Flyers ciblés", "QR WhatsApp", "Suivi terrain"],
                        ideal: "Idéal commerces & tests de marché"
                    },
                    {
                        id: 2,
                        name: "IMPACT TRAFIC",
                        budget: "700 $ – 1 500 $",
                        description: "Générer des visiteurs",
                        features: ["Sac écran ou taxi premium", "Street marketing", "QR + CTA", "WhatsApp / SMS", "Leads + reporting"],
                        ideal: "ROI visible et mesurable"
                    }
                ])
            } finally {
                setLoading(false)
            }
        }

        fetchPacks()
    }, [])

    const getPackIcon = (name) => {
        if (name.includes('START')) return Eye
        if (name.includes('IMPACT')) return Zap
        if (name.includes('DOMINATION')) return Users
        if (name.includes('ÉVÉNEMENTIELLE')) return Star
        if (name.includes('SUR-MESURE')) return Target
        return Eye
    }

    const toggleRow = (packId) => {
        const newExpandedRows = new Set(expandedRows)
        if (newExpandedRows.has(packId)) {
            newExpandedRows.delete(packId)
        } else {
            newExpandedRows.add(packId)
        }
        setExpandedRows(newExpandedRows)
    }

    if (loading) {
        return (
            <div className="packs-table-container">
                <div className="table-loading">
                    <div className="loading-spinner"></div>
                    <p>Chargement des packs commerciaux...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="packs-table-container">
                <div className="table-error">
                    <p>Erreur lors du chargement des packs: {error}</p>
                    <p>Les données par défaut sont affichées</p>
                </div>
            </div>
        )
    }

    return (
        <div className="packs-table-container">
            <div className="table-header">
                <h2>Packs Commerciaux Onekana</h2>
                <p>Annexe I - Solutions clés en main pour votre visibilité urbaine</p>
            </div>

            <div className="packs-table">
                <div className="table-row table-header-row">
                    <div className="table-cell">Pack</div>
                    <div className="table-cell">Budget</div>
                    <div className="table-cell">Description</div>
                    <div className="table-cell">Fonctionnalités</div>
                    <div className="table-cell">Idéal pour</div>
                    <div className="table-cell">Actions</div>
                </div>

                {packs.map((pack) => {
                    const IconComponent = getPackIcon(pack.name)
                    const isExpanded = expandedRows.has(pack.id)

                    return (
                        <div key={pack.id} className="table-row">
                            <div className="table-cell pack-name-cell">
                                <div className="pack-name-content">
                                    <IconComponent size={20} strokeWidth={1.5} />
                                    <span className="pack-name">{pack.name}</span>
                                </div>
                            </div>

                            <div className="table-cell">
                                <div className="budget-cell">
                                    <DollarSign size={16} strokeWidth={1.5} />
                                    <span>{pack.budget}</span>
                                </div>
                            </div>

                            <div className="table-cell">
                                <div className="description-cell">
                                    {pack.description}
                                </div>
                            </div>

                            <div className="table-cell">
                                <div className="features-cell">
                                    <div className="features-summary">
                                        {pack.features.slice(0, 2).map((feature, index) => (
                                            <span key={index} className="feature-badge">
                                                {feature}
                                            </span>
                                        ))}
                                        {pack.features.length > 2 && (
                                            <span className="features-more">
                                                +{pack.features.length - 2} autres
                                            </span>
                                        )}
                                    </div>

                                    {isExpanded && (
                                        <div className="features-expanded">
                                            {pack.features.map((feature, index) => (
                                                <div key={index} className="feature-item">
                                                    <Check size={14} strokeWidth={2} />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="table-cell">
                                <div className="ideal-cell">
                                    {pack.ideal}
                                </div>
                            </div>

                            <div className="table-cell">
                                <button
                                    className="expand-btn"
                                    onClick={() => toggleRow(pack.id)}
                                    aria-expanded={isExpanded}
                                >
                                    {isExpanded ? (
                                        <>
                                            <ChevronUp size={18} strokeWidth={1.5} />
                                            <span>Réduire</span>
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown size={18} strokeWidth={1.5} />
                                            <span>Détails</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="table-footer">
                <div className="legend">
                    <span className="legend-item">
                        <DollarSign size={16} strokeWidth={1.5} />
                        Budgets indiqués en USD
                    </span>
                    <span className="legend-item">
                        <Check size={16} strokeWidth={2} />
                        Fonctionnalités incluses
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PackTable
