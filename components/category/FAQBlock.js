export default function FAQBlock({ items }) {
  return (
    <section className="category-section">
      <div className="category-section-head compact">
        <span>FAQ</span>
        <h2>상담 전 자주 나오는 질문</h2>
      </div>
      <div className="category-faq">
        {items.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
