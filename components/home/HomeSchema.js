/**
 * Homepage-only structured data (rendered from app/page.js).
 * FAQPage for rich results. `faqs` is the single source (app/page.js) — no drift.
 *
 * @param {{ faqs: Array<[string, string]> }} props
 */
export default function HomeSchema({ faqs }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://hi-ob.com/#faq',
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
