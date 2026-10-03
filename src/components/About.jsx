import { useLanguage } from '../context/LanguageContext.jsx'
import campusImage from '../../campus.jpeg'

const VALUES = [
  {
    num: 'Histoire',
    numEn: 'Story',
    title: 'De la salle de quartier au centre agréé',
    titleEn: 'From a local classroom to an accredited centre',
    desc: "Fondé en 2013 par une équipe dynamique de la diaspora, CFPAL est aujourd'hui un centre reconnu, doté de salles équipées pour accompagner les apprenants dans leur parcours.",
    descEn: 'Founded in 2013 by a dedicated team from the diaspora, CFPAL has grown into a recognised centre with equipped classrooms to support learners throughout their journey.',
  },
  {
    num: 'Mission',
    numEn: 'Mission',
    title: 'Rendre les langues accessibles à tous',
    titleEn: 'Making languages accessible to everyone',
    desc: 'Offrir une formation linguistique de qualité, abordable, ouverte aux enfants, aux adultes et aux entreprises.',
    descEn: 'Provide high-quality, affordable language training for children, adults and businesses.',
  },
  {
    num: 'Vision',
    numEn: 'Vision',
    title: 'Devenir une référence en Afrique centrale',
    titleEn: 'Becoming a leading centre in Central Africa',
    desc: 'Faire de CFPAL le centre de référence pour la certification linguistique et la préparation à la mobilité académique et professionnelle.',
    descEn: 'Make CFPAL a leading centre for language certification and preparation for academic and professional mobility.',
  },
  {
    num: 'Valeurs',
    numEn: 'Values',
    title: 'Rigueur, proximité, ouverture',
    titleEn: 'Excellence, personal support and openness',
    desc: 'Un suivi personnalisé de chaque apprenant, une équipe accessible, et un respect du bilinguisme officiel du Cameroun.',
    descEn: 'Personal support for every learner, an approachable team and respect for Cameroon’s official bilingualism.',
  },
]

export default function About() {
  const { t } = useLanguage()
  return (
    <section id="apropos">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow mono">{t('Qui sommes-nous', 'Who we are')}</div>
          <h2>{t('Un centre né à Bafoussam, tourné vers le monde.', 'A centre born in Bafoussam, open to the world.')}</h2>
          <p>
            {t(
              'Depuis 2013, CFPAL accompagne élèves, étudiants, professionnels et entreprises dans l\u2019apprentissage des langues, avec une pédagogie adaptée au contexte camerounais. Le centre principal est situé à Bafoussam, la maison mère, et la structure compte plusieurs antennes à Douala, Yaoundé, Dschang, Bafoussam et Bangangté.',
              'Since 2013, CFPAL has supported students, professionals and companies in language learning, with teaching adapted to the Cameroonian context. The main center is in Bafoussam, the mother house, and the network includes several branches in Douala, Yaoundé, Dschang, Bafoussam and Bangangté.'
            )}
          </p>
        </div>

        <div className="about-grid">
          <div className="value-list">
            {VALUES.map((v) => (
              <div className="value-item" key={v.num}>
                <div className="value-num">{t(v.num, v.numEn)}</div>
                <div>
                  <h4>{t(v.title, v.titleEn)}</h4>
                  <p>{t(v.desc, v.descEn)}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <img
                src={campusImage}
                alt={t('Équipe et campus CFPAL', 'CFPAL team and campus')}
                style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div className="badge-row">
              <div className="badge">
                <span className="dot">🎓</span> {t('3 centres à Douala · 2 à Yaoundé · 1 à Dschang · 1 à Bafoussam · 1 à Bangangté', '3 centres in Douala · 2 in Yaoundé · 1 in Dschang · 1 in Bafoussam · 1 in Bangangté')}
              </div>
              <div className="badge">
                <span className="dot">🌍</span> {t('Maison mère à Bafoussam', 'Head office in Bafoussam')}
              </div>
              <div className="badge">
                <span className="dot">✔</span> {t('Cours de groupe 4–10, intensifs et préparation aux examens', 'Small group classes (4–10 learners), intensive courses and exam preparation')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
