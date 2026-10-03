import { useState } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { submitMessage } from '../utils/messages.js'

const EMPTY = { name: '', email: '', subject: '', message: '' }
const LOCATIONS = [
  { city: 'Douala', branches: ['Makepe', 'Village', 'Bessengue'] },
  { city: 'Yaoundé', branches: ['Entrée Simbock', 'Ekoundoum'] },
  { city: 'Bafoussam', branches: [] },
  { city: 'Dschang', branches: [] },
  { city: 'Bangangté', branches: [] },
]

export default function Contact() {
  const { pushToast } = useToast()
  const { t } = useLanguage()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = t('Le nom est requis.', 'Name is required.')
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
        kind: 'question',
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || null,
        message: form.message.trim(),
      })
      pushToast(t('Message envoyé', 'Message submitted'), t('Votre question a bien été enregistrée. Nous vous répondrons bientôt.', 'Your question has been received. We will get back to you soon.'))
      setForm(EMPTY)
      setErrors({})
    } catch (submissionError) {
      console.error('Question submission failed:', submissionError)
      pushToast(t('Envoi impossible', 'Submission failed'), t('Nous n’avons pas pu enregistrer votre message. Réessayez dans quelques instants.', 'We could not save your message. Please try again in a moment.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="alt-bg">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow mono">{t('Contact', 'Contact')}</div>
          <h2>{t('Une question ? Parlons-en.', 'Have a question? Let’s talk.')}</h2>
        </div>
        <div className="contact-grid">
          <div className="card contact-info-card">
            <div className="contact-line">
              <div className="ic">📍</div>
              <div>
                <h4>{t('Nos centres', 'Our centres')}</h4>
                <div className="location-list">
                  {LOCATIONS.map(({ city, branches }) => (
                    <div key={city} className="location-item">
                      <strong>{city}</strong>
                      {branches.length > 0 && (
                        <div className="location-branches">
                          {branches.map((branch) => <span key={branch}>{branch}</span>)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="contact-line">
              <div className="ic">📞</div>
              <div>
                <h4>{t('Téléphone', 'Phone')}</h4>
                <p><a href="tel:+237689494593">+237 689494593</a></p>
                <p><a href="tel:+4917660367573">+49 176 60367573</a></p>
              </div>
            </div>
            <div className="contact-line">
              <div className="ic">✉️</div>
              <div>
                <h4>{t('Email', 'Email')}</h4>
                <p><a href="mailto:cfpal.ali@gmail.com">cfpal.ali@gmail.com</a></p>
              </div>
            </div>
            <div className="contact-line">
              <div className="ic">🕐</div>
              <div>
                <h4>{t('Horaires', 'Opening hours')}</h4>
                <p>{t('Lun – Ven : 08h00 – 17h00 · Sam : 08h00 – 12h00', 'Mon – Fri: 8:00 am – 5:00 pm · Sat: 8:00 am – 12:00 pm')}</p>
              </div>
            </div>
          </div>

          <form className="card form-card" onSubmit={handleSubmit} noValidate>
            <h4 style={{ marginBottom: 18 }}>{t('Envoyer un message', 'Send us a message')}</h4>
            <div className="form-row">
              <div className="field">
                <label>{t('Nom', 'Name')}</label>
                <input
                  type="text"
                  maxLength={120}
                  placeholder={t('Votre nom', 'Your name')}
                  className={errors.name ? 'invalid' : ''}
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
              <div className="field">
                <label>{t('Email', 'Email')}</label>
                <input
                  type="email"
                  maxLength={254}
                  placeholder={t('vous@email.com', 'you@email.com')}
                  className={errors.email ? 'invalid' : ''}
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="field full">
                <label>{t('Sujet', 'Subject')}</label>
                <input
                  type="text"
                  maxLength={160}
                  placeholder={t('Objet de votre message', 'Message subject')}
                  value={form.subject}
                  onChange={(e) => update('subject', e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field full">
                <label>{t('Message', 'Message')}</label>
                <textarea
                  maxLength={5000}
                  placeholder={t('Écrivez votre message ici…', 'Write your message here…')}
                  className={errors.message ? 'invalid' : ''}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', justifyContent: 'center' }}>
              {submitting ? t('Envoi…', 'Submitting…') : t('Envoyer le message', 'Send message')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
