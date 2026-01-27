export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'it' },
    { locale: 'es' },
    { locale: 'pt' },
    { locale: 'fr' }
  ];
}

export default async function TestPage({ params }) {
  const { locale } = await params;
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Routing Test</h1>
      <p>Locale detected: <strong>{locale}</strong></p>
      <p>Deployment version: {new Date().toISOString()}</p>
    </div>
  );
}
