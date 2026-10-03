import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr')

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = lang === 'fr'
      ? "CFPAL — Centre de Formation Professionnelle et d'Apprentissage des Langues"
      : 'CFPAL — Professional Training and Language Learning Centre'

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.content = lang === 'fr'
        ? 'CFPAL - Centre de Formation Professionnelle et d\'Apprentissage des Langues au Cameroun.'
        : 'CFPAL - Professional Training and Language Learning Centre in Cameroon.'
    }
  }, [lang])

  const value = {
    lang,
    setLang,
    // t(frText, enText) -> renvoie le texte dans la langue active
    t: (fr, en) => (lang === 'fr' ? fr : en ?? fr),
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage doit être utilisé dans un <LanguageProvider>')
  return ctx
}
