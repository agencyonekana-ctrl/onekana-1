import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'

const CookiePopup = () => {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true,   // always required
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const stored = localStorage.getItem('onekana-cookie-consent')
    if (!stored) {
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleToggle = (key) => {
    if (key === 'essential') return
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    localStorage.setItem('onekana-cookie-consent', JSON.stringify(preferences))
    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true }
    localStorage.setItem('onekana-cookie-consent', JSON.stringify(all))
    setIsVisible(false)
  }

  const handleDeclineAll = () => {
    const minimal = { essential: true, analytics: false, marketing: false }
    localStorage.setItem('onekana-cookie-consent', JSON.stringify(minimal))
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div className="cookie-overlay" onClick={handleDeclineAll} />

      {/* Centered Modal */}
      <div className="cookie-popup" role="dialog" aria-modal="true" aria-label={t({ fr: 'Préférences cookies', en: 'Cookie preferences' })}>

        {/* Header */}
        <div className="cookie-header">
          <span className="cookie-icon">🍪</span>
          <h4>{t({ fr: 'Préférences en matière de cookies', en: 'Cookie Preferences' })}</h4>
        </div>

        {/* Description */}
        <p className="cookie-desc">
          {t({
            fr: "Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic et personnaliser nos contenus. Choisissez les catégories que vous souhaitez activer.",
            en: "We use cookies to enhance your experience, analyze our traffic, and personalize content. Choose which categories you wish to enable.",
          })}{' '}
          <Link to="/">{t({ fr: 'En savoir plus', en: 'Learn more' })}</Link>
        </p>

        {/* Options */}
        <div className="cookie-options">
          {/* Essential */}
          <div className="cookie-option">
            <div className="cookie-option-info">
              <span className="cookie-option-label">{t({ fr: 'Essentiel', en: 'Essential' })}</span>
              <span className="cookie-option-desc">{t({ fr: 'Nécessaire au bon fonctionnement du site.', en: 'Required for the site to function properly.' })}</span>
            </div>
            <label className="cookie-toggle">
              <input type="checkbox" checked={true} disabled />
              <span className="cookie-toggle-track" />
            </label>
          </div>

          {/* Analytics */}
          <div className="cookie-option">
            <div className="cookie-option-info">
              <span className="cookie-option-label">{t({ fr: 'Analytics', en: 'Analytics' })}</span>
              <span className="cookie-option-desc">{t({ fr: 'Nous aide à comprendre comment vous utilisez le site.', en: 'Helps us understand how you use our site.' })}</span>
            </div>
            <label className="cookie-toggle">
              <input type="checkbox" checked={preferences.analytics} onChange={() => handleToggle('analytics')} />
              <span className="cookie-toggle-track" />
            </label>
          </div>

          {/* Marketing */}
          <div className="cookie-option">
            <div className="cookie-option-info">
              <span className="cookie-option-label">{t({ fr: 'Marketing', en: 'Marketing' })}</span>
              <span className="cookie-option-desc">{t({ fr: 'Utilisés pour vous proposer des contenus pertinents.', en: 'Used to show you relevant ads and content.' })}</span>
            </div>
            <label className="cookie-toggle">
              <input type="checkbox" checked={preferences.marketing} onChange={() => handleToggle('marketing')} />
              <span className="cookie-toggle-track" />
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="cookie-actions">
          <button className="btn-ghost btn-cookie" onClick={handleDeclineAll}>
            {t({ fr: 'Refuser tout', en: 'Decline all' })}
          </button>
          <button className="btn-ghost btn-cookie" onClick={handleSave}>
            {t({ fr: 'Enregistrer', en: 'Save' })}
          </button>
          <button className="btn btn-primary btn-cookie" onClick={handleAcceptAll}>
            {t({ fr: 'Tout accepter', en: 'Accept all' })}
          </button>
        </div>
      </div>
    </>
  )
}

export default CookiePopup
