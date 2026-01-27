import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import theme from '@/lib/theme';
import { routing } from '@/i18n/routing';
import Navigation from '@/components/layout/Navigation';
import "../../styles/globals.css";

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const localeMap: Record<string, string> = {
    en: 'en_US',
    it: 'it_IT',
    es: 'es_ES',
    pt: 'pt_PT',
    fr: 'fr_FR',
  };

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Italian fashion designer',
      'demi-couture',
      'luxury fashion',
      'bespoke tailoring',
      'made in Italy',
      'Annalisa Martino',
      'haute couture',
      'custom fashion',
      'Milan designer',
      'Italian couture',
      'luxury dresses',
      'evening gowns',
      'handcrafted fashion',
    ],
    authors: [{ name: 'Annalisa Martino' }],
    creator: 'Annalisa Martino',
    publisher: 'Annalisa Martino',
    metadataBase: new URL('https://annalisamartino.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en-US': '/en',
        'it-IT': '/it',
        'es-ES': '/es',
        'pt-PT': '/pt',
        'fr-FR': '/fr',
      },
    },
    openGraph: {
      type: 'website',
      locale: localeMap[locale] || 'it_IT',
      alternateLocale: Object.values(localeMap).filter((l) => l !== localeMap[locale]),
      url: `https://annalisamartino.com/${locale}`,
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: 'Annalisa Martino',
      images: [
        {
          url: 'https://placehold.co/1200x630.png?text=Annalisa+Martino',
          width: 1200,
          height: 630,
          alt: 'Annalisa Martino Fashion Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['https://placehold.co/1200x630.png?text=Annalisa+Martino'],
      creator: '@annalisamartino',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'seo' });

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* Structured Data for Fashion Designer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FashionDesigner',
              name: 'Annalisa Martino',
              description: t('schemaDescription'),
              url: 'https://annalisamartino.com',
              image: 'https://placehold.co/1200x630.png?text=Annalisa+Martino',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IT',
                addressLocality: 'Milan',
              },
              sameAs: [
                'https://instagram.com/annalisamartino',
                'https://facebook.com/annalisamartino',
                'https://pinterest.com/annalisamartino',
              ],
              knowsAbout: ['Demi-Couture', 'Haute Couture', 'Bespoke Fashion', 'Italian Fashion'],
            }),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Navigation />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

