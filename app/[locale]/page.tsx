import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import VirtualGallery from '@/components/gallery/VirtualGallery';
import { getGalleryItems } from '@/lib/sanity/queries';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-dynamic';

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
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch items from Google Sheets
  const galleryItems = await getGalleryItems(locale);

  return (
    <main>
      <VirtualGallery items={galleryItems} />
    </main>
  );
}
