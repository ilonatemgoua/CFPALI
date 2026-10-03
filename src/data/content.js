import accueilImage from '../../accueil.jpeg'
import diplomationImage from '../../diplomation.jpeg'
import reunionImage from '../../reunion.jpeg'
import v1Image from '../../v1.jpeg'
import v2Image from '../../v2.jpeg'
import v3Image from '../../v3.jpeg'
import v4Image from '../../v4.jpeg'
import v5Image from '../../v5.jpeg'
import v6Image from '../../v6.jpeg'
import v7Image from '../../v7.jpeg'
import v8Image from '../../v8.jpeg'
import v9Image from '../../v9.jpeg'

// Toutes les données "statiques" de la maquette regroupées ici.
// Modifie librement ces tableaux/objets pour changer le contenu du site
// sans toucher au JSX des composants.

export const greetings = [
  { word: 'Bonjour', lang: 'Français', langEn: 'French', flag: '🇫🇷' },
  { word: 'Hello', lang: 'Anglais', langEn: 'English', flag: '🇬🇧' },
  { word: 'Guten Tag', lang: 'Allemand', langEn: 'German', flag: '🇩🇪' },
  { word: 'Buongiorno', lang: 'Italien', langEn: 'Italian', flag: '🇮🇹' },
]

export const languages = [
  {
    flag: '🇫🇷',
    name: 'Français',
    nameEn: 'French',
    desc: 'Cours de français général et professionnel, de A1 à C2.',
    descEn: 'General and professional French courses, from A1 to C2.',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
  },
  {
    flag: '🇬🇧',
    name: 'Anglais',
    nameEn: 'English',
    desc: 'Anglais général, professionnel et préparation aux examens.',
    descEn: 'General and professional English, with exam preparation.',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
  },
  {
    flag: '🇩🇪',
    name: 'Allemand',
    nameEn: 'German',
    desc: "Cours de langue allemande, préparation à l'étude et à la mobilité.",
    descEn: 'German courses, with preparation for study and international mobility.',
    levels: ['A1', 'A2', 'B1', 'B2'],
  },
  {
    flag: '🇮🇹',
    name: 'Italien',
    nameEn: 'Italian',
    desc: 'Italien pour le voyage, les affaires et les examens.',
    descEn: 'Italian for travel, business and exams.',
    levels: ['A1', 'A2', 'B1', 'B2'],
  },
]

export const cecrlScale = [
  { code: 'A1', label: 'Débutant', labelEn: 'Beginner', bg: '#1e4f3c' },
  { code: 'A2', label: 'Élémentaire', labelEn: 'Elementary', bg: '#2c6b52' },
  { code: 'B1', label: 'Intermédiaire', labelEn: 'Intermediate', bg: '#3f8a6b' },
  { code: 'B2', label: 'Intermédiaire+', labelEn: 'Upper-intermediate', bg: '#d9a62b' },
  { code: 'C1', label: 'Avancé', labelEn: 'Advanced', bg: '#c17f1e' },
  { code: 'C2', label: 'Maîtrise', labelEn: 'Proficient', bg: '#a83a32' },
]

export const courseFormats = [
  { icon: '👤', title: 'Individuel', titleEn: 'One-to-one', desc: 'Programme sur-mesure, rythme personnel.', descEn: 'A tailored program at your own pace.' },
  { icon: '👥', title: 'Groupe', titleEn: 'Group', desc: 'Cours collectifs et sessions de travail en équipe.', descEn: 'Group classes and collaborative learning sessions.' },
  { icon: '⚡', title: 'Intensif', titleEn: 'Intensive', desc: 'Sessions accélérées pour aller plus vite vers un objectif précis.', descEn: 'Accelerated sessions to help you reach a specific goal faster.' },
  { icon: '🏫', title: 'Présentiel', titleEn: 'In person', desc: 'Formation en salle, dans nos centres et antennes.', descEn: 'Classroom-based training at our centres and branches.' },
]

