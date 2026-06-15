import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categoryNavItems, positioningLine } from '@/lib/categoryPages';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import Logo from '@/components/Logo';
import ProblemSection from './ProblemSection';
import ProcessPipeline from './ProcessPipeline';
import PricingCards from './PricingCards';
import FAQBlock from './FAQBlock';
import CTASection from './CTASection';
import CaseStudyBlock from './CaseStudyBlock';

export default function CategoryPageTemplate({ page }) {
  return (
    <main className="category-page">
      <nav className="category-nav">
        <Link href="/" className="cv-brand" aria-label="hiob 홈">
          <Logo height={26} />
        </Link>
        <div className="category-nav-links">
          {categoryNavItems.map((item) => (
            <Link key={item.slug} href={item.href}>{item.navLabel}</Link>
          ))}
        </div>
        <a className="category-nav-cta" href="#diagnosis">{page.primaryCta}</a>
      </nav>

      <section className="category-hero">
        <div className="category-hero-copy">
          <span className="category-eyebrow">{page.eyebrow}</span>
          <h1>{page.h1}</h1>
          <p>{page.sub}</p>
          <div className="category-actions">
            <a className="category-button primary" href="#diagnosis">
              {page.primaryCta} <ArrowRight size={18} />
            </a>
            <a className="category-button secondary" href="#pricing">{page.secondaryCta}</a>
          </div>
        </div>
        <div className="category-hero-panel" aria-label={`${page.title} 진단 패널`}>
          <small>Creative Performance OS</small>
          <strong>{positioningLine}</strong>
          <div className="category-signal-list">
            {page.systemItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <ProblemSection title={page.problemTitle} body={page.problemBody} items={page.problems} />

      <section className="category-section">
        <div className="category-section-head">
          <span>Why It Breaks</span>
          <h2>{page.failureTitle}</h2>
        </div>
        <div className="category-grid three">
          {page.failures.map((failure) => (
            <article className="category-card muted" key={failure}>
              <p>{failure}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="category-section category-explain">
        <div>
          <span className="category-eyebrow">Creative Velocity</span>
          <h2>{page.testingTitle}</h2>
          <p>{page.testingBody}</p>
        </div>
        <div>
          <span className="category-eyebrow">hi-ob</span>
          <h2>{page.systemTitle}</h2>
          <p>{page.systemBody}</p>
          <ul>
            {page.systemItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessPipeline steps={page.process} />
      <CaseStudyBlock />
      <PricingCards items={page.pricing} />
      <FAQBlock items={page.faqs} />
      <CTASection page={page} />

      <MobileStickyCTA label={page.primaryCta} href="#diagnosis" />

      <footer className="category-footer">
        <strong>hi-ob</strong>
        <span>{positioningLine}</span>
        <Link href="/privacy">개인정보 처리방침</Link>
        <Link href="/terms">이용약관</Link>
      </footer>
    </main>
  );
}
