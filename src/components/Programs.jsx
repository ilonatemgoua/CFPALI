import { languages, cecrlScale, courseFormats, professionalPrograms, officialTests } from '../data/content.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Programs() {
  const { t } = useLanguage()
  return (
    <section id="formations" className="alt-bg">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow mono">{t('Nos formations', 'Our programs')}</div>
          <h2>{t('Des formations en langues et en compétences professionnelles.', 'Language and professional skills training.')}</h2>
          <p>{t('Des parcours adaptés à vos besoins, qu’il s’agisse d’apprendre une langue, de renforcer votre profil professionnel ou de vous préparer à un examen.', 'Programs tailored to your needs, whether you want to learn a language, strengthen your professional profile or prepare for an exam.')}</p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <h4 style={{ marginBottom: 20 }}>{t('Langues', 'Languages')}</h4>
          <div className="lang-grid">
            {languages.map((l) => (
              <div className="card lang-card" key={l.name}>
                <span className="flag">{l.flag}</span>
                <h4>{t(l.name, l.nameEn)}</h4>
                <p>{t(l.desc, l.descEn)}</p>
                <div className="cecrl">
                  {l.levels.map((lvl) => (
                    <span key={lvl}>{lvl}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 56 }}>
          <h4 style={{ marginBottom: 20 }}>{t('Formations professionnelles', 'Professional training')}</h4>
          <div className="lang-grid">
            {professionalPrograms.map((program) => (
              <div className="card lang-card" key={program.title}>
                <span className="flag">{program.icon}</span>
                <h4>{t(program.title, program.titleEn)}</h4>
                <p>{t(program.desc, program.descEn)}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 56 }}>
          <h4 style={{ marginBottom: 6 }}>{t('Niveaux CECRL', 'CEFR levels')}</h4>
          <p style={{ color: 'rgba(23,36,29,0.65)', fontSize: '0.9rem', marginBottom: 0 }}>
            {t('Chaque parcours suit le Cadre européen commun de référence pour les langues.', 'Each program follows the Common European Framework of Reference for Languages.')}
          </p>
          <div className="cecrl-scale">
            {cecrlScale.map((lvl) => (
              <div style={{ background: lvl.bg }} key={lvl.code}>
                {lvl.code}
                <small>{t(lvl.label, lvl.labelEn)}</small>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 56 }}>
          <h4 style={{ marginBottom: 20 }}>{t('Formats de cours', 'Course formats')}</h4>
          <div className="type-grid">
            {courseFormats.map((f) => (
              <div className="card type-card" key={f.title}>
                <div className="type-icon">{f.icon}</div>
                <div>
                  <h4>{t(f.title, f.titleEn)}</h4>
                  <p>{t(f.desc, f.descEn)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 56 }}>
          <h4 style={{ marginBottom: 20 }}>{t('Préparation aux tests officiels', 'Official exam preparation')}</h4>
          <div className="test-row">
            {officialTests.map((test) => (
              <div className="card test-card" key={test.name}>
                <h4>{test.name}</h4>
                <p>{t(test.desc, test.descEn)}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