export const professionalPrograms = [
  { icon: '💻', title: 'Bureautique', titleEn: 'Office skills', desc: 'Maîtrise des outils bureautiques et des usages professionnels.', descEn: 'Build confidence with office software and professional digital tools.' },
  { icon: '📝', title: 'Secrétariat', titleEn: 'Administrative support', desc: 'Formation à la communication, à l’organisation et aux tâches administratives.', descEn: 'Training in communication, organisation and administrative tasks.' },
  { icon: '🖥️', title: 'Informatique', titleEn: 'IT skills', desc: 'Compétences numériques utiles pour le travail et le quotidien professionnel.', descEn: 'Digital skills for work and everyday professional tasks.' },
  { icon: '📘', title: 'Préparation aux examens de langues', titleEn: 'Language exam preparation', desc: 'Coaching ciblé pour les certifications et épreuves de langue.', descEn: 'Focused coaching for language certifications and examinations.' },
]

export const officialTests = [
  { name: 'TOEFL', desc: "Préparation intensive à l'examen d'anglais académique américain.", descEn: 'Intensive preparation for the American academic English exam.' },
  { name: 'IELTS', desc: 'Coaching complet pour les 4 épreuves : écoute, lecture, écriture, oral.', descEn: 'Comprehensive coaching for all four skills: listening, reading, writing and speaking.' },
  { name: 'DELF / DALF', desc: 'Certification officielle de français, tous niveaux A1 à C2.', descEn: 'Official French certification for all levels, from A1 to C2.' },
]

export const schedule = [
  { lang: 'Anglais B1', format: 'Groupe — Présentiel', days: 'Lun / Mer / Ven', time: '17h30 – 19h00', start: '02 sept. 2026' },
  { lang: 'Français A1', format: 'Groupe — Présentiel', days: 'Mar / Jeu', time: '18h00 – 19h30', start: '03 sept. 2026' },
  { lang: 'Allemand A2', format: 'Groupe — Présentiel', days: 'Sur rendez-vous', time: 'Flexible', start: 'Immédiat' },
  { lang: 'Préparation examens', format: 'Intensif — Présentiel', days: 'Lun à Ven', time: '08h00 – 10h00', start: '15 sept. 2026' },
]

export const pricingPlans = [
  {
    title: 'Cours en groupe',
    price: '45 000',
    unit: 'FCFA / mois',
    features: [
      '3 séances par semaine',
      'Groupe de 6 à 10 personnes',
      'Supports de cours inclus',
      'Cours en présentiel',
    ],
    cta: "S'inscrire",
    featured: false,
  },
  {
    title: 'Cours individuel',
    price: '25 000',
    unit: 'FCFA / séance',
    features: [
      'Programme personnalisé',
      'Créneaux flexibles',
      'Suivi de progression détaillé',
      'Formation en présentiel',
    ],
    cta: "S'inscrire",
    featured: true,
    tag: 'Le plus choisi',
  },
  {
    title: 'Formule entreprise',
    price: 'Sur devis',
    unit: '',
    features: [
      'Formation sur site',
      'Programme adapté au secteur',
      "Rapports de progression d'équipe",
      'Facturation entreprise',
    ],
    cta: 'Demander un devis',
    featured: false,
  },
]

export const appointmentSlots = ['09h00', '11h00', '14h00', '15h30', '17h00', '18h30']

export const faqItems = [
  {
    q: 'Puis-je changer de langue en cours de formation ?',
    a: 'Oui, un changement est possible en début de session, sous réserve de disponibilité dans le nouveau groupe.',
  },
  {
    q: 'Les cours en ligne donnent-ils droit à une certification ?',
    a: 'Oui, les cours en ligne suivent le même programme et donnent accès aux mêmes évaluations et certificats internes que le présentiel.',
  },
  {
    q: 'Quels moyens de paiement acceptez-vous ?',
    a: 'Orange Money, MTN Mobile Money, virement bancaire et paiement en espèces à l\u2019accueil.',
  },
  {
    q: 'Proposez-vous des cours pour les enfants ?',
    a: 'Oui, à partir de 7 ans, avec des groupes dédiés et une pédagogie adaptée à leur âge.',
  },
]

