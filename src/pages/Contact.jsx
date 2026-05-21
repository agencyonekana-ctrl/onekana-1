import { useState, useEffect } from 'react'
import { Send, Mail, Phone, MapPin, Clock, Instagram, Linkedin, Twitter, Dribbble } from 'lucide-react'
import { getCampaignTypes } from '../services/apiService'
import { PHP_ENDPOINTS } from '../config/api'
import { useLanguage } from '../hooks/useLanguage'

function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    campaignTypes: [],
    budget: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [campaignTypes, setCampaignTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-stagger, .reveal-scale, .reveal-blur, .reveal-rotate, .reveal-wipe').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Fetch campaign types from API
  useEffect(() => {
    const fetchCampaignTypes = async () => {
      try {
        setLoading(true)
        const response = await getCampaignTypes()
        console.log('API Response:', response)

        if (response && response.data) {
          setCampaignTypes(response.data)
        } else if (Array.isArray(response)) {
          // Si la réponse est directement un tableau
          setCampaignTypes(response)
        } else {
          setCampaignTypes([])
        }
      } catch (err) {
        console.error('Error fetching campaign types:', err)
        setError(err.message)
        setCampaignTypes([])
      } finally {
        setLoading(false)
      }
    }

    fetchCampaignTypes()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === 'campaignTypes') {
      // Handle multiple selection
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
      setFormData({
        ...formData,
        campaignTypes: selectedOptions
      })
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      })
    }

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      })
    }
  }

  const handleCampaignTypeToggle = (campaignType) => {
    const isSelected = formData.campaignTypes.includes(campaignType.id)
    const newSelection = isSelected
      ? formData.campaignTypes.filter(id => id !== campaignType.id)
      : [...formData.campaignTypes, campaignType.id]

    setFormData({
      ...formData,
      campaignTypes: newSelection
    })
  }

  const getTotalPrice = () => {
    return formData.campaignTypes.reduce((total, campaignTypeId) => {
      const campaignType = campaignTypes.find(ct => ct.id === campaignTypeId)
      if (campaignType && campaignType.budget_min) {
        return total + parseFloat(campaignType.budget_min)
      }
      return total
    }, 0)
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) {
      errors.name = 'Votre nom est requis'
    }
    if (!formData.email.trim()) {
      errors.email = 'Votre email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email invalide'
    }
    if (!formData.message.trim()) {
      errors.message = 'Votre message est requis'
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    try {
      // Prepare the contact message data
      const contactData = {
        name: formData.name,
        email: formData.email,
        subject: formData.company ? `Contact - ${formData.company}` : 'Contact',
        message: formData.message,
        status: 'unread'
      }

      // Send the contact message to the server
      const response = await fetch(PHP_ENDPOINTS.CONTACT_MESSAGE_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      })

      if (response.ok) {
        // Success
        setSubmitted(true)
        // Reset form after success
        setTimeout(() => {
          setSubmitted(false)
          setFormData({
            name: '',
            email: '',
            company: '',
            campaignTypes: [],
            budget: '',
            message: ''
          })
        }, 3000)
      } else {
        // Handle server error
        const errorData = await response.json()
        setFormErrors({ submit: errorData.message || 'Une erreur est survenue lors de l\'envoi du message' })
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setFormErrors({ submit: 'Une erreur réseau est survenue. Veuillez réessayer.' })
    }
  }

  const services = [
    'Stratégie Digitale',
    'Design UI/UX',
    'Développement Web',
    'Branding',
    'Motion Design',
    'Autre'
  ]



  return (
    <div className="page">
      {/* Page Header */}
      <section className="page-header page-header-contact">
        {/* Objets décoratifs multimédia & publicité */}
        <div className="page-header-objects" aria-hidden="true">
          {/* Enveloppe / Message */}
          <svg className="ph-obj ph-obj-1" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="14" width="52" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
            <path d="M6 18L32 36L58 18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <line x1="6" y1="50" x2="22" y2="34" stroke="currentColor" strokeWidth="1.5" />
            <line x1="58" y1="50" x2="42" y2="34" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Smartphone */}
          <svg className="ph-obj ph-obj-2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="4" width="32" height="56" rx="6" stroke="currentColor" strokeWidth="2" />
            <line x1="16" y1="12" x2="48" y2="12" stroke="currentColor" strokeWidth="1.5" />
            <line x1="16" y1="52" x2="48" y2="52" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="32" cy="57" r="2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="22" y="18" width="20" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <line x1="22" y1="36" x2="42" y2="36" stroke="currentColor" strokeWidth="1.5" />
            <line x1="22" y1="41" x2="36" y2="41" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Mégaphone */}
          <svg className="ph-obj ph-obj-3" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 24H20L44 12V52L20 40H8V24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <line x1="20" y1="40" x2="20" y2="52" stroke="currentColor" strokeWidth="2" />
            <line x1="14" y1="52" x2="26" y2="52" stroke="currentColor" strokeWidth="2" />
            <path d="M50 20C52.5 23 52.5 41 50 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M54 16C58 21 58 43 54 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {/* Bulle de dialogue */}
          <svg className="ph-obj ph-obj-4" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 10C8 8 10 6 12 6H52C54 6 56 8 56 10V38C56 40 54 42 52 42H28L16 56V42H12C10 42 8 40 8 38V10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <line x1="18" y1="20" x2="46" y2="20" stroke="currentColor" strokeWidth="1.5" />
            <line x1="18" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Graphique barres */}
          <svg className="ph-obj ph-obj-5" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="8" y1="56" x2="56" y2="56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <rect x="12" y="36" width="10" height="20" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="27" y="24" width="10" height="32" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="42" y="14" width="10" height="42" rx="1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Wifi / Signal */}
          <svg className="ph-obj ph-obj-6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 24C16 16 48 16 56 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 32C22 26 42 26 48 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 40C27 37 37 37 40 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="48" r="3" fill="currentColor" />
          </svg>
          {/* Localisation / Pin */}
          <svg className="ph-obj ph-obj-7" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 8C22 8 14 16 14 26C14 40 32 56 32 56C32 56 50 40 50 26C50 16 42 8 32 8Z" stroke="currentColor" strokeWidth="2" />
            <circle cx="32" cy="26" r="7" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Étoile */}
          <svg className="ph-obj ph-obj-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 6L38.5 22H56L42.5 32L48 48L32 38L16 48L21.5 32L8 22H25.5L32 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="page-label reveal-up active">{t({ fr: 'Contact', en: 'Contact' })}</span>
          <h1 className="page-title reveal-up active" style={{ transitionDelay: '0.1s' }}>{t({ fr: 'Discutons de votre projet', en: "Let's discuss your project" })}</h1>
          <p className="page-subtitle reveal-up active" style={{ transitionDelay: '0.2s' }}>
            {t({
              fr: "Prêt à créer quelque chose d'extraordinaire ? Contactez-nous et commençons l'aventure.",
              en: "Ready to create something extraordinary? Contact us and let's start the adventure."
            })}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section">
        <div className="container">
          <div className="contact-grid-modern">
            {/* Contact Info */}
            <div className="contact-info-block reveal-left">
              <div className="info-section">
                <div className="info-section-icon">
                  <Mail size={24} />
                </div>
                <h3>Coordonnées</h3>
                <div className="info-items">
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <a href="mailto:hello@onekana.fr">hello@onekana.fr</a>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Téléphone</span>
                    <a href="tel:+33123456789">+33 1 23 45 67 89</a>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Adresse</span>
                    <span>15 rue de la Paix<br />75002 Paris, France</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <div className="info-section-icon">
                  <Clock size={24} />
                </div>
                <h3>Horaires</h3>
                <div className="info-items">
                  <div className="info-item">
                    <span className="info-label">Lundi - Vendredi</span>
                    <span>9h00 - 18h00</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <div className="info-section-icon">
                  <MapPin size={24} />
                </div>
                <h3>Réseaux Sociaux</h3>
                <div className="social-links-modern">
                  <a href="#" className="social-link-modern">
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="social-link-modern">
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="#" className="social-link-modern">
                    <Twitter size={20} />
                    <span>Twitter</span>
                  </a>
                  <a href="#" className="social-link-modern">
                    <Dribbble size={20} />
                    <span>Dribbble</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-block reveal-right">
              {submitted ? (
                <div className="form-success-modern">
                  <div className="success-icon-modern">✓</div>
                  <h3>Message envoyé !</h3>
                  <p>Nous vous recontacterons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form className="contact-form-modern" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Nom *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                        className={formErrors.name ? 'input-error' : ''}
                      />
                      {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                        className={formErrors.email ? 'input-error' : ''}
                      />
                      {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Entreprise</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>


                  <div className="form-group">
                    <label htmlFor="message">Votre projet *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Parlez-nous de votre projet, vos objectifs, vos idées..."
                      rows="6"
                      required
                      className={formErrors.message ? 'input-error' : ''}
                    ></textarea>
                    {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                  </div>

                  {formErrors.submit && (
                    <div className="error-message error-message-submit">
                      {formErrors.submit}
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary btn-large">
                    <Send size={18} />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header reveal-rotate">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Questions fréquentes</h2>
          </div>
          <div className="faq-grid-modern">
            <div className="faq-item-modern reveal-up">
              <h4>Quel est le délai moyen d'un projet ?</h4>
              <p>
                Cela dépend de la complexité du projet. Un site vitrine prend généralement 4-6 semaines,
                tandis qu'un projet plus complexe peut prendre 3-6 mois.
              </p>
            </div>
            <div className="faq-item-modern reveal-up" style={{ transitionDelay: '0.1s' }}>
              <h4>Comment se déroule un projet avec vous ?</h4>
              <p>
                Nous commençons par une phase de découverte, suivie de la stratégie, de la création
                et enfin de la livraison. Vous êtes impliqué à chaque étape du processus.
              </p>
            </div>
            <div className="faq-item-modern reveal-up" style={{ transitionDelay: '0.2s' }}>
              <h4>Proposez-vous un accompagnement après livraison ?</h4>
              <p>
                Oui, nous proposons des contrats de maintenance et d'évolution pour assurer la
                pérennité de votre projet.
              </p>
            </div>
            <div className="faq-item-modern reveal-up" style={{ transitionDelay: '0.3s' }}>
              <h4>Travaillez-vous avec des clients internationaux ?</h4>
              <p>
                Absolument ! Nous travaillons avec des clients du monde entier et nous adaptons
                nos processus pour gérer les différences de fuseaux horaires.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
