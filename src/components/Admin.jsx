import { useCallback, useEffect, useState } from 'react'
import { adminEmail, supabase } from '../utils/supabase.js'

const EMPTY_CREDENTIALS = { email: '', password: '' }
const ADMIN_IDLE_TIMEOUT_MS = 15 * 60 * 1000

function formatDate(value) {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function Admin() {
  const [session, setSession] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [credentials, setCredentials] = useState(EMPTY_CREDENTIALS)
  const [messages, setMessages] = useState([])
  const [view, setView] = useState('new')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!supabase) {
      setCheckingSession(false)
      return undefined
    }

    let mounted = true
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!mounted) return
      if (sessionError) setError(sessionError.message)
      setSession(data.session)
      setCheckingSession(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!supabase || !session) return undefined

    let lastActivityAt = Date.now()
    let timeoutId
    let signingOut = false

    const signOutForInactivity = async () => {
      if (signingOut) return
      signingOut = true
      const { error: signOutError } = await supabase.auth.signOut({ scope: 'local' })
      setMessages([])
      setNotice('')
      setError(signOutError
        ? `Inactivité supérieure à 15 minutes. La déconnexion a rencontré une erreur : ${signOutError.message}`
        : 'Déconnexion automatique après 15 minutes sans activité. Veuillez vous reconnecter.')
    }

    const scheduleSignOut = () => {
      window.clearTimeout(timeoutId)
      const remaining = ADMIN_IDLE_TIMEOUT_MS - (Date.now() - lastActivityAt)
      if (remaining <= 0) {
        void signOutForInactivity()
      } else {
        timeoutId = window.setTimeout(() => void signOutForInactivity(), remaining)
      }
    }

    const handleActivity = () => {
      if (Date.now() - lastActivityAt < 1000) return
      lastActivityAt = Date.now()
      scheduleSignOut()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') scheduleSignOut()
    }

    const activityEvents = ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'scroll']
    activityEvents.forEach((eventName) => window.addEventListener(eventName, handleActivity, { passive: true }))
    document.addEventListener('visibilitychange', handleVisibilityChange)
    scheduleSignOut()

    return () => {
      window.clearTimeout(timeoutId)
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, handleActivity))
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [session])

  const loadMessages = useCallback(async () => {
    if (!supabase || !session) return
    setBusy(true)
    setError('')
    const { data, error: queryError } = await supabase
      .from('messages')
      .select('*')
      .eq('status', view)
      .order('created_at', { ascending: false })

    if (queryError) setError(`Impossible de charger les messages : ${queryError.message}`)
    else setMessages(data ?? [])
    setBusy(false)
  }, [session, view])

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  async function handleLogin(event) {
    event.preventDefault()
    setError('')
    setBusy(true)

    if (!supabase) {
      setError('Supabase n’est pas configuré. Complétez le fichier .env.local puis redémarrez le serveur.')
      setBusy(false)
      return
    }
    if (!adminEmail || credentials.email.trim().toLowerCase() !== adminEmail) {
      setError('Cette adresse email ne correspond pas à l’administrateur configuré.')
      setBusy(false)
      return
    }

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: credentials.email.trim(),
      password: credentials.password,
    })

    if (loginError) setError('Connexion refusée. Vérifiez vos identifiants et la configuration Supabase.')
    else if (data.user?.email?.toLowerCase() !== adminEmail) {
      await supabase.auth.signOut()
      setError('Ce compte n’est pas autorisé à accéder à l’administration.')
    } else {
      setCredentials(EMPTY_CREDENTIALS)
      setNotice('Connexion réussie.')
    }
    setBusy(false)
  }

  async function updateMessageStatus(message, status) {
    if (!supabase) return
    setBusy(true)
    setError('')
    const { error: updateError } = await supabase
      .from('messages')
      .update({ status, archived_at: status === 'archived' ? new Date().toISOString() : null })
      .eq('id', message.id)

    if (updateError) setError(`La modification a échoué : ${updateError.message}`)
    else {
      setNotice(status === 'archived' ? 'Message archivé.' : 'Message remis dans les messages à traiter.')
      await loadMessages()
    }
    setBusy(false)
  }

  async function handleSignOut() {
    if (!supabase) return
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) setError(signOutError.message)
    else {
      setMessages([])
      setNotice('Vous êtes déconnecté.')
    }
  }

  if (checkingSession) {
    return <main className="admin-page"><div className="admin-card">Vérification de la session…</div></main>
  }

  if (!supabase) {
    return (
      <main className="admin-page">
        <div className="admin-card">
          <a className="admin-back" href="/">← Retour au site</a>
          <h1>Administration CFPAL</h1>
          <p>La connexion à Supabase n’est pas encore configurée.</p>
          <p>Copiez <strong>.env.example</strong> vers <strong>.env.local</strong>, ajoutez l’URL du projet et la clé publique Supabase, puis redémarrez Vite.</p>
        </div>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="admin-page">
        <form className="admin-card" onSubmit={handleLogin}>
          <a className="admin-back" href="/">← Retour au site</a>
          <div className="eyebrow mono">Espace sécurisé</div>
          <h1>Administration CFPAL</h1>
          <p>Connectez-vous pour consulter et gérer les messages reçus.</p>
          <label className="admin-label" htmlFor="admin-email">Adresse email administrateur</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            required
            value={credentials.email}
            onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))}
          />
          <label className="admin-label" htmlFor="admin-password">Mot de passe</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={credentials.password}
            onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
          />
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={busy}>
            {busy ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="admin-page admin-inbox-page">
      <div className="admin-inbox">
        <header className="admin-toolbar">
          <div>
            <a className="admin-back" href="/">← Retour au site</a>
            <div className="eyebrow mono">Espace sécurisé</div>
            <h1>Messages reçus</h1>
            <p>Connecté en tant que {session.user.email}</p>
          </div>
          <button className="btn btn-ghost" type="button" onClick={handleSignOut}>Se déconnecter</button>
        </header>

        <div className="admin-tabs" role="tablist" aria-label="Filtrer les messages">
          <button className={view === 'new' ? 'active' : ''} type="button" onClick={() => setView('new')}>
            À traiter
          </button>
          <button className={view === 'archived' ? 'active' : ''} type="button" onClick={() => setView('archived')}>
            Archivés
          </button>
          <button className="admin-refresh" type="button" onClick={loadMessages} disabled={busy}>Actualiser</button>
        </div>

        {notice && <p className="admin-notice" role="status">{notice}</p>}
        {error && <p className="admin-error" role="alert">{error}</p>}
        {busy && <p>Chargement…</p>}
        {!busy && messages.length === 0 && <div className="admin-empty">Aucun message dans cette liste.</div>}

        <div className="admin-messages">
          {messages.map((message) => (
            <article className="admin-message" key={message.id}>
              <div className="admin-message-header">
                <div>
                  <span className={`admin-kind ${message.kind}`}>
                    {message.kind === 'partnership' ? 'Partenariat' : 'Question'}
                  </span>
                  <h2>{message.subject || (message.kind === 'partnership' ? message.company : 'Question sans sujet')}</h2>
                </div>
                <time dateTime={message.created_at}>{formatDate(message.created_at)}</time>
              </div>
              <dl className="admin-contact-details">
                <div><dt>Nom / contact</dt><dd>{message.name}</dd></div>
                <div><dt>Email</dt><dd><a href={`mailto:${message.email}`}>{message.email}</a></dd></div>
                {message.phone && <div><dt>Téléphone</dt><dd><a href={`tel:${message.phone}`}>{message.phone}</a></dd></div>}
                {message.company && <div><dt>Entreprise</dt><dd>{message.company}</dd></div>}
                {message.sector && <div><dt>Secteur</dt><dd>{message.sector}</dd></div>}
              </dl>
              <p className="admin-message-body">{message.message}</p>
              <button
                className="btn btn-ghost"
                type="button"
                disabled={busy}
                onClick={() => updateMessageStatus(message, view === 'new' ? 'archived' : 'new')}
              >
                {view === 'new' ? 'Archiver — réponse envoyée' : 'Remettre à traiter'}
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}