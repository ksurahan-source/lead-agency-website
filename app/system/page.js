import CategoryPageTemplate from '@/components/category/CategoryPageTemplate';
import { categoryPages } from '@/lib/categoryPages';

const page = categoryPages.system;

export const metadata = {
  title: page.metadata.title,
  description: page.metadata.description,
  alternates: { canonical: '/system' },
  openGraph: {
    title: page.metadata.title,
    description: page.metadata.description,
    url: 'https://hi-ob.com/system',
    siteName: 'HI-OP',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: page.metadata.title,
    description: page.metadata.description,
  },
};

export default function SystemPage() {
  return <CategoryPageTemplate page={page} />;
}
