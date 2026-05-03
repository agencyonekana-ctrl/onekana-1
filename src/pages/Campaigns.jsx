import { useState, useEffect } from 'react'
import {
    Calendar,
    MapPin,
    Target,
    Users,
    DollarSign,
    Plus,
    Trash2,
    Save,
    AlertCircle,
    CheckCircle,
    Clock,
    Smartphone,
    Monitor,
    Tv,
    Radio,
    Newspaper,
    Route,
    Map,
    Camera,
    Loader2
} from 'lucide-react'
import { getCampaignTypes, getPacks, getTransportRoutes, getPointsChauds } from '../services/apiService'

function Campaigns() {
    const [campaignData, setCampaignData] = useState({
        name: '',
        campaignTypes: [],
        packs: [],
        targetZone: '',
        targetTrajet: '',
        duration: 1,
        startDate: '',
        endDate: '',
        budget: 0,
        userBudget: 0
    })

    const [campaignTypes, setCampaignTypes] = useState([])
    const [packs, setPacks] = useState([])
    const [transportRoutes, setTransportRoutes] = useState([])
    const [pointsChauds, setPointsChauds] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)
    const [activeStep, setActiveStep] = useState(1)
    const [ciblageType, setCiblageType] = useState('') // 'zone' ou 'trajet'
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        // Guard against SSR / server-side execution
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return
        }

        try {
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

            // Only observe elements that actually exist
            const elements = document.querySelectorAll('.reveal')
            if (elements.length > 0) {
                elements.forEach((el) => {
                    el.classList.add('active')
                    observer.observe(el)
                })
            }

            return () => observer.disconnect()
        } catch (err) {
            console.error('IntersectionObserver failed:', err)
            return () => { }
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [campaignTypesResponse, packsResponse, routesResponse, pointsResponse] = await Promise.all([
                    getCampaignTypes(),
                    getPacks(),
                    getTransportRoutes(),
                    getPointsChauds()
                ])

                setCampaignTypes(campaignTypesResponse?.data || campaignTypesResponse || [])
                setPacks(packsResponse?.data || packsResponse || [])
                setTransportRoutes(routesResponse?.data || routesResponse || [])
                setPointsChauds(pointsResponse?.data || pointsResponse || [])
            } catch (err) {
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleInputChange = (field, value) => {
        setCampaignData(prev => ({
            ...prev,
            [field]: value
        }))

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }))
        }
    }

    const handleCampaignTypeToggle = (campaignTypeId) => {
        setCampaignData(prev => ({
            ...prev,
            campaignTypes: prev.campaignTypes.includes(campaignTypeId)
                ? prev.campaignTypes.filter(id => id !== campaignTypeId)
                : [...prev.campaignTypes, campaignTypeId]
        }))
    }

    const handlePackToggle = (packId) => {
        setCampaignData(prev => ({
            ...prev,
            packs: prev.packs.includes(packId)
                ? prev.packs.filter(id => id !== packId)
                : [...prev.packs, packId]
        }))
    }

    const calculateBudget = () => {
        let total = 0

        // Add campaign types budget
        campaignData.campaignTypes.forEach(campaignTypeId => {
            const campaignType = campaignTypes.find(ct => ct.id === campaignTypeId)
            if (campaignType?.budget_min) {
                total += parseFloat(campaignType.budget_min)
            }
        })

        // Add packs budget
        campaignData.packs.forEach(packId => {
            const pack = packs.find(p => p.id === packId)
            if (pack?.budget) {
                total += parseFloat(pack.budget)
            }
        })

        // Multiply by duration
        total *= campaignData.duration

        return total
    }

    const validateForm = () => {
        const newErrors = {}

        if (!campaignData.name.trim()) {
            newErrors.name = 'Le nom de la campagne est requis'
        }

        if (campaignData.campaignTypes.length === 0) {
            newErrors.selection = 'Veuillez sélectionner au moins un type de campagne'
        }

        if (!campaignData.targetZone.trim() && !campaignData.targetTrajet.trim()) {
            newErrors.target = 'Veuillez spécifier une zone cible ou un trajet'
        }

        if (campaignData.duration < 1) {
            newErrors.duration = 'La durée minimale est de 1 mois'
        }

        if (!campaignData.startDate) {
            newErrors.startDate = 'Veuillez sélectionner une date de début'
        }

        if (campaignData.startDate && campaignData.endDate) {
            const start = new Date(campaignData.startDate)
            const end = new Date(campaignData.endDate)

            if (end <= start) {
                newErrors.endDate = 'La date de fin doit être strictement supérieure à la date de début'
            } else {
                // Vérifier que la durée est d'au moins 30 jours
                const diffTime = end - start
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                if (diffDays < 30) {
                    newErrors.endDate = 'La durée minimale est de 30 jours'
                }
            }
        } else if (campaignData.startDate && !campaignData.endDate) {
            newErrors.endDate = 'Veuillez sélectionner une date de fin'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Création de l'objet de données à envoyer
            const campaignDataToSubmit = {
                name: campaignData.name,
                campaignTypes: campaignData.campaignTypes,
                packs: campaignData.packs,
                targetZone: campaignData.targetZone || null,
                targetTrajet: campaignData.targetTrajet || null,
                duration: campaignData.duration,
                startDate: campaignData.startDate,
                endDate: campaignData.endDate,
                userBudget: campaignData.userBudget,
                calculatedBudget: calculateBudget(),
                monthlyBudget: calculateMonthlyBudget(),
                durationInMonths: calculateDurationInMonths(),
                createdAt: new Date().toISOString()
            }

            // Enregistrement dans un fichier JSON (optionnel)
            const jsonString = JSON.stringify(campaignDataToSubmit, null, 2)
            const blob = new Blob([jsonString], { type: 'application/json' })
            const url = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.download = `campaign_${campaignData.name.replace(/\s+/g, '_')}_${Date.now()}.json`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)

            // Envoi des données à l'API
            const response = await fetch('/api/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(campaignDataToSubmit)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()
            console.log('Campaign created successfully:', result)

            setSuccess(true)

            setTimeout(() => {
                setSuccess(false)
                setCampaignData({
                    name: '',
                    campaignTypes: [],
                    packs: [],
                    targetZone: '',
                    targetTrajet: '',
                    duration: 1,
                    startDate: '',
                    endDate: '',
                    budget: 0
                })
                setActiveStep(1)
                setIsSubmitting(false)
            }, 3000)
        } catch (error) {
            console.error('Error submitting campaign:', error)
            setErrors(prev => ({
                ...prev,
                submit: 'Une erreur est survenue lors de la soumission de votre campagne. Veuillez réessayer.'
            }))
            setIsSubmitting(false)
        }
    }

    const currentBudget = calculateBudget()
    const hasSelection = campaignData.campaignTypes.length > 0

    const calculateMonthlyBudget = () => {
        let monthlyTotal = 0

        // Add campaign types budget
        campaignData.campaignTypes.forEach(campaignTypeId => {
            const campaignType = campaignTypes.find(ct => ct.id === campaignTypeId)
            if (campaignType?.budget_min) {
                monthlyTotal += parseFloat(campaignType.budget_min)
            }
        })

        // Add packs budget
        campaignData.packs.forEach(packId => {
            const pack = packs.find(p => p.id === packId)
            if (pack?.budget) {
                monthlyTotal += parseFloat(pack.budget)
            }
        })

        return monthlyTotal
    }

    const calculateDurationInMonths = () => {
        if (!campaignData.startDate || !campaignData.endDate) {
            return campaignData.duration
        }

        const start = new Date(campaignData.startDate)
        const end = new Date(campaignData.endDate)

        if (end <= start) {
            return campaignData.duration
        }

        // Calculate difference in months
        const diffTime = Math.abs(end - start)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        // Convert days to months (approximate: 30 days = 1 month)
        const months = Math.ceil(diffDays / 30)

        return months
    }

    const currentDuration = calculateDurationInMonths()

    if (loading) {
        return (
            <div className="page">
                <section className="section">
                    <div className="container">
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Chargement des données...</p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    return (
        <div className="page">
            {/* Page Header */}
            <section className="page-header">
                <div className="page-header-objects" aria-hidden="true">
                    <svg className="ph-obj ph-obj-1" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="6" y="14" width="52" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
                        <path d="M6 18L32 36L58 18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                    <svg className="ph-obj ph-obj-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="16" y="4" width="32" height="56" rx="6" stroke="currentColor" strokeWidth="2" />
                        <line x1="16" y1="12" x2="48" y2="12" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <svg className="ph-obj ph-obj-3" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 24H20L44 12V52L20 40H8V24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <span className="page-label">Campagnes</span>
                    <h1 className="page-title">Créer votre campagne</h1>
                    <p className="page-subtitle">
                        Configurez votre campagne publicitaire en quelques étapes simples
                    </p>
                </div>
            </section>

            {/* Campaign Creation Steps */}
            <section className="section">
                <div className="container">
                    <div className="campaign-steps">
                        {/* Progress Bar */}
                        <div className="progress-bar">
                            <div className="progress-steps">
                                {[1, 2, 3, 4].map(step => (
                                    <div key={step} className={`progress-step ${activeStep >= step ? 'active' : ''}`}>
                                        <div className="step-number">{step}</div>
                                        <div className="step-label">
                                            {step === 1 && 'Informations'}
                                            {step === 2 && 'Sélection'}
                                            {step === 3 && 'Ciblage'}
                                            {step === 4 && 'Résumé'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step Content */}
                        <form onSubmit={handleSubmit} className="campaign-form">
                            {activeStep === 1 && (
                                <div className="step-content reveal">
                                    <div className="step-header">
                                        <h3>1. Type de ciblage</h3>
                                        <p>Choisissez d'abord si vous ciblez une zone géographique ou un trajet</p>
                                    </div>

                                    {errors.ciblageType && (
                                        <div className="alert alert-error">
                                            <AlertCircle size={18} />
                                            {errors.ciblageType}
                                        </div>
                                    )}

                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>
                                                <span>Type de ciblage</span>
                                            </label>
                                            <div className="ciblage-options">
<button
                                                    type="button"
                                                    className={`ciblage-option ${ciblageType === 'zone' ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        setCiblageType('zone')
                                                        handleInputChange('targetZone', '')
                                                        handleInputChange('targetTrajet', '')
                                                    }}
                                                >
                                                    <Camera size={24} />
                                                    <div>
                                                        <strong>Ciblage par Zone</strong>
                                                        <span>Surveillance et points chauds</span>
                                                    </div>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`ciblage-option ${ciblageType === 'trajet' ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        setCiblageType('trajet')
                                                        handleInputChange('targetZone', '')
                                                        handleInputChange('targetTrajet', '')
                                                    }}
                                                >
                                                    <Route size={24} />
                                                    <div>
                                                        <strong>Ciblage par Trajet</strong>
                                                        Routes de transport
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                        {ciblageType === 'zone' && (
                                            <div className="form-group">
                                                <label htmlFor="target-zone">
                                                    <MapPin size={18} />
                                                    Points chauds à cibler
                                                </label>
                                                <select
                                                    id="target-zone"
                                                    value={campaignData.targetZone}
                                                    onChange={(e) => handleInputChange('targetZone', e.target.value)}
                                                    className={errors.targetZone ? 'input-error' : ''}
                                                >
                                                    <option value="">Sélectionnez un point chaud...</option>
                                                    {pointsChauds.map(point => (
                                                        <option key={point.id} value={point.id}>
                                                            {point.nom} - {point.description || 'Non spécifié'}
                                                        </option>
                                                    ))}
                                                </select>
                                                <small className="form-hint">Choisissez parmi les points chauds géographiques disponibles</small>
                                            </div>
                                        )}

                                        {ciblageType === 'trajet' && (
                                            <div className="form-group">
                                                <label htmlFor="target-trajet">
                                                    <Users size={18} />
                                                    Routes à cibler
                                                </label>
                                                <select
                                                    id="target-trajet"
                                                    value={campaignData.targetTrajet}
                                                    onChange={(e) => handleInputChange('targetTrajet', e.target.value)}
                                                    className={errors.targetTrajet ? 'input-error' : ''}
                                                >
                                                    <option value="">Sélectionnez une route...</option>
                                                    {transportRoutes.map(route => (
                                                        <option key={route.id} value={route.id}>
                                                            {route.nom} - {route.route_name || 'Non spécifié'}
                                                        </option>
                                                    ))}
                                                </select>
                                                <small className="form-hint">Choisissez parmi les routes de transport disponibles</small>
                                            </div>
                                        )}
                                    </div>

                                    <div className="step-actions">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => setActiveStep(2)}
                                            disabled={!ciblageType || isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="spinner-icon" />
                                                    Chargement...
                                                </>
                                            ) : (
                                                'Continuer'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeStep === 2 && (
                                <div className="step-content reveal">
                                    <div className="step-header">
                                        <h3>2. Sélection des types de campagne</h3>
                                        <p>Choisissez les types de campagne adaptés à votre {ciblageType === 'zone' ? 'ciblage par zone' : ciblageType === 'trajet' ? 'ciblage par trajet' : 'type de ciblage'}</p>
                                    </div>

                                    {errors.selection && (
                                        <div className="alert alert-error">
                                            <AlertCircle size={18} />
                                            {errors.selection}
                                        </div>
                                    )}

                                    <div className="selection-grid">
                                        {/* Campaign Types */}
                                        <div className="selection-section">
                                            <h4>Types de campagne</h4>
                                            <div className="selection-cards">
                                                {campaignTypes
                                                    .filter(campaignType => {
                                                        // Si ciblage par trajet, ne montrer que les types de trajet
                                                        if (ciblageType === 'trajet') {
                                                            return campaignType.category?.toLowerCase() === 'trajet'
                                                        }
                                                        // Si ciblage par zone, ne montrer que les types de zone
                                                        if (ciblageType === 'zone') {
                                                            return campaignType.category?.toLowerCase() === 'zone' || campaignType.category?.toLowerCase() === 'cible'
                                                        }
                                                        // Si pas de ciblage sélectionné, montrer tous les types
                                                        return true
                                                    })
                                                    .map((campaignType) => (
                                                        <div
                                                            key={campaignType.id}
                                                            className={`selection-card ${campaignData.campaignTypes.includes(campaignType.id) ? 'selected' : ''}`}
                                                            onClick={() => handleCampaignTypeToggle(campaignType.id)}
                                                        >
                                                            <div className="card-header">
                                                                <span className="card-title">{campaignType.name || campaignType.type}</span>
                                                                <span className="card-price">
                                                                    {campaignType.budget_min ? `${parseFloat(campaignType.budget_min).toLocaleString()} $` : 'Sur devis'}
                                                                </span>
                                                            </div>
                                                            <div className="card-description">
                                                                {campaignType.description || 'Description non disponible'}
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Calculateur de budget */}
                                    {campaignData.campaignTypes.length > 0 && currentDuration > 1 && (
                                        <div className="budget-calculator">
                                            <h4>Calculateur de budget</h4>
                                            <div className="calculator-content">
                                                <div className="calculator-row">
                                                    <span className="calc-label">Types sélectionnés:</span>
                                                    <span className="calc-value">
                                                        {campaignData.campaignTypes.length} type(s)
                                                    </span>
                                                </div>
                                                <div className="calculator-row">
                                                    <span className="calc-label">Durée:</span>
                                                    <span className="calc-value">
                                                        {currentDuration} mois
                                                    </span>
                                                </div>
                                                <div className="calculator-row">
                                                    <span className="calc-label">Budget par mois:</span>
                                                    <span className="calc-value">
                                                        {calculateMonthlyBudget().toLocaleString()} $
                                                    </span>
                                                </div>
                                                <div className="calculator-row total-row">
                                                    <span className="calc-label">Budget total:</span>
                                                    <span className="calc-value total-amount">
                                                        {(calculateMonthlyBudget() * currentDuration).toLocaleString()} $
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="step-actions">
                                        <button type="button" className="btn" onClick={() => setActiveStep(1)} disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="spinner-icon" />
                                                    Chargement...
                                                </>
                                            ) : (
                                                'Retour'
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => setActiveStep(3)}
                                            disabled={!hasSelection || isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="spinner-icon" />
                                                    Chargement...
                                                </>
                                            ) : (
                                                'Continuer'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeStep === 3 && (
                                <div className="step-content reveal">
                                    <div className="step-header">
                                        <h3>3. Durée de la campagne</h3>
                                        <p>Définissez la durée de votre campagne (minimum 1 mois)</p>
                                    </div>

                                    {errors.duration && (
                                        <div className="alert alert-error">
                                            <AlertCircle size={18} />
                                            {errors.duration}
                                        </div>
                                    )}

                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label htmlFor="start-date">
                                                <Calendar size={18} />
                                                Date de début
                                            </label>
                                            <input
                                                id="start-date"
                                                type="date"
                                                value={campaignData.startDate}
                                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                                                className={errors.startDate ? 'input-error' : ''}
                                            />
                                            {errors.startDate && <span className="error-message">{errors.startDate}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="end-date">
                                                <Calendar size={18} />
                                                Date de fin
                                            </label>
                                            <input
                                                id="end-date"
                                                type="date"
                                                value={campaignData.endDate}
                                                onChange={(e) => handleInputChange('endDate', e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="user-budget">
                                                <DollarSign size={18} />
                                                Budget souhaité
                                            </label>
                                            <input
                                                id="user-budget"
                                                type="number"
                                                min="0"
                                                step="1000"
                                                value={campaignData.userBudget}
                                                onChange={(e) => {
                                                    const v = Number(e.target.value)
                                                    handleInputChange('userBudget', Number.isNaN(v) ? 0 : Math.max(0, v))
                                                }}
                                                className={errors.userBudget ? 'input-error' : ''}
                                                placeholder="Entrez votre budget souhaité"
                                            />
                                            {errors.userBudget && <span className="error-message">{errors.userBudget}</span>}
                                            <small className="form-hint">Budget que vous souhaitez allouer à votre campagne</small>
                                        </div>
                                    </div>

                                    <div className="step-actions">
                                        <button type="button" className="btn" onClick={() => setActiveStep(2)} disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="spinner-icon" />
                                                    Chargement...
                                                </>
                                            ) : (
                                                'Retour'
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => setActiveStep(4)}
                                            disabled={campaignData.duration < 1 || !campaignData.startDate || isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="spinner-icon" />
                                                    Chargement...
                                                </>
                                            ) : (
                                                'Continuer'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeStep === 4 && (
                                <div className="step-content reveal">
                                    <div className="step-header">
                                        <h3>4. Résumé et validation</h3>
                                        <p>Revoyez les détails de votre campagne avant de la valider</p>
                                    </div>

                                    <div className="summary-grid">
                                        <div className="summary-card">
                                            <h4>Récapitulatif</h4>
                                            <div className="summary-item">
                                                <span className="summary-label">Nom</span>
                                                <span className="summary-value">{campaignData.name}</span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-label">Durée</span>
                                                <span className="summary-value">{campaignData.duration} mois</span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-label">Dates</span>
                                                <span className="summary-value">
                                                    {campaignData.startDate} → {campaignData.endDate}
                                                </span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-label">Budget souhaité</span>
                                                <span className="summary-value budget-highlight">
                                                    {campaignData.userBudget.toLocaleString()} $
                                                </span>
                                            </div>
                                        </div>

                                        <div className="summary-card">
                                            <h4>Sélections</h4>
                                            <div className="summary-section">
                                                <h5>Types de campagne</h5>
                                                {campaignData.campaignTypes.length === 0 ? (
                                                    <span className="no-selection">Aucun</span>
                                                ) : (
                                                    campaignData.campaignTypes.map(campaignTypeId => {
                                                        const campaignType = campaignTypes.find(ct => ct.id === campaignTypeId)
                                                        return (
                                                            <div key={campaignTypeId} className="selection-item">
                                                                <span>{campaignType?.name || campaignType?.type}</span>
                                                                <span>{campaignType?.budget_min ? `${parseFloat(campaignType.budget_min).toLocaleString()} $` : 'Sur devis'}</span>
                                                            </div>
                                                        )
                                                    })
                                                )}
                                            </div>
                                            <div className="summary-section">
                                                <h5>Packs</h5>
                                                {campaignData.packs.length === 0 ? (
                                                    <span className="no-selection">Aucun</span>
                                                ) : (
                                                    campaignData.packs.map(packId => {
                                                        const pack = packs.find(p => p.id === packId)
                                                        return (
                                                            <div key={packId} className="selection-item">
                                                                <span>{pack?.nom}</span>
                                                                <span>{pack?.budget ? `${parseFloat(pack.budget).toLocaleString()} $` : 'Sur devis'}</span>
                                                            </div>
                                                        )
                                                    })
                                                )}
                                            </div>
                                        </div>

                                        <div className="summary-card">
                                            <h4>Ciblage</h4>
                                            <div className="summary-section">
                                                <h5>Zone</h5>
                                                <span className="target-value">
                                                    {campaignData.targetZone && pointsChauds.length > 0
                                                        ? pointsChauds.find(point => point.id === campaignData.targetZone)?.nom || 'Non spécifié'
                                                        : 'Non spécifié'
                                                    }
                                                </span>
                                            </div>
                                            <div className="summary-section">
                                                <h5>Trajet</h5>
                                                <span className="target-value">
                                                    {campaignData.targetTrajet && transportRoutes.length > 0
                                                        ? transportRoutes.find(route => route.id === campaignData.targetTrajet)?.nom || 'Non spécifié'
                                                        : 'Non spécifié'
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="step-actions">
                                        <button type="button" className="btn" onClick={() => setActiveStep(3)} disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="spinner-icon" />
                                                    Chargement...
                                                </>
                                            ) : (
                                                'Retour'
                                            )}
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-large"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="spinner-icon" />
                                                    Envoi en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={18} />
                                                    Soumettre
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* Success Message */}
            {success && (
                <div className="success-overlay">
                    <div className="success-content">
                        <CheckCircle size={64} className="success-icon" />
                        <h3>Campagne créée avec succès !</h3>
                        <p>Votre campagne "{campaignData.name}" a été enregistrée.</p>
                        <p>Notre équipe va étudier votre demande et vous recontacter sous 48h.</p>
                    </div>
                </div>
            )}

            {/* Fixed Bottom Summary */}
            {/* {campaignData.campaignTypes.length > 0 && (
                <div className="fixed-summary">
                    <div className="summary-content">
                        <div className="summary-info">
                            <div className="summary-campaigns">
                                {campaignData.campaignTypes.map(campaignTypeId => {
                                    const campaignType = campaignTypes.find(ct => ct.id === campaignTypeId)
                                    return (
                                        <span key={campaignTypeId} className="campaign-tag">
                                            {campaignType?.name || campaignType?.type}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="summary-price">
                            <div className="price-label">Budget total estimé</div>
                            <div className="price-amount">{currentBudget.toLocaleString()} $</div>
                            <div className="price-duration">pour {campaignData.duration} mois</div>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    )
}

export default Campaigns
