import { blogPosts } from '../data/content.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function News() {
  const { t } = useLanguage()
  return (
    <section id="actualites">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow mono">{t('Actualités', 'News')}</div>
          <h2>{t('Conseils, événements et vie du centre.', 'Insights, events and life at the centre.')}</h2>
        </div>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div className="card blog-card" key={post.title}>
              <div className="blog-thumb">
                <img
                  src={post.image}
                  alt={t(post.title, post.titleEn)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: post.objectPosition || 'center', display: 'block' }}
                />
              </div>
              <div className="blog-body">
                <span className="blog-cat">{t(post.cat, post.catEn)}</span>
                <h4>{t(post.title, post.titleEn)}</h4>
                <p>{t(post.desc, post.descEn)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
