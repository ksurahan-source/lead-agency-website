export default function ProblemSection({ title, body, items }) {
  return (
    <section className="category-section">
      <div className="category-section-head">
        <span>Market Problem</span>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="category-grid two">
        {items.map(([label, description]) => (
          <article className="category-card" key={label}>
            <strong>{label}</strong>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
