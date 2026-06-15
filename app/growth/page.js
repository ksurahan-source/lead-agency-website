import CategoryPageTemplate from '@/components/category/CategoryPageTemplate';
import { categoryPages } from '@/lib/categoryPages';

const page = categoryPages.growth;

export const metadata = {
  title: page.metadata.title,
  description: page.metadata.description,
  alternates: { canonical: '/growth' },
  openGraph: {
    title: page.metadata.title,
    description: page.metadata.description,
    url: 'https://hi-ob.com/growth',
    siteName: 'hi-ob',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: page.metadata.title,
    description: page.metadata.description,
  },
};

export default function GrowthPage() {
  return <CategoryPageTemplate page={page} />;
}
