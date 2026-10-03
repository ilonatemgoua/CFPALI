import { useState } from 'react'
import { faqItems } from '../data/content.js'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div style={{ marginTop: 56 }}>
      <h4 style={{ marginBottom: 18 }}>Questions fréquentes</h4>
      <div className="card" style={{ padding: '6px 26px' }}>
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div className={`faq-item${isOpen ? ' open' : ''}`} key={item.q}>
              <button className="faq-q" onClick={() => setOpenIndex(isOpen ? -1 : i)}>
                {item.q} <span className="plus">+</span>
              </button>
              <div className="faq-a" style={{ maxHeight: isOpen ? 240 : 0 }}>
                <p>{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
