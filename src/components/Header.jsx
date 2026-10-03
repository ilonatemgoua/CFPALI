import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import logoImage from '../../Logo.jpeg'

const NAV_LINKS = [
  { href: '#apropos', fr: 'À propos', en: 'About' },
  { href: '#formations', fr: 'Formations', en: 'Programs' },
  { href: '#partenaires', fr: 'Partenaires', en: 'Partners' },
  { href: '#actualites', fr: 'Actualités', en: 'News' },
  { href: '#contact', fr: 'Contact', en: 'Contact' },
]

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <header>
      <nav className="wrap">
        <div className="logo" aria-label={t('Logo CFPAL', 'CFPAL logo')} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={logoImage} alt={t('Logo CFPAL', 'CFPAL logo')} style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 14 }} />
          <div>
            <div style={{ fontSize: '1.2rem', lineHeight: 1.2 }}>CFPAL</div>
            <small>{t('Centre de Langues — Cameroun', 'Language Center — Cameroon')}</small>
          </div>
        </div>

        <div className={`navlinks${open ? ' open' : ''}`} id="navlinks">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {t(link.fr, link.en)}
            </a>
          ))}
          <a className="nav-admin-mobile" href="/admin" onClick={() => setOpen(false)}>
            {t('Administration', 'Admin')}
          </a>
        </div>

        <div className="nav-cta">
          <div className="lang-toggle">
            <button className={lang === 'fr' ? 'active' : ''} onClick={() => setLang('fr')}>
              FR
            </button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>
              EN
            </button>
          </div>
          <a href="#contact" className="btn btn-primary">
            {t('Nous contacter', 'Contact us')}
          </a>
          <a className="nav-admin" href="/admin">
            {t('Administration', 'Admin')}
          </a>
          <button className="burger" aria-label={t('Menu', 'Menu')} onClick={() => setOpen((o) => !o)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  )
}
