import { useState, useEffect } from 'react'

export const useLanguage = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'fr')

  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem('lang') || 'fr')
    }
    window.addEventListener('languageChange', handleLangChange)
    return () => {
      window.removeEventListener('languageChange', handleLangChange)
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = lang === 'fr' ? 'en' : 'fr'
    localStorage.setItem('lang', newLang)
    window.dispatchEvent(new Event('languageChange'))
  }

  // Translation helper function
  const t = (translations) => {
    return translations[lang] || translations['fr']
  }

  return { lang, toggleLanguage, t }
}
