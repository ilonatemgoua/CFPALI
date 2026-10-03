import { useLanguage } from '../context/LanguageContext.jsx'
import logoImage from '../../Logo.jpeg'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="flogo" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={logoImage} alt="Logo CFPAL" style={{ width: 52, height: 52, objectFit: 'contain', borderRadius: 12 }} />
              <span>CFPAL</span>
            </div>
            <p>
              {t('Centre de Formation Professionnelle et d\'Apprentissage des Langues — Douala, Cameroun. Apprenez, certifiez, avancez.', 'Professional Training and Language Learning Centre — Douala, Cameroon. Learn, certify and move forward.')}
            </p>
            <div className="social-row">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="WhatsApp">📱</a>
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>
          <div>
            <h4>{t('Le centre', 'The centre')}</h4>
            <ul>
              <li><a href="#apropos">{t('À propos', 'About')}</a></li>
              <li><a href="#formations">{t('Formations', 'Programs')}</a></li>
              <li><a href="#actualites">{t('Actualités', 'News')}</a></li>
              <li><a href="#contact">{t('Contact', 'Contact')}</a></li>
            </ul>
          </div>
          <div>
            <h4>{t('Ressources', 'Resources')}</h4>
            <ul>
              <li><a href="#formations">{t('Programmes', 'Programs')}</a></li>
              <li><a href="#actualites">{t('Actualités', 'News')}</a></li>
              <li><a href="#contact">{t('Contact', 'Contact')}</a></li>
              <li><a href="/admin">{t('Administration', 'Administration')}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t('© 2026 CFPAL — Tous droits réservés.', '© 2026 CFPAL — All rights reserved.')}</span>
          <span>{t('Cameroun', 'Cameroon')}</span>
        </div>
      </div>
    </footer>
  )
}
