import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, ClipboardCheck, Clock, Facebook, Linkedin, Mail, MapPin, MessageCircle, Phone, Send, Sparkles } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useScrollReveal } from '../hooks/useScrollReveal'
import AccentText from '../components/AccentText'
import InnerPageHero from '../components/InnerPageHero'
import TikTokIcon from '../components/TikTokIcon'

const CONTACT_EMAIL = 'contact@onekana-agency.com'
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61591640678284'
const LINKEDIN_URL = 'https://www.linkedin.com/in/onekana-agency-officiel-999147429'
const TIKTOK_URL = 'https://www.tiktok.com/@onekanaagencyofficiel?is_from_webapp=1&sender_device=pc'

function Contact() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const objectiveSubjects = t({
    fr: {
      visibilite: 'Campagne de visibilité de marque',
      lancement: 'Lancement de produit ou service',
      activation: 'Activation terrain',
    },
    en: {
      visibilite: 'Brand visibility campaign',
      lancement: 'Product or service launch',
      activation: 'Field activation',
    },
  })
  const poleParams = {
    mediamove: 'Onekana MediaMove',
    streets: 'Onekana Streets',
    dooh: 'Onekana DOOH',
    connect: 'Onekana Connect',
    studio: 'Onekana Studio',
    life: 'Onekana Life',
  }
  const requestedSupport = searchParams.get('support') || ''
  const initialSubject = objectiveSubjects[searchParams.get('objectif')]
    || (requestedSupport ? t({ fr: `Demande pour ${requestedSupport}`, en: `${requestedSupport} enquiry` }) : '')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: initialSubject,
    pole: poleParams[searchParams.get('pole')] || '',
    budgetRange: '',
    customBudget: '',
    message: '',
    website: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [openFaq, setOpenFaq] = useState(0)
  useScrollReveal()

  const poleOptions = ['Onekana MediaMove', 'Onekana Streets', 'Onekana DOOH', 'Onekana Connect', 'Onekana Studio', 'Onekana Life']
  const budgetOptions = t({
    fr: [
      { value: 'undecided', label: 'À définir' },
      { value: 'custom', label: 'Montant personnalisé' },
    ],
    en: [
      { value: 'undecided', label: 'To be defined' },
      { value: 'custom', label: 'Custom amount' },
    ],
  })
  const completedBriefFields = [formData.name, formData.email, formData.subject, formData.pole, formData.message]
    .filter((value) => value.trim()).length
  const briefProgress = completedBriefFields * 20
  const selectedBudgetOption = budgetOptions.find((option) => option.value === formData.budgetRange)
  const budgetSummary = formData.budgetRange === 'custom' && formData.customBudget
    ? `${formData.customBudget} USD`
    : selectedBudgetOption?.label || t({ fr: 'À préciser', en: 'To be specified' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    if (formErrors[name]) setFormErrors((current) => ({ ...current, [name]: '' }))
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = t({ fr: 'Votre nom est requis', en: 'Your name is required' })
    if (!formData.email.trim()) errors.email = t({ fr: 'Votre email est requis', en: 'Your email is required' })
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = t({ fr: 'Email invalide', en: 'Invalid email' })
    if (!formData.subject.trim()) errors.subject = t({ fr: 'L’objet de la demande est requis', en: 'The request subject is required' })
    if (!formData.pole) errors.pole = t({ fr: 'Choisissez un pôle Onekana', en: 'Choose a Onekana hub' })
    if (formData.budgetRange === 'custom' && (!formData.customBudget || Number(formData.customBudget) <= 0)) {
      errors.customBudget = t({ fr: 'Indiquez un montant valide', en: 'Enter a valid amount' })
    }
    if (!formData.message.trim()) errors.message = t({ fr: 'Votre message est requis', en: 'Your message is required' })
    return errors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    try {
      setSubmitting(true)
      const selectedBudget = budgetOptions.find((option) => option.value === formData.budgetRange)
      const budgetLabel = formData.budgetRange === 'custom'
        ? `${formData.customBudget} USD`
        : selectedBudget?.label || t({ fr: 'Non renseigné', en: 'Not provided' })
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          support: requestedSupport,
          budget: budgetLabel,
        }),
      })
      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error(t({
          fr: 'Le service de messagerie est momentanément indisponible. Veuillez réessayer dans quelques instants.',
          en: 'The messaging service is temporarily unavailable. Please try again shortly.',
        }))
      }
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || t({
          fr: 'Le message n’a pas pu être envoyé. Veuillez réessayer.',
          en: 'The message could not be sent. Please try again.',
        }))
      }

      setSubmitted(true)
      setFormErrors({})
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        pole: '',
        budgetRange: '',
        customBudget: '',
        message: '',
        website: '',
      })
    } catch (error) {
      setFormErrors({
        submit: error.message || t({
          fr: 'Une erreur réseau est survenue. Veuillez réessayer.',
          en: 'A network error occurred. Please try again.',
        }),
      })
    } finally {
      setSubmitting(false)
    }
  }

  const faqs = t({
    fr: [
      { question: 'Avec quels supports peut-on lancer une campagne ?', answer: 'Onekana combine véhicules, dispositifs piétons, écrans mobiles, création et reporting selon votre objectif et les zones à couvrir.' },
      { question: 'Comment choisissez-vous les zones de diffusion ?', answer: 'Nous observons les flux, les habitudes de déplacement et les moments de présence utiles avant de proposer un dispositif.' },
      { question: 'Pouvez-vous créer les visuels de campagne ?', answer: 'Oui. Onekana Studio conçoit les affiches, flyers et clips courts adaptés aux supports retenus.' },
      { question: 'Comment suivre ce qui a été déployé ?', answer: 'Onekana Connect rassemble les observations terrain et les indicateurs utiles dans un reporting lisible.' },
    ],
    en: [
      { question: 'Which media can be used for a campaign?', answer: 'Onekana combines vehicles, street formats, mobile screens, creative production and reporting based on your objective and target zones.' },
      { question: 'How do you select activation zones?', answer: 'We study flows, travel habits and useful moments of presence before recommending a campaign setup.' },
      { question: 'Can you create the campaign visuals?', answer: 'Yes. Onekana Studio creates posters, flyers and short clips adapted to the selected media.' },
      { question: 'How can deployment be tracked?', answer: 'Onekana Connect gathers field observations and useful indicators in a clear report.' },
    ],
  })

  return (
    <div className="page contact-page">
      <InnerPageHero
        
        title={t({
          fr: [{ text: 'Votre idée mérite ' }, { text: 'de circuler.', accent: true }],
          en: [{ text: 'Your idea deserves ' }, { text: 'to move.', accent: true }],
        })}
        description={t({
          fr: ['Parlez-nous de votre objectif. Nous le transformons en ', { text: 'présence visible dans la ville.', accent: true }],
          en: ['Tell us your objective. We turn it into ', { text: 'a visible presence in the city.', accent: true }],
        })}
        meta={t({ fr: ['Réponse humaine', 'Brief simple', 'Suivi clair'], en: ['Human response', 'Simple brief', 'Clear follow-up'] })}
      >
        <div className="contact-hero-conversation">
          <div className="contact-bubble contact-bubble--brand"><Sparkles size={18} />{t({ fr: 'Quelle visibilité recherchez-vous ?', en: 'What visibility are you looking for?' })}</div>
          <div className="contact-bubble contact-bubble--client">{t({ fr: 'Je veux être vu dans toute la ville.', en: 'I want to be seen across the city.' })}</div>
          <div className="contact-bubble contact-bubble--brand"><MessageCircle size={18} />{t({ fr: 'Construisons le bon dispositif.', en: 'Let’s build the right campaign.' })}</div>
          <span className="contact-response-status"><i />{t({ fr: 'Équipe disponible', en: 'Team available' })}</span>
        </div>
      </InnerPageHero>

      <section className="section contact-workspace-section">
        <div className="container">
          <div className="contact-workspace">
            <aside className="contact-info-panel reveal-left">
              <span className="section-label">{t({ fr: 'Parlons concrètement', en: 'Let’s make it concrete' })}</span>
              <h2>
                {t({ fr: 'Un premier échange, puis une ', en: 'One first conversation, then a ' })}<span className="text-accent">{t({ fr: 'direction claire.', en: 'clear direction.' })}</span>
              </h2>
              <p className="accent-description">
                <AccentText parts={t({
                  fr: ['Décrivez votre marque, votre public et votre ambition. Nous revenons avec ', { text: 'les bonnes questions.', accent: true }],
                  en: ['Describe your brand, audience and ambition. We come back with ', { text: 'the right questions.', accent: true }],
                })} />
              </p>

              <div className="contact-detail-list">
                <a href={`mailto:${CONTACT_EMAIL}`}><Mail size={20} /><span><small>Email</small>{CONTACT_EMAIL}</span></a>
                <a href="tel:+243986773438"><Phone size={20} /><span><small>{t({ fr: 'Téléphone', en: 'Phone' })}</small>+243 986 773 438</span></a>
                <div><MapPin size={20} /><span><small>{t({ fr: 'Adresse', en: 'Address' })}</small>Avenue Vangu N°2656, Référence Arrêt du Carmel, Quartier Gambela 2, Commune de Lubumbashi</span></div>
                <div><Clock size={20} /><span><small>{t({ fr: 'Disponibilité', en: 'Availability' })}</small>{t({ fr: 'Lundi - Vendredi, 9h - 18h', en: 'Monday - Friday, 9am - 6pm' })}</span></div>
              </div>

              <div className="contact-social-row">
                <a href={FACEBOOK_URL} aria-label="Facebook Onekana" target="_blank" rel="noopener noreferrer"><Facebook size={19} /></a>
                <a href={LINKEDIN_URL} aria-label="LinkedIn Onekana" target="_blank" rel="noopener noreferrer"><Linkedin size={19} /></a>
                <a href={TIKTOK_URL} aria-label="TikTok Onekana" target="_blank" rel="noopener noreferrer"><TikTokIcon size={19} /></a>
              </div>
            </aside>

            <div className="contact-form-shell reveal-right">
              {submitted ? (
                <div className="contact-success" role="status">
                  <div><Send size={30} /></div>
                  <span className="section-label">{t({ fr: 'Message envoyé', en: 'Message sent' })}</span>
                  <h3>{t({ fr: 'Votre demande est arrivée chez Onekana.', en: 'Your request has reached Onekana.' })}</h3>
                  <p>{t({ fr: 'Merci. Notre équipe pourra vous répondre directement à l’adresse indiquée.', en: 'Thank you. Our team can reply directly to the email address you provided.' })}</p>
                  <button type="button" className="btn btn-outline" onClick={() => setSubmitted(false)}>{t({ fr: 'Envoyer un autre message', en: 'Send another message' })}</button>
                </div>
              ) : (
                <form className="contact-form-modern" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form-heading"><span>01</span><div><small>{t({ fr: 'Votre brief', en: 'Your brief' })}</small><h3>{t({ fr: 'Commençons simplement', en: 'Let’s start simply' })}</h3></div></div>
                  <div className="contact-honeypot" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>
                  <aside className="contact-brief-summary" aria-live="polite">
                    <div className="contact-brief-summary-head">
                      <div><ClipboardCheck size={20} /><span>{t({ fr: 'Récapitulatif de la demande', en: 'Request summary' })}</span></div>
                      <strong>{briefProgress}%</strong>
                    </div>
                    <div
                      className="contact-brief-progress"
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow={briefProgress}
                      aria-label={t({ fr: 'Progression du brief', en: 'Brief progress' })}
                    >
                      <span style={{ width: `${briefProgress}%` }} />
                    </div>
                    <div className="contact-brief-summary-grid">
                      <div className={formData.subject ? 'filled' : ''}>
                        <small>{t({ fr: 'Objet', en: 'Subject' })}</small>
                        <span>{formData.subject || t({ fr: 'À préciser', en: 'To be specified' })}</span>
                      </div>
                      <div className={formData.pole ? 'filled' : ''}>
                        <small>{t({ fr: 'Pôle', en: 'Hub' })}</small>
                        <span>{formData.pole || t({ fr: 'À choisir', en: 'To be selected' })}</span>
                      </div>
                      <div className={formData.budgetRange ? 'filled' : ''}>
                        <small>{t({ fr: 'Budget', en: 'Budget' })}</small>
                        <span>{budgetSummary}</span>
                      </div>
                      {requestedSupport && (
                        <div className="filled">
                          <small>{t({ fr: 'Support conseillé', en: 'Recommended medium' })}</small>
                          <span>{requestedSupport}</span>
                        </div>
                      )}
                    </div>
                  </aside>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">{t({ fr: 'Nom', en: 'Name' })} *</label>
                      <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t({ fr: 'Votre nom', en: 'Your name' })} className={formErrors.name ? 'input-error' : ''} />
                      {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="vous@email.com" className={formErrors.email ? 'input-error' : ''} />
                      {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">{t({ fr: 'Entreprise', en: 'Company' })}</label>
                    <input id="company" name="company" value={formData.company} onChange={handleChange} placeholder={t({ fr: 'Nom de votre entreprise', en: 'Company name' })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">{t({ fr: 'Objet de la demande', en: 'Request subject' })} *</label>
                    <input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder={t({ fr: 'Ex. Lancement de notre nouveau service', en: 'E.g. Launch of our new service' })} className={formErrors.subject ? 'input-error' : ''} />
                    {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
                  </div>
                  <div className="form-row contact-qualification-row">
                    <div className="form-group">
                      <label htmlFor="pole">{t({ fr: 'Pôle concerné', en: 'Relevant hub' })} *</label>
                      <select id="pole" name="pole" value={formData.pole} onChange={handleChange} className={formErrors.pole ? 'input-error' : ''}>
                        <option value="">{t({ fr: 'Choisir un pôle', en: 'Choose a hub' })}</option>
                        {poleOptions.map((pole) => <option key={pole} value={pole}>{pole}</option>)}
                      </select>
                      {formErrors.pole && <span className="error-message">{formErrors.pole}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="budgetRange">{t({ fr: 'Budget indicatif', en: 'Indicative budget' })}</label>
                      <select id="budgetRange" name="budgetRange" value={formData.budgetRange} onChange={handleChange}>
                        <option value="">{t({ fr: 'Sélectionner un budget', en: 'Select a budget' })}</option>
                        {budgetOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    </div>
                  </div>
                  {formData.budgetRange === 'custom' && (
                    <div className="form-group custom-budget-field">
                      <label htmlFor="customBudget">{t({ fr: 'Montant personnalisé (USD)', en: 'Custom amount (USD)' })}</label>
                      <input type="number" min="1" step="50" inputMode="numeric" id="customBudget" name="customBudget" value={formData.customBudget} onChange={handleChange} placeholder="1500" className={formErrors.customBudget ? 'input-error' : ''} />
                      {formErrors.customBudget && <span className="error-message">{formErrors.customBudget}</span>}
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="message">{t({ fr: 'Votre projet', en: 'Your project' })} *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder={t({ fr: 'Objectif, audience, zones, idée de départ...', en: 'Objective, audience, zones, starting idea...' })} rows="6" className={formErrors.message ? 'input-error' : ''} />
                    {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                  </div>
                  {formErrors.submit && <div className="error-message error-message-submit">{formErrors.submit}</div>}
                  <button type="submit" className="btn btn-primary btn-large contact-submit" disabled={submitting}>
                    <Send size={18} />{submitting ? t({ fr: 'Envoi...', en: 'Sending...' }) : t({ fr: 'Envoyer le message', en: 'Send message' })}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt contact-faq-section">
        <div className="container contact-faq-layout">
          <div className="reveal-left">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">
              {t({ fr: 'Avant de lancer ', en: 'Before setting things ' })}<span className="text-accent">{t({ fr: 'le mouvement', en: 'in motion' })}</span>
            </h2>
            <p className="section-intro accent-description"><AccentText parts={t({ fr: ['Les réponses essentielles pour passer ', { text: 'de l’idée au terrain.', accent: true }], en: ['Essential answers to move ', { text: 'from idea to field.', accent: true }] })} /></p>
          </div>
          <div className="contact-faq-list reveal-stagger">
            {faqs.map((faq, index) => (
              <article key={faq.question} className={`contact-faq-item${openFaq === index ? ' open' : ''}`}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                  <span>{String(index + 1).padStart(2, '0')}</span>{faq.question}<ChevronDown size={20} />
                </button>
                <div className="contact-faq-answer"><p>{faq.answer}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
