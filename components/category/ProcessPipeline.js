export default function ProcessPipeline({ steps }) {
  return (
    <section className="category-section">
      <div className="category-section-head compact">
        <span>Process</span>
        <h2>진단에서 운영 구조까지 이어지는 흐름</h2>
      </div>
      <div className="category-process" aria-label="hi-ob 프로세스">
        {steps.map((step, index) => (
          <div className="category-process-step" key={step}>
            <small>{String(index + 1).padStart(2, '0')}</small>
            <b>{step}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
