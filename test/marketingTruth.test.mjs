import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = (path) => readFileSync(join(ROOT, path), 'utf8');

function javascriptSources(directory) {
  return readdirSync(join(ROOT, directory), { recursive: true })
    .filter((path) => /\.(?:js|jsx|mjs)$/.test(path))
    .map((path) => source(join(directory, path)))
    .join('\n');
}

test('public conversion pages do not present placeholder testimonials as customer proof', () => {
  const sharedComponents = javascriptSources('components');

  for (const path of ['app/page.js', 'app/lead/page.js']) {
    const page = `${source(path)}\n${sharedComponents}`;

    assert.doesNotMatch(
      page,
      /(?:const\s+reviews\s*=|★★★★★|TESTIMONIALS|hp-quotes?|생활용품 셀러|뷰티 브랜드 대표|식품 셀러|패션·잡화 셀러|반려용품 셀러|전자·가전 셀러|교육·학원 원장|병원 마케팅 담당|B2B 솔루션 대표|부동산 분양 마케터|법률·세무 사무소|뷰티·성형 마케터|광고비 날릴까 봐 1년을 미뤘어요|대행사는 매달 고정비가 부담이었는데|메타 광고가 복잡해서 늘 감으로 껐는데|네이버·쿠팡 안에서만 팔다가 정체였는데|광고비를 제 계정에서 직접 집행하니 통제권이 저한테 있어 믿음이 갔어요|릴스 한 편 5만원이라 여러 개 테스트|클릭은 많은데 상담 전화가 안 왔어요|영상·웹사이트라는 자산이 남아서 시작 문턱이 낮았어요|리드 단가가 왜 오르는지 늘 깜깜이였는데|폼만 채우는 가짜 문의에 영업팀이 지쳤었는데|영상 한 편 5만원이라 여러 개 테스트)/i,
      `${path} or a shared component still contains retired testimonial proof`,
    );
  }
});

test('public conversion pages do not render a self-renewing scarcity countdown', () => {
  const sharedComponents = javascriptSources('components');

  for (const path of ['app/page.js', 'app/lead/page.js']) {
    const page = `${source(path)}\n${sharedComponents}`;

    assert.doesNotMatch(
      page,
      /(?:EventCountdown|SLOT_ANCHOR|SLOT_MS|hp-countdown|3일 신청 슬롯|마감 후 다음 슬롯|마감 전 신청|setInterval\s*\(|72\s*\*\s*60\s*\*\s*60)/,
      `${path} or a shared component still contains rotating-scarcity behavior`,
    );
    assert.doesNotMatch(page, /런칭/, `${path} still claims an unverified launch-window offer`);
  }

  assert.equal(
    existsSync(join(ROOT, 'components/EventCountdown.js')),
    false,
    'the reusable rotating-scarcity component must not remain available',
  );
});

test('Meta landing pages do not present placeholder brands and fabricated outcomes as cases', () => {
  const sharedComponents = javascriptSources('components');

  for (const path of ['app/meta/page.js', 'app/m/meta/page.js']) {
    const page = `${source(path)}\n${sharedComponents}`;

    assert.doesNotMatch(
      page,
      /(?:OO 성형외과|XX 패션 브랜드|YY 뷰티 몰|ZZ 교육 플랫폼|AA 건강식품|BB 가구 브랜드|Plastic Surgery Clinic|Fashion Brand|Beauty Mall|EdTech Platform|Health Food Brand|Furniture Brand)/,
      `${path} or a shared component still names placeholder brands`,
    );
    assert.doesNotMatch(
      page,
      /(?:문의 324%|ROAS 580%|ROAS 750%|픽셀 데이터의 40%|매칭률\(EMQ\).*8\.5점|학습 속도가 3배|CPA\)를 65%|CTR이 0\.5%|후킹 포인트.*12종|CTR이 2\.4%|매출 7\.5배|Inquiries \+324%|CPA -45%|CPL -60%|\$140K rev\. in month 1|Conversions ×4|65% CPA Reduction|750% ROAS|40% of pixel data|EMQ score of 8\.5|ML training speed tripled|CPA dropped 65%|CTR.*below 0\.5%|12 hook variations|CTR rose to 2\.4%|revenue 7\.5× ad spend)/,
      `${path} or a shared component still presents retired outcomes`,
    );
    assert.doesNotMatch(page, /SUCCESS CASES|문의가 증명하는 성과/, `${path} still labels examples as proof`);
  }
});

test('marketing documentation does not claim placeholder reviews are visibly labeled', () => {
  const documentation = source('docs/analytics-tagging.md');

  assert.doesNotMatch(documentation, /placeholder reviews|예시 후기/);
});