export const blogPosts = [
  { cat: 'Accueil', catEn: 'Welcome', title: 'Bienvenue aux nouveaux étudiants en Allemagne', titleEn: 'Welcome to our students heading to Germany', desc: 'Une étape décisive pour la mobilité académique et professionnelle des apprenants CFPAL.', descEn: 'A major step in the academic and professional journeys of CFPAL learners.', image: accueilImage, objectPosition: 'center' },
  { cat: 'Événement', catEn: 'Event', title: 'Réunion d’échanges avec les promoteurs du centre', titleEn: 'Meeting with the centre’s founders', desc: 'Un moment de partage, de réflexion et d’échange autour du développement de CFPAL.', descEn: 'A moment to share ideas and discuss CFPAL’s continued development.', image: reunionImage, objectPosition: 'center' },
  { cat: 'Actualité', catEn: 'News', title: 'Diplomation des apprenants', titleEn: 'Learner graduation ceremony', desc: 'Une belle reconnaissance pour les étudiants qui ont obtenu des résultats positifs dans leur parcours de formation.', descEn: 'Celebrating learners who have achieved excellent results in their training.', image: diplomationImage, objectPosition: 'center 18%' },
]

export const testimonials = [
  { quote: "Grâce à CFPAL, j'ai obtenu mon IELTS du premier coup. Les formateurs sont exigeants mais toujours disponibles.", author: '— Brice T., étudiant, parti au Canada' },
  { quote: "Les cours en ligne m'ont permis de continuer à apprendre l'espagnol malgré mon emploi du temps chargé.", author: '— Carine M., professionnelle' },
  { quote: "Mon fils de 9 ans adore ses cours d'anglais du samedi. L'ambiance est vraiment adaptée aux enfants.", author: '— Paul E., parent d\u2019élève' },
]

export const galleryItems = [
  { key: 'g1', label: 'Photo 1', image: v1Image, orientation: 'portrait' },
  { key: 'g2', label: 'Photo 2', image: v2Image, orientation: 'portrait' },
  { key: 'g3', label: 'Photo 3', image: v3Image, orientation: 'portrait' },
  { key: 'g4', label: 'Photo 4', image: v4Image, orientation: 'portrait' },
  { key: 'g5', label: 'Photo 5', image: v5Image, orientation: 'square' },
  { key: 'g6', label: 'Photo 6', image: v6Image, orientation: 'portrait' },
  { key: 'g7', label: 'Photo 7', image: v7Image, orientation: 'landscape' },
  { key: 'g8', label: 'Photo 8', image: v8Image, orientation: 'portrait' },
  { key: 'g9', label: 'Photo 9', image: v9Image, orientation: 'portrait' },
]

// ---- Test de niveau (calcul 100% côté client, aucune donnée envoyée nulle part) ----
export const levelTestQuestions = [
  {
    q: 'Choose the correct sentence:',
    options: ['She go to school every day.', 'She goes to school every day.', 'She going to school every day.'],
    correct: 1,
  },
  {
    q: "Complete: 'I ___ in Douala since 2018.'",
    options: ['live', 'have lived', 'am living'],
    correct: 1,
  },
  {
    q: "What is the opposite of 'expensive'?",
    options: ['cheap', 'costly', 'rich'],
    correct: 0,
  },
  {
    q: "Choose the correct form: 'If I ___ more time, I would travel more.'",
    options: ['have', 'had', 'will have'],
    correct: 1,
  },
  {
    q: "Which sentence uses the passive voice correctly?",
    options: ['The book was written by her.', 'The book wrote by her.', 'The book has write by her.'],
    correct: 0,
  },
  {
    q: "Select the best synonym for 'crucial':",
    options: ['minor', 'essential', 'random'],
    correct: 1,
  },
  {
    q: "Complete: 'By the time we arrived, the class ___ already ___.'",
    options: ['had / started', 'has / started', 'was / starting'],
    correct: 0,
  },
]

// Barème simple : score/total -> niveau CECRL approximatif
export function scoreToLevel(score, total) {
  const ratio = score / total
  if (ratio >= 0.9) return { code: 'C1', label: 'Avancé' }
  if (ratio >= 0.7) return { code: 'B2', label: 'Intermédiaire+' }
  if (ratio >= 0.5) return { code: 'B1', label: 'Intermédiaire' }
  if (ratio >= 0.3) return { code: 'A2', label: 'Élémentaire' }
  return { code: 'A1', label: 'Débutant' }
}
