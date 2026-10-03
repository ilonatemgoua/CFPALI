# CFPAL — Site vitrine (React + Vite)

Version dynamisée de la maquette CFPAL, **100 % front-end**. Aucune fonctionnalité
nécessitant un serveur, une base de données ou un service tiers n'est activée :
tout fonctionne dans le navigateur, sans rien envoyer nulle part.

## Installation

```bash
npm install
npm run dev
```

Puis ouvrez l'URL affichée (en général http://localhost:5173).

Pour générer une version de production :

```bash
npm run build
npm run preview
```

# CFPAL — Site vitrine et boîte de réception administrative

Application React + Vite. Les formulaires de contact et de partenariat enregistrent les messages dans Supabase. L'administration privée est accessible à `/admin`.

## 1. Créer et sécuriser le projet Supabase

1. Créez un projet gratuit sur [supabase.com](https://supabase.com/) et conservez son URL et sa clé publique (anon/publishable key).
2. Dans **SQL Editor**, ouvrez `supabase/messages.sql` et exécutez tout le script. La politique d'accès est déjà configurée pour `ilontemgoua@gmail.com`.
4. Dans **Authentication → Providers → Email**, laissez l'authentification par email activée et désactivez les inscriptions publiques (**Allow new users to sign up**). Les visiteurs du site n'ont pas besoin d'un compte pour envoyer un formulaire.
5. Dans **Authentication → Users**, créez l'unique utilisateur admin avec l'adresse ci-dessus et un mot de passe fort. Confirmez l'adresse dans le tableau de bord si nécessaire. Ne mettez jamais le mot de passe ou la clé `service_role` dans le code du site.

Le script active Row Level Security (RLS) : les visiteurs peuvent uniquement ajouter un message neuf. Seule l'adresse admin configurée peut lire et archiver/restaurer les messages. Aucune politique de suppression n'est accordée.

## 2. Configurer l'application

À la racine du projet, copiez `.env.example` vers `.env.local`, puis renseignez :

- `VITE_SUPABASE_URL` : URL du projet, disponible dans **Project Settings → API**.
- `VITE_SUPABASE_ANON_KEY` : clé publique anon/publishable du même écran. Cette clé est destinée au navigateur ; la sécurité est assurée par RLS.
- `VITE_ADMIN_EMAIL` : `ilontemgoua@gmail.com`, identique à l'adresse autorisée dans le SQL et utilisée pour le compte admin.

Redémarrez le serveur après avoir modifié les variables d'environnement :

```bash
npm install
npm run dev
```

Le formulaire public est sur la page d'accueil. La boîte de réception est sur `http://localhost:5173/admin`.

## 3. Utilisation quotidienne

- Ouvrez `/admin` et connectez-vous avec l'email et le mot de passe de l'utilisateur créé dans Supabase.
- La session d'administration se déconnecte automatiquement après 15 minutes sans activité dans cet onglet. Cette mesure gratuite est appliquée côté navigateur ; elle complète les règles RLS, mais ne remplace pas un délai d'inactivité imposé côté serveur.
- **À traiter** affiche les questions et propositions de partenariat, leurs coordonnées, leur contenu et leur date.
- Après avoir répondu manuellement, choisissez **Archiver — réponse envoyée**. Le message est conservé dans **Archivés** et peut être restauré.
- Les formulaires confirment l'enregistrement seulement après une réponse positive de Supabase. En cas d'erreur, les champs saisis restent présents.

Les messages sont stockés dans la base Supabase ; ils ne déclenchent pas de notification email. L'administrateur doit consulter `/admin` et répondre séparément par téléphone, email ou WhatsApp.

Les insertions anonymes n'ont pas encore de CAPTCHA ni de limitation de débit : pour un site très exposé, ajoutez une protection anti-spam (par exemple Cloudflare Turnstile vérifié côté serveur via une Edge Function) avant la mise en production publique.

## 4. Publication

Configurez ces trois variables `VITE_*` dans les paramètres d'environnement de l'hébergeur avant le build de production. Appliquez le SQL sur le projet Supabase de production. Vérifiez également que l'hébergeur sert `index.html` en fallback pour les routes de l'application, dont `/admin`.

Après changement de variable, reconstruisez et redéployez (`npm run build`). Les variables `VITE_*` sont intégrées au bundle navigateur : elles ne doivent contenir que l'URL, la clé publique Supabase et l'email public de connexion. La clé secrète `service_role` ne doit jamais être utilisée dans cette application.

## Développement local

```bash
npm run dev
npm run build
npm run preview
```

## Ce qui a été rendu dynamique (sans backend)

- **Bascule FR/EN** : contexte React (`src/context/LanguageContext.jsx`), tous les
  textes traduits passent par `t('texte fr', 'texte en')`.
- **Carrousel de salutations** dans le hero, animé en JS (`useEffect` + `setInterval`).
- **Menu mobile** (burger) et **accordéon FAQ** avec vrai état React.
- **Sélecteur de créneaux de rendez-vous** : état local, aucun envoi réel.
- **Test de niveau CECRL** : 7 questions, score calculé entièrement dans le
  navigateur (`src/data/content.js` → `scoreToLevel`), résultat immédiat, **rien
  n'est enregistré**.
- **Formulaires** (inscription, contact, newsletter) : validation côté client,
  confirmation visuelle (toast), mais **aucune donnée n'est envoyée ni stockée**.
- **Chat flottant** : réponses "scriptées" par mots-clés (pas d'IA, pas de service
  de messagerie connecté).
- **Témoignages** en carrousel automatique.

## Fonctionnalités volontairement laissées "à brancher"

Comme demandé, tout ce qui nécessite un backend ou un service tiers a été
désactivé ou remplacé par une version de démonstration. Chaque endroit du code
concerné est marqué par un commentaire `⚠️` avec une explication. Récapitulatif :

| Fonctionnalité | Fichier | État actuel | Pour l'activer |
|---|---|---|---|
| Formulaire d'inscription | `src/components/Enrollment.jsx` | Validation + toast local | Appel `fetch()` vers votre API, ou service comme Formspree/Airtable |
| Formulaire de contact | `src/components/Contact.jsx` | Idem | Idem |
| Newsletter | `src/components/Footer.jsx` | Idem | Mailchimp, Brevo, ou API perso |
| Prise de rendez-vous | `src/components/Enrollment.jsx` | Créneaux figés, pas de vérif. de dispo réelle | API de calendrier + base de données |
| Test de niveau | `src/components/LevelTestModal.jsx` | Calcul du score en local, rien n'est sauvegardé | Ajouter un `POST` du résultat vers votre API si vous voulez le conserver |
| Chat en direct | `src/components/FloatingChat.jsx` | Réponses scriptées (mots-clés) | Brancher un vrai service de chat ou une API IA |
| Paiement Mobile Money | — | Retiré ; les tarifs sont juste informatifs | Intégration Orange Money / MTN MoMo API |
| Espace apprenant | `src/components/Footer.jsx` | Lien désactivé ("Bientôt") | Authentification + base de données |

## Structure du projet

```
src/
  components/       → un composant par section de la page
  context/           → LanguageContext (FR/EN) et ToastContext (confirmations locales)
  data/content.js     → tout le contenu texte/listes, à modifier librement
  index.css           → toute la feuille de style (reprise fidèle de la maquette)
  App.jsx             → assemble les sections dans l'ordre de la page
  main.jsx            → point d'entrée
```

Pour changer un texte, une langue, un tarif, une question FAQ, etc. : modifiez
`src/data/content.js`, pas besoin de toucher au JSX.
