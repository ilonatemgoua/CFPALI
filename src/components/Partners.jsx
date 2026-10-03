import { useState } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { submitMessage } from '../utils/messages.js'

const EMPTY = {
  company: '',
  contact: '',
  email: '',
  phone: '',
  sector: '',
  message: ''
}

const PARTNERS = [
  'TestDaf',
  'Cura',
  'TELC',
  'CALFOP',
  'Centre hospitalier Sainte Louise',
  'Caro Voyage Services',
  'Goethe Institut',
  'ÖSD',
  'Stadt Lüchow'
]

export default function Partners() {
  const { pushToast } = useToast()
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.company.trim()) next.company = t('Le nom de l’entreprise est requis.', 'Company name is required.')
    if (!form.contact.trim()) next.contact = t('Le contact est requis.', 'Contact name is required.')
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = t('Email invalide.', 'Please enter a valid email address.')
    if (!form.message.trim()) next.message = t('Le message est requis.', 'A message is required.')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      await submitMessage({
        kind: 'partnership',
        name: form.contact.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        company: form.company.trim(),
        sector: form.sector.trim() || null,
        message: form.message.trim(),
      })
      pushToast(t('Demande envoyée', 'Application submitted'), t('Votre demande de partenariat a bien été enregistrée. Nous vous recontacterons prochainement.', 'Your partnership application has been received. We will get back to you soon.'))
      setForm(EMPTY)
      setErrors({})
      setOpen(false)
    } catch (submissionError) {
      console.error('Partnership submission failed:', submissionError)
      pushToast(t('Envoi impossible', 'Submission failed'), t('Nous n’avons pas pu enregistrer votre demande. Réessayez dans quelques instants.', 'We could not save your application. Please try again in a moment.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="partenaires" className="alt-bg">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow mono">{t('Partenaires', 'Partners')}</div>
          <h2>{t('Un réseau de collaboration au service de l’excellence.', 'A collaborative network committed to excellence.')}</h2>
          <p>
            {t('Nous bâtissons des alliances solides avec des établissements, entreprises et structures engagées dans le développement des compétences linguistiques et la mobilité internationale.', 'We build strong partnerships with institutions, businesses and organisations committed to language development and international mobility.')}
          </p>
        </div>

        <div className="pricing-grid" style={{ marginBottom: 30 }}>
          {PARTNERS.map((partner) => (
            <div className="card price-card" key={partner}>
              <h4 style={{ margin: 0 }}>{partner}</h4>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: '28px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <div className="mono" style={{ color: '#d62d2d', marginBottom: 8 }}>{t('Rejoignez le clan', 'Join our network')}</div>
              <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>{t('Devenez partenaire CFPAL', 'Become a CFPAL partner')}</h3>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
              {t('Rejoindre le clan des partenaires', 'Join our partner network')}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setOpen(false)} aria-label={t('Fermer', 'Close')}>
              ×
            </button>
            <div className="mono" style={{ color: '#d62d2d', marginBottom: 8 }}>{t('Partenariat', 'Partnership')}</div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', marginBottom: 12 }}>{t('Rejoindre le clan des partenaires', 'Join our partner network')}</h3>
            <p style={{ margin: '0 0 20px', color: 'rgba(23,36,29,0.72)' }}>
              {t('Déposez votre candidature et nous vous répondrons dans les meilleurs délais.', 'Submit your application and we will respond as soon as possible.')}
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label>{t('Entreprise', 'Company')}</label>
                  <input
                    type="text"
                    maxLength={160}
                    value={form.company}
                    className={errors.company ? 'invalid' : ''}
                    onChange={(e) => update('company', e.target.value)}
                    placeholder={t('Nom de l’entreprise', 'Company name')}
                  />
                  {errors.company && <span className="error-text">{errors.company}</span>}
                </div>
                <div className="field">
                  <label>{t('Contact', 'Contact person')}</label>
                  <input
                    type="text"
                    maxLength={120}
                    value={form.contact}
                    className={errors.contact ? 'invalid' : ''}
                    onChange={(e) => update('contact', e.target.value)}
                    placeholder={t('Nom du contact', 'Contact name')}
                  />
                  {errors.contact && <span className="error-text">{errors.contact}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>{t('Email', 'Email')}</label>
                  <input
                    type="email"
                    maxLength={254}
                    value={form.email}
                    className={errors.email ? 'invalid' : ''}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="contact@entreprise.com"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <div className="field">
                  <label>{t('Téléphone', 'Phone')}</label>
                  <input
                    type="tel"
                    maxLength={40}
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+237 ..."
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field full">
                  <label>{t('Secteur', 'Sector')}</label>
                  <input
                    type="text"
                    maxLength={120}
                    value={form.sector}
                    onChange={(e) => update('sector', e.target.value)}
                    placeholder={t('Éducation, entreprise, mobilité, etc.', 'Education, business, mobility, etc.')}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field full">
                  <label>{t('Message', 'Message')}</label>
                  <textarea
                    maxLength={5000}
                    value={form.message}
                    className={errors.message ? 'invalid' : ''}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder={t('Décrivez votre projet de partenariat...', 'Tell us about your partnership project...')}
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', justifyContent: 'center' }}>
                {submitting ? t('Envoi…', 'Submitting…') : t('Envoyer la demande', 'Submit application')}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
