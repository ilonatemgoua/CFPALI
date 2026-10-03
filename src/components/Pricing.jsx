import { pricingPlans } from '../data/content.js'

export default function Pricing() {
  return (
    <section id="tarifs">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow mono">Tarifs</div>
          <h2>Des formules simples, adaptées à chaque budget.</h2>
          <p>
            Paiement en une fois ou en plusieurs tranches, réglé directement au centre (Mobile Money, Orange
            Money, virement ou espèces). Les modalités de paiement en ligne ne sont pas encore actives sur ce
            site.
          </p>
        </div>
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <div className={`card price-card${plan.featured ? ' featured' : ''}`} key={plan.title}>
              {plan.tag && <span className="tag">{plan.tag}</span>}
              <h4>{plan.title}</h4>
              <div className="price">
                {plan.price} {plan.unit && <small>{plan.unit}</small>}
              </div>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href={plan.title === 'Formule entreprise' ? '#contact' : '#inscription'}
                className={`btn ${plan.featured ? 'btn-gold' : 'btn-ghost'}`}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
