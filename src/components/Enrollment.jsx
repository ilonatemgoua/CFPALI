import { useState } from 'react'
import { appointmentSlots } from '../data/content.js'
import { useToast } from '../context/ToastContext.jsx'
import LevelTestModal from './LevelTestModal.jsx'
import FAQ from './FAQ.jsx'

const EMPTY_FORM = {
  fullName: '',
  phone: '',
  email: '',
  language: 'Français',
  level: 'Débutant (A1)',
  format: 'Individuel',
  message: '',
}

export default function Enrollment() {
  const { pushToast } = useToast()

  // ---- Formulaire de pré-inscription ----
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Le nom est requis.'
    if (!form.phone.trim()) next.phone = 'Le téléphone est requis.'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Email invalide.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    // ⚠️ Pas de backend connecté : la pré-inscription n'est ni envoyée ni stockée.
    // Pour activer l'envoi réel, remplace ce bloc par un appel fetch() vers ton API,
    // ou vers un service tiers (Formspree, Airtable, Google Sheets, etc.)
    pushToast('Pré-inscription prête', `Merci ${form.fullName.split(' ')[0]}, il ne manque plus qu'un backend pour l'envoyer réellement.`)
    setForm(EMPTY_FORM)
    setErrors({})
  }

  // ---- Prise de rendez-vous ----
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState(appointmentSlots[0])

  function confirmAppointment() {
    if (!date) {
      pushToast('Date manquante', 'Choisissez une date avant de confirmer.')
      return
    }
    // ⚠️ Pas de backend : aucune vérification de disponibilité réelle n'est faite ici.
    pushToast('Créneau retenu', `${date} à ${slot} — à confirmer par un formateur une fois le backend branché.`)
  }

  // ---- Test de niveau ----
  const [testOpen, setTestOpen] = useState(false)

  return (
    <section id="inscription" className="alt-bg">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow mono">Passez à l'action</div>
          <h2>Inscrivez-vous ou prenez rendez-vous en quelques clics.</h2>
          <p>Remplissez le formulaire ci-dessous, ou réservez directement un créneau pour un cours d'essai gratuit.</p>
        </div>

        <div className="interactive-grid">
          <form className="card form-card" onSubmit={handleSubmit} noValidate>
            <h4 style={{ marginBottom: 18 }}>Formulaire d'inscription</h4>
            <div className="form-row">
              <div className="field">
                <label>Nom complet</label>
                <input
                  type="text"
                  placeholder="Ex. Aïcha Ngo Bell"
                  className={errors.fullName ? 'invalid' : ''}
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>
              <div className="field">
                <label>Téléphone</label>
                <input
                  type="text"
                  placeholder="+237 6XX XX XX XX"
                  className={errors.phone ? 'invalid' : ''}
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="vous@email.com"
                  className={errors.email ? 'invalid' : ''}
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="field">
                <label>Langue souhaitée</label>
                <select value={form.language} onChange={(e) => updateField('language', e.target.value)}>
                  <option>Français</option>
                  <option>Anglais</option>
                  <option>Allemand</option>
                  <option>Italien</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Niveau estimé</label>
                <select value={form.level} onChange={(e) => updateField('level', e.target.value)}>
                  <option>Débutant (A1)</option>
                  <option>Élémentaire (A2)</option>
                  <option>Intermédiaire (B1–B2)</option>
                  <option>Avancé (C1–C2)</option>
                  <option>Je ne sais pas</option>
                </select>
              </div>
              <div className="field">
                <label>Format préféré</label>
                <select value={form.format} onChange={(e) => updateField('format', e.target.value)}>
                  <option>Individuel</option>
                  <option>Groupe</option>
                  <option>Intensif</option>
                  <option>Présentiel</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="field full">
                <label>Message (optionnel)</label>
                <textarea
                  placeholder="Précisez votre objectif : examen, voyage, travail…"
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Envoyer ma pré-inscription
            </button>
          </form>

          <div className="side-stack">
            <div className="card appt-card">
              <h4 style={{ marginBottom: 4 }}>Prendre rendez-vous</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(23,36,29,0.65)', margin: '0 0 6px' }}>
                Cours d'essai gratuit ou entretien conseil.
              </p>
              <div className="field" style={{ marginTop: 14 }}>
                <label>Date souhaitée</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <p style={{ fontSize: '0.78rem', margin: '14px 0 6px', color: 'rgba(23,36,29,0.6)' }} className="mono">
                Créneaux disponibles
              </p>
              <div className="appt-slots">
                {appointmentSlots.map((s) => (
                  <button key={s} className={s === slot ? 'active' : ''} type="button" onClick={() => setSlot(s)}>
                    {s}
                  </button>
                ))}
              </div>
              <button
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
                onClick={confirmAppointment}
              >
                Confirmer le rendez-vous
              </button>
            </div>

            <div className="card" id="test-niveau">
              <h4 style={{ marginBottom: 6 }}>Test de niveau rapide</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(23,36,29,0.65)', margin: '0 0 14px' }}>
                {levelTestBlurb}
              </p>
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setTestOpen(true)}>
                Commencer le test
              </button>
            </div>
          </div>
        </div>

        <FAQ />
      </div>

      {testOpen && <LevelTestModal onClose={() => setTestOpen(false)} />}
    </section>
  )
}

const levelTestBlurb = '7 questions — environ 3 minutes, résultat immédiat, calculé directement dans votre navigateur.'
