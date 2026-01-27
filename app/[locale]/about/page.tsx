import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, Link } from '@/i18n/routing';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import type { Metadata } from 'next';
import Image from 'next/image';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AboutPage({
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

  const t = await getTranslations({ locale, namespace: 'about' });

  const craftPoints = [
    {
      title: t('craftsmanship.point1.title'),
      description: t('craftsmanship.point1.description'),
    },
    {
      title: t('craftsmanship.point2.title'),
      description: t('craftsmanship.point2.description'),
    },
    {
      title: t('craftsmanship.point3.title'),
      description: t('craftsmanship.point3.description'),
    },
    {
      title: t('craftsmanship.point4.title'),
      description: t('craftsmanship.point4.description'),
    },
  ];

  return (
    <Box
      component="main"
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        pb: 8,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '70vh', md: '80vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.8) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Image
          src="/annalisa-martino.jpg"
          alt="Annalisa Martino"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            px: { xs: 3, md: 6 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: 'primary.main',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
              animation: 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            }}
          >
            {t('hero.title')}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: 'text.primary',
              fontFamily: 'Inter',
              fontWeight: 300,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontSize: { xs: '0.9rem', md: '1.2rem' },
              animation: 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both',
            }}
          >
            {t('hero.subtitle')}
          </Typography>
        </Container>
      </Box>

      {/* Biography Section */}
      <Container
        maxWidth="md"
        sx={{
          mt: { xs: 6, md: 10 },
          px: { xs: 3, md: 6 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'primary.main',
            mb: 4,
            textAlign: 'center',
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          {t('biography.title')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            lineHeight: 2,
            fontSize: { xs: '1rem', md: '1.125rem' },
            whiteSpace: 'pre-line',
            textAlign: 'justify',
          }}
        >
          {t('biography.content')}
        </Typography>
      </Container>

      {/* Philosophy Section */}
      <Container
        maxWidth="md"
        sx={{
          mt: { xs: 8, md: 12 },
          px: { xs: 3, md: 6 },
        }}
      >
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 1,
            position: 'relative',
            overflow: 'hidden',
            background: 'rgba(26, 26, 26, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              height: '100%',
              background: 'linear-gradient(180deg, #D4AF37 0%, #B8941F 100%)',
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: 'primary.main',
              mb: 3,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
            }}
          >
            {t('philosophy.title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              lineHeight: 2,
              fontSize: { xs: '1rem', md: '1.125rem' },
              mb: 4,
            }}
          >
            {t('philosophy.content')}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: 'text.secondary',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              lineHeight: 1.8,
              pl: 3,
              borderLeft: '2px solid',
              borderColor: 'primary.main',
            }}
          >
            &quot;{t('philosophy.quote')}&quot;
          </Typography>
        </Box>
      </Container>

      {/* Craftsmanship Section */}
      <Container
        maxWidth="lg"
        sx={{
          mt: { xs: 8, md: 12 },
          px: { xs: 3, md: 6 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'primary.main',
            mb: 6,
            textAlign: 'center',
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          {t('craftsmanship.title')}
        </Typography>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {craftPoints.map((point, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index} component="div">
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'default',
                  background: 'rgba(26, 26, 26, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(212, 175, 55, 0.2)',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: 'primary.main',
                      mb: 2,
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                    }}
                  >
                    {point.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      lineHeight: 1.8,
                      fontSize: { xs: '0.95rem', md: '1rem' },
                    }}
                  >
                    {point.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Container
        maxWidth="md"
        sx={{
          mt: { xs: 8, md: 12 },
          px: { xs: 3, md: 6 },
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'text.primary',
            mb: 4,
            fontSize: { xs: '1.75rem', md: '2.25rem' },
          }}
        >
          {t('cta.title')}
        </Typography>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontSize: { xs: '0.9rem', md: '1rem' },
            }}
          >
            {t('cta.button')}
          </Button>
        </Link>
      </Container>
    </Box>
  );
}
