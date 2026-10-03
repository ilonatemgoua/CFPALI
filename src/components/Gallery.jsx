import { galleryItems } from '../data/content.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Gallery() {
  const { t } = useLanguage()
  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow mono">{t('Galerie', 'Gallery')}</div>
          <h2>{t('La vie au centre, en images.', 'Life at the centre, in pictures.')}</h2>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((g) => (
            <div
              className={`gallery-card ${g.orientation}`} 
              key={g.key}
              style={{ overflow: 'hidden', background: '#ddd' }}
            >
              <img src={g.image} alt={t(g.label, `Photo ${g.key.slice(1)}`)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
