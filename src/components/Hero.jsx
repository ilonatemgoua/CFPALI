import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { greetings } from '../data/content.js'

export default function Hero() {
  const { t } = useLanguage()
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  // Carrousel de salutations : change de mot toutes les 2.6s avec un léger fondu
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % greetings.length)
        setVisible(true)
      }, 220)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  const current = greetings[index]

  return (
    <section className="hero" id="accueil">
      <div className="wrap">
        <div>
          <div className="eyebrow mono hero-eyebrow">
            {t('Agréé', 'Certified')}
          </div>

          <div className="greeting-stage">
            <div className="greeting-word" style={{ opacity: visible ? 1 : 0 }}>
              {current.word}
            </div>
            <div className="greeting-meta">
              <span className="flag">{current.flag}</span>
              <span className="lang-name">{t(current.lang, current.langEn)}</span>
            </div>
          </div>

          <h1>{t('Apprenez à parler le monde, depuis le Cameroun.', 'Learn to speak the world, from Cameroon.')}</h1>
          <p className="hero-lead">
            {t(
              'CFPAL accompagne les apprenants dans l’apprentissage des langues et des compétences professionnelles, avec des formations adaptées aux besoins de chacun. Nous mettons un fort accent sur la qualité, la pratique et le développement des compétences utiles sur le marché du travail.',
              'CFPAL supports learners in language learning and professional skills development through training programs tailored to each person’s needs. We place strong emphasis on quality, practice and the development of skills that are useful in the job market.',
            )}
          </p>

          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary">
              {t('Nous contacter', 'Contact us')}
            </a>
            <a href="#formations" className="btn btn-ghost">
              {t('Découvrir nos programmes', 'Explore our programs')}
            </a>
          </div>

          <div className="stats-bar">
            <div className="stat">
              <b>1000+</b>
              <span>{t('Apprenants formés', 'Learners trained')}</span>
            </div>
            <div className="stat">
              <b>12 {t('ans', 'years')}</b>
              <span>{t("D'expérience", 'Of experience')}</span>
            </div>
            <div className="stat">
              <b>4 {t('langues', 'languages')}</b>
              <span>{t('Enseignées', 'Taught')}</span>
            </div>
            <div className="stat">
              <b>95%</b>
              <span>{t('Taux de réussite', 'Success rate')}</span>
            </div>
          </div>
        </div>

        <div className="hero-side-card">
          <div className="flag-row">
            <span>🇫🇷</span>
            <span>🇬🇧</span>
            <span>�🇪</span>
            <span>🇮🇹</span>
          </div>
          <h4>{t('Conseil personnalisé', 'Personalized guidance')}</h4>
          <p>
            {t(
              'Parlons de vos objectifs, de votre niveau et du programme le plus adapté à votre situation.',
              'Let\'s discuss your goals, your level and the program best suited to your situation.',
            )}
          </p>
          <a href="#contact" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
            {t('Parler à un conseiller', 'Talk to an advisor')}
          </a>
        </div>
      </div>
    </section>
  )
}
