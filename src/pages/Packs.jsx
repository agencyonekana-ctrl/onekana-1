import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Move3d, Layers, Network, Eye, Brain, Phone, CheckCircle, Car, Store, Smartphone, Target, ArrowRight, Backpack, Play, MousePointer, Sun, Check, Package, DollarSign, Zap, Users, Star, Download, FileText, ChevronDown, Plus, Edit, Trash2, Filter, Search } from 'lucide-react'
import { getPacksCommerciaux, createPack, updatePack, deletePack } from '../services/apiService'
import { useLanguage } from '../hooks/useLanguage'

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

// Pack Icon Selector
const _getPackIcon = (name) => {
    if (!name || typeof name !== 'string') return Eye
    const nameUpper = name.toUpperCase()
    if (nameUpper.includes('START')) return Eye
    if (nameUpper.includes('IMPACT')) return Zap
    if (nameUpper.includes('DOMINATION')) return Users
    if (nameUpper.includes('ÉVÉNEMENTIELLE') || nameUpper.includes('EVENEMENTIELLE')) return Star
    if (nameUpper.includes('SUR-MESURE') || nameUpper.includes('SUR MESURE')) return Target
    return Eye
}

// Format Budget
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

// Pack Card Component
const PackCard = ({ pack }) => {
    return (
        <div className="pack-card">
            <div className="pack-header">
                <div className="pack-icon">
                    <Eye size={24} strokeWidth={1.5} />
                </div>
                <h3 className="pack-name">{pack.name}</h3>
                <div className="pack-budget">
                    <DollarSign size={16} strokeWidth={1.5} />
                    {formatBudget(pack)}
                </div>
            </div>
            <div className="pack-description" dangerouslySetInnerHTML={{
                __html: pack.description ? pack.description.replace(/ ➤ /g, '<br />') : ''
            }}></div>
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
}

// Add/Edit Pack Modal
const PackModal = ({ pack, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nom: pack?.nom || '',
        budget_min: pack?.budget_min || '',
        budget_max: pack?.budget_max || '',
        budget_description: pack?.budget_description || '',
        description: pack?.description || '',
        categorie: pack?.categorie || '',
        ideal_pour: pack?.ideal_pour || '',
        fonctionnalites: pack?.fonctionnalites || ['']
    })

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.fonctionnalites]
        newFeatures[index] = value
        setFormData(prev => ({ ...prev, fonctionnalites: newFeatures }))
    }

    const addFeature = () => {
        setFormData(prev => ({ ...prev, fonctionnalites: [...prev.fonctionnalites, ''] }))
    }

    const removeFeature = (index) => {
        const newFeatures = formData.fonctionnalites.filter((_, i) => i !== index)
        setFormData(prev => ({ ...prev, fonctionnalites: newFeatures }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await onSave(formData)
            onClose()
        } catch (error) {
            console.error('Error saving pack:', error)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{pack ? 'Modifier le Pack' : 'Nouveau Pack'}</h3>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom du pack</label>
                        <input
                            type="text"
                            value={formData.nom}
                            onChange={(e) => handleInputChange('nom', e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Budget minimum</label>
                            <input
                                type="number"
                                value={formData.budget_min}
                                onChange={(e) => handleInputChange('budget_min', e.target.value)}
                                step="0.01"
                            />
                        </div>
                        <div className="form-group">
                            <label>Budget maximum</label>
                            <input
                                type="number"
                                value={formData.budget_max}
                                onChange={(e) => handleInputChange('budget_max', e.target.value)}
                                step="0.01"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description du budget</label>
                        <input
                            type="text"
                            value={formData.budget_description}
                            onChange={(e) => handleInputChange('budget_description', e.target.value)}
                            placeholder="Ex: À partir de 5 000 $"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows="3"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Catégorie</label>
                        <select
                            value={formData.categorie}
                            onChange={(e) => handleInputChange('categorie', e.target.value)}
                            required
                        >
                            <option value="">Sélectionner une catégorie</option>
                            <option value="visibilité">Visibilité</option>
                            <option value="trafic">Trafic</option>
                            <option value="domination">Domination</option>
                            <option value="événementiel">Événementiel</option>
                            <option value="stratégique">Stratégique</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Ideal pour</label>
                        <input
                            type="text"
                            value={formData.ideal_pour}
                            onChange={(e) => handleInputChange('ideal_pour', e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Fonctionnalités</label>
                        {formData.fonctionnalites.map((feature, index) => (
                            <div key={index} className="feature-input">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    required
                                />
                                <button type="button" onClick={() => removeFeature(index)} className="btn btn-danger">
                                    ×
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addFeature} className="btn btn-secondary">
                            <Plus size={16} strokeWidth={2} />
                            Ajouter une fonctionnalité
                        </button>
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn btn-secondary">Annuler</button>
                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// Packs Page Component
function Packs() {
    const { t } = useLanguage()
    const [packs, setPacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [_showModal, setShowModal] = useState(false)
    const [editingPack, setEditingPack] = useState(null)

    useEffect(() => {
        fetchPacks()
    }, [])

    const fetchPacks = async () => {
        try {
            setLoading(true)
            const response = await getPacksCommerciaux()

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
                nom: pack.nom,
                name: pack.nom,
                budget_min: pack.budget_min,
                budget_max: pack.budget_max,
                budget_description: pack.budget_description,
                description: pack.description,
                categorie: pack.categorie,
                ideal_pour: pack.ideal_pour,
                fonctionnalites: pack.fonctionnalites || []
            }))

            setPacks(frontendPacks)
        } catch (err) {
            console.error('Error fetching packs:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const _handleAddPack = () => {
        setEditingPack(null)
        setShowModal(true)
    }

    const _handleEditPack = (pack) => {
        setEditingPack(pack)
        setShowModal(true)
    }

    const _handleDeletePack = async (packId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce pack ?')) {
            try {
                await deletePack(packId)
                fetchPacks()
            } catch (error) {
                console.error('Error deleting pack:', error)
                alert('Erreur lors de la suppression du pack')
            }
        }
    }

    const _handleSavePack = async (packData) => {
        try {
            if (editingPack) {
                await updatePack(editingPack.id, packData)
            } else {
                await createPack(packData)
            }
            fetchPacks()
        } catch (error) {
            console.error('Error saving pack:', error)
            alert('Erreur lors de l\'enregistrement du pack')
        }
    }

    // Filtrage des packs
    const filteredPacks = packs.filter(pack => {
        const matchesSearch = pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pack.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = !categoryFilter || pack.categorie === categoryFilter
        return matchesSearch && matchesCategory
    })

    const categories = [...new Set(packs.map(pack => pack.categorie))].filter(Boolean)

    if (loading) {
        return (
            <div className="packs-page">
                <div className="container">
                    <div className="loading-message">
                        <div className="loading-spinner"></div>
                        <p>Chargement des packs commerciaux...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="packs-page">
                <div className="container">
                    <div className="error-message">
                        <p>Erreur lors du chargement des packs: {error}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="packs-page">
            {/* Hero Section */}
            <section className="page-header page-header-packs">
                <div className="hero-content">
                    {/* <p className="hero-subtitle animate-fade-in">
                        <img src="/onek.png" alt="Onek" style={{ width: '40px', height: '40px', marginRight: '10px', verticalAlign: 'middle' }} />
                        Onekana Agency
                    </p> */}
                    <h1 className="hero-title">
                        <span className="line animate-fade-in-up" style={{ animationDelay: '0.2s' }}>{t({ fr: 'Nos Packs', en: 'Our Packs' })}</span>
                        <span className="line animate-fade-in-up" style={{ animationDelay: '0.4s' }}>{t({ fr: 'Commerciaux', en: 'Commercial' })}</span>
                        <span className="line accent animate-fade-in-up" style={{ animationDelay: '0.6s' }}>{t({ fr: 'Sur Mesure', en: 'Customized' })}</span>
                    </h1>
                    <p className="hero-description animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                        {t({ fr: 'Des solutions marketing urbain et mobile adaptées à vos besoins spécifiques.', en: 'Urban and mobile marketing solutions tailored to your specific needs.' })}
                    </p>
                    <div className="hero-cta animate-fade-in-up" style={{ animationDelay: '1s' }}>
                        <BrochureDropdown />
                        <Link to="/contact" className="btn">{t({ fr: 'Nous contacter', en: 'Contact Us' })}</Link>
                    </div>
                </div>
                <div className="hero-scroll">
                    <span>{t({ fr: 'Faire défiler', en: 'Scroll' })}</span>
                    <div className="scroll-line"></div>
                </div>
            </section>

            {/* Main Content */}
            <section className="packs-content section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">{t({ fr: 'Nos Solutions', en: 'Our Solutions' })}</span>
                        <h2 className="section-title">{t({ fr: 'PACKS COMMERCIAUX', en: 'COMMERCIAL PACKS' })}</h2>
                        <p className="section-subtitle">{t({ fr: 'Choisissez la solution qui correspond à vos objectifs', en: 'Choose the solution that matches your objectives' })}</p>
                    </div>

                    {/* Filters */}
                    <div className="packs-filters">
                        <div className="filter-group">
                            <Search size={20} strokeWidth={1.5} />
                            <input
                                type="text"
                                placeholder="Rechercher un pack..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <Filter size={20} strokeWidth={1.5} />
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="">Toutes les catégories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* <button className="btn btn-primary" onClick={handleAddPack}>
                            <Plus size={18} strokeWidth={2} />
                            Nouveau Pack
                        </button> */}
                    </div>

                    {/* Packs Grid */}
                    <div className="packs-grid">
                        {filteredPacks.length > 0 ? (
                            filteredPacks.map((pack, index) => (
                                <PackCard
                                    key={pack.id || index}
                                    pack={pack}
                                />
                            ))
                        ) : (
                            <div className="no-results">
                                <p>Aucun pack trouvé correspondant à vos critères.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Options Complémentaires */}
            <section className="options-section section">
                <div className="container">
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
                            <div key={index} className="option-card">
                                <Check size={16} strokeWidth={2} />
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Packs
