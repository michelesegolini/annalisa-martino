// <!-- Digital Architecture & React Development by Michele Segolini -->
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import theme from '@/lib/theme';
import Navigation from '@/components/layout/Navigation';
import Script from 'next/script';
import { Locale, i18nConfig } from '@/lib/constants';
import { GoogleTagManager } from '@next/third-parties/google';
import ContentSquare from '@/components/ContentSquare';



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
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const localeMap: Record<Locale, string> = {
    en: 'en_US',
    it: 'it_IT',
    es: 'es_ES',
    pt: 'pt_PT',
    fr: 'fr_FR',
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://annalisamartino.com');

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Italian fashion designer',
      'haute-couture',
      'luxury fashion',
      'bespoke tailoring',
      'made in Italy',
      'Annalisa Martino',
      'custom fashion',
      'Milan designer',
      'Italian couture',
      'luxury dresses',
      'evening gowns',
      'handcrafted fashion',
      ...(t.raw('keywords').split(', ')),
    ],
    authors: [{ name: 'Annalisa Martino' }],
    creator: 'Annalisa Martino',
    publisher: 'Annalisa Martino',
    metadataBase: new URL(siteUrl),
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
      locale: localeMap[locale as Locale],
      alternateLocale: Object.values(localeMap).filter((l) => l !== localeMap[locale as Locale]),
      url: `https://annalisamartino.com/${locale}`,
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: 'Annalisa Martino',
      images: [
        {
          url: `${siteUrl}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Annalisa Martino',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [`${siteUrl}/opengraph-image.jpg`],
      creator: '@annalisamartinocollection',
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
  if (!i18nConfig.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'seo' });

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
      <ContentSquare />
      <head>
        <meta name="author" content="Michele Segolini - Fullstack React Developer" />

        {/* Structured Data for WebSite (Site Name) */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Annalisa Martino',
              alternateName: 'Annalisa Martino Haute-Couture',
              url: 'https://annalisamartino.com/',
            }),
          }}
        />

        {/* Structured Data for Fashion Designer */}
        <Script
          id="fashion-designer-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FashionDesigner',
              name: 'Annalisa Martino',
              description: t('schemaDescription'),
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://annalisamartino.com',
              image: `${process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://annalisamartino.com')}/opengraph-image.jpg`,
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IT',
                addressLocality: 'Milan',
              },
              sameAs: [
                'https://instagram.com/annalisamartinocollection',
                'https://facebook.com/annalisamartino',
                'https://pinterest.com/annalisamartino',
              ],
              knowsAbout: ['Haute-Couture', 'Haute Couture', 'Bespoke Fashion', 'Italian Fashion', 'Moda Italiana'],
            }),
          }}
        />
      </head>
      <body>
        <Script
          id="developer-signature"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `console.log('%cDigital Architecture & React Development by Michele Segolini', 'color: #fff; font-size: 11px; font-weight: bold; background: #000; padding: 4px 8px; border-radius: 4px;');`
          }}
        />
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

