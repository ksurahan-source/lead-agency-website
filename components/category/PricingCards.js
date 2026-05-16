export default function PricingCards({ items }) {
  return (
    <section className="category-section" id="pricing">
      <div className="category-section-head compact">
        <span>Pricing</span>
        <h2>진입 가격은 명확하게, 확장은 진단 이후에.</h2>
        <p>Kmong 유입과 직접 문의 모두 같은 3단계 구조로 안내합니다.</p>
      </div>
      <div className="category-pricing">
        {items.map((item) => (
          <article className={`category-price-card ${item.badge ? 'featured' : ''}`} key={item.name}>
            {item.badge && <em>{item.badge}</em>}
            <h3>{item.name}</h3>
            <strong>{item.price}</strong>
            <p>{item.description}</p>
            <ul>
              {item.items.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
