import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import VirtualGallery from '@/components/gallery/VirtualGallery';
import { getMockGalleryItems } from '@/lib/sanity/queries';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // In production, this would fetch from Sanity
  // For now, using mock data
  const galleryItems = getMockGalleryItems(locale);

  return (
    <main>
      <VirtualGallery items={galleryItems} />
    </main>
  );
}
