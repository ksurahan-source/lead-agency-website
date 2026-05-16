import CreativeVelocityForm from '@/components/CreativeVelocityForm';
import { positioningLine } from '@/lib/categoryPages';

export default function CTASection({ page }) {
  return (
    <section className="category-section category-final-cta" id="diagnosis">
      <div>
        <span className="category-eyebrow">Diagnosis</span>
        <h2>광고 운영보다 먼저, 소재 병목부터 진단하세요.</h2>
        <p>{positioningLine}</p>
        <p className="category-final-note">
          월 광고비, 소재 제작량, 내부 촬영 가능 여부를 기준으로 {page.title} 병목을 먼저 확인합니다.
        </p>
      </div>
      <CreativeVelocityForm
        source={`category_${page.slug}`}
        eyebrow={`${page.title} 진단`}
        title={`${page.title} 병목 진단 신청`}
        description={page.sub}
        submitLabel={page.primaryCta}
        successTitle={`${page.title} 진단 신청이 접수되었습니다.`}
      />
    </section>
  );
}
