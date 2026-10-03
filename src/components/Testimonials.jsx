import { useEffect, useState } from 'react'
import { testimonials } from '../data/content.js'

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="alt-bg">
      <div className="wrap">
        <div className="section-head" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
          <div className="eyebrow mono" style={{ justifyContent: 'center' }}>
            Témoignages
          </div>
          <h2>Ce que disent nos anciens apprenants.</h2>
        </div>
        <div className="testi-wrap">
          {testimonials.map((testi, i) => (
            <div className={`testi-slide${i === index ? ' active' : ''}`} key={testi.author}>
              <p>« {testi.quote} »</p>
              <div className="testi-author">{testi.author}</div>
            </div>
          ))}
          <div className="testi-dots">
            {testimonials.map((testi, i) => (
              <button
                key={testi.author}
                className={i === index ? 'active' : ''}
                aria-label={`Témoignage ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
