import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { CFPAL_WHATSAPP_NUMBER } from '../utils/whatsapp.js'

const INITIAL_MESSAGE = {
  from: 'bot',
  text: 'Bonjour 👋 Je peux vous renseigner sur nos langues et nos programmes. Que souhaitez-vous savoir ?',
}

// Petit assistant "scripté" 100% front-end : il répond à quelques mots-clés.
// Aucune donnée n'est envoyée à un serveur — pour un vrai chatbot IA,
// il faudra brancher un backend (ou l'API Anthropic) ici.
function scriptedReply(userText, lang) {
  const text = userText.toLowerCase()
  if (text.includes('tarif') || text.includes('prix') || text.includes('coût') || text.includes('price') || text.includes('cost') || text.includes('fee')) {
    return lang === 'fr'
      ? 'Nous pouvons vous proposer le programme le plus adapté à vos objectifs et votre budget. Contactez-nous pour un devis personnalisé.'
      : 'We can recommend the program best suited to your goals and budget. Contact us for a personalised quote.'
  }
  if (text.includes('anglais') || text.includes('english')) return lang === 'fr'
    ? "Nous proposons l'anglais général, professionnel, et la préparation TOEFL/IELTS, du A1 au C2."
    : 'We offer general and professional English courses, as well as TOEFL/IELTS preparation from A1 to C2.'
  if (text.includes('inscription') || text.includes('inscrire') || text.includes('enrol') || text.includes('enroll') || text.includes('registration')) {
    return lang === 'fr'
      ? 'Pour toute inscription, nous vous invitons à nous contacter directement via le formulaire de contact ou WhatsApp.'
      : 'To enrol, please contact us directly through the contact form or WhatsApp.'
  }
  if (text.includes('horaire') || text.includes('heure') || text.includes('opening') || text.includes('hour')) {
    return lang === 'fr'
      ? 'Nous sommes ouverts du lundi au vendredi de 8h à 17h, et le samedi de 8h à 12h.'
      : 'We are open Monday to Friday from 8 am to 5 pm, and Saturday from 8 am to 12 pm.'
  }
  if (text.includes('niveau') || text.includes('test') || text.includes('level')) {
    return lang === 'fr'
      ? 'Nous pouvons vous orienter selon votre niveau actuel et vous proposer le bon programme. Contactez-nous pour un conseil personnalisé.'
      : 'We can assess your current level and recommend the right program. Contact us for personalised guidance.'
  }
  return lang === 'fr'
    ? "Merci pour votre message ! Un conseiller CFPAL vous répondra bientôt. En attendant, vous pouvez aussi nous écrire sur WhatsApp."
    : 'Thank you for your message! A CFPAL advisor will get back to you soon. You can also reach us on WhatsApp.'
}

export default function FloatingChat() {
  const { lang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', text: t(INITIAL_MESSAGE.text, 'Hello 👋 I can help you with our languages and programs. What would you like to know?') }])
  const [draft, setDraft] = useState('')

  function send(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    const userMsg = { from: 'user', text }
    const botMsg = { from: 'bot', text: scriptedReply(text, lang) }
    setMessages((m) => [...m, userMsg, botMsg])
    setDraft('')
  }

  return (
    <>
      <div className="floating-stack">
        <button className="fbtn chat" onClick={() => setOpen((o) => !o)} aria-label={t('Ouvrir le chat', 'Open chat')}>
          💬
        </button>
        <a className="fbtn whatsapp" href={`https://wa.me/${CFPAL_WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
          ✆
        </a>
      </div>

      <div className={`chat-panel${open ? ' open' : ''}`}>
        <div className="chat-head">
          {t('Assistant CFPAL', 'CFPAL Assistant')}
          <span>{t('Réponses automatiques — démo sans backend', 'Automated replies — demo, no backend')}</span>
        </div>
        <div className="chat-body">
          {messages.map((m, i) => (
            <div className={`chat-bubble${m.from === 'user' ? ' user' : ''}`} key={i}>
              {i === 0
                ? t(INITIAL_MESSAGE.text, 'Hello 👋 I can help you with our languages and programs. What would you like to know?')
                : m.text}
            </div>
          ))}
        </div>
        <form className="chat-foot" onSubmit={send}>
          <input
            type="text"
            placeholder={t('Écrivez votre question…', 'Type your question…')}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button type="submit">➤</button>
        </form>
      </div>
    </>
  )
}
