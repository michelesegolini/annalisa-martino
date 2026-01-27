import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import VirtualGallery from '@/components/gallery/VirtualGallery';
import { getGalleryItems } from '@/lib/sanity/queries';
import { i18nConfig, Locale } from '@/i18n/config';

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!i18nConfig.locales.includes(locale as Locale)) {
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
