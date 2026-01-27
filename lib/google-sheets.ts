import Papa from 'papaparse';
import { GalleryItem } from '@/types';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1NpLpI74uK1f2VjhZya1Jezuwq73Rw2CrpA2Q4-NJkfI/export?format=csv&gid=0';

// High-Fashion & Runway placeholder images (Verified Stable)
// Note: If any fail, the UI onError handler should fallback to a local default or color.
const PLACEHOLDER_IMAGES = [
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80', // High fashion black dress
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', // Elegant Model
    'https://images.unsplash.com/photo-1529139574466-a302d27f60d2?w=800&q=80', // Warm light Fashion
    'https://images.unsplash.com/photo-1550614000-4b9519e09d96?w=800&q=80', // Dark moody
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80', // Portrait
    'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&q=80', // Editorial White
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80', // Street Runway
    'https://images.unsplash.com/photo-1581044777550-9942a4c2e22c?w=800&q=80', // Fashion Week Blur
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', // Couture
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80', // Show vibe
    'https://images.unsplash.com/photo-1566206091558-1f4d1677938e?w=800&q=80', // Model close up
    'https://images.unsplash.com/photo-1500902854378-07e86e58aa89?w=800&q=80', // Backstage
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80', // Red
    'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=800&q=80', // Blue
    'https://images.unsplash.com/photo-1550614000-4886e342750e?w=800&q=80', // Red light
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80', // Detail
    'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80', // Pink
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80', // Clothes rack
];

// Placeholder videos (High Fashion / Runway)
// Using reliable sources (Pixabay/Pexels)
const PLACEHOLDER_VIDEOS: string[] = [
    // Fashion runway / model clips
    'https://cdn.pixabay.com/video/2024/02/09/200049-911669480_large.mp4', // Fashion shoot
    'https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4', // Model posing
    'https://cdn.pixabay.com/video/2020/05/25/40149-425296562_large.mp4', // Slow motion fashion
    'https://cdn.pixabay.com/video/2021/04/12/70830-536066266_large.mp4', // Catwalk vibe
];


// Elegant fashion descriptions by locale
const PLACEHOLDER_DESCRIPTIONS_BY_LOCALE: Record<string, string[]> = {
    en: [
        "A masterpiece of design, crafted with the finest materials to embody elegance and grace.",
        "This stunning piece features intricate details and a silhouette that celebrates modern femininity.",
        "Timeless sophistication meets contemporary style in this exquisite creation.",
        "Designed for the bold and the beautiful, this item makes a statement wherever you go.",
        "Experience the luxury of premium fabrics and expert tailoring with this unique addition to your wardrobe.",
        "A perfect blend of comfort and style, this piece is an essential for the discerning fashionista.",
        "Capturing the essence of high fashion, this design is both innovative and classic.",
        "Radiate confidence and charm with this beautifully constructed garment.",
        "An elegant choice for special occasions, reflecting a deep commitment to quality and beauty.",
        "Sophisticated, chic, and effortlessly stylish – a true testament to sartorial excellence."
    ],
    it: [
        "Un capolavoro di design, realizzato con i materiali più pregiati per incarnare eleganza e grazia.",
        "Questo splendido capo presenta dettagli intricati e una silhouette che celebra la femminilità moderna.",
        "La raffinatezza senza tempo incontra lo stile contemporaneo in questa creazione squisita.",
        "Progettato per chi è audace e ama il bello, questo articolo lascia il segno ovunque tu vada.",
        "Scopri il lusso di tessuti pregiati e sartoria esperta con questa aggiunta unica al tuo guardaroba.",
        "Un mix perfetto di comfort e stile, questo capo è essenziale per la fashionista esigente.",
        "Catturando l'essenza dell'alta moda, questo design è innovativo e classico allo stesso tempo.",
        "Irradia sicurezza e fascino con questo indumento splendidamente costruito.",
        "Una scelta elegante per occasioni speciali, che riflette un profondo impegno per qualità e bellezza.",
        "Sofisticato, chic ed elegantemente naturale – un vero testamento di eccellenza sartoriale."
    ],
    es: [
        "Una obra maestra del diseño, elaborada con los materiales más finos para encarnar elegancia y gracia.",
        "Esta impresionante pieza presenta detalles intrincados y una silueta que celebra la feminidad moderna.",
        "La sofisticación atemporal se encuentra con el estilo contemporáneo en esta exquisita creación.",
        "Diseñado para los audaces y hermosos, este artículo hace una declaración donde quiera que vayas.",
        "Experimenta el lujo de telas premium y sastrería experta con esta adición única a tu guardarropa.",
        "Una mezcla perfecta de comodidad y estilo, esta pieza es esencial para la fashionista exigente.",
        "Capturando la esencia de la alta moda, este diseño es tanto innovador como clásico.",
        "Irradia confianza y encanto con esta prenda bellamente construida.",
        "Una elección elegante para ocasiones especiales, reflejando un profundo compromiso con la calidad y la belleza.",
        "Sofisticado, chic y sin esfuerzo elegante – un verdadero testamento de excelencia sartorial."
    ],
    fr: [
        "Un chef-d'œuvre de design, conçu avec les matériaux les plus fins pour incarner l'élégance et la grâce.",
        "Cette superbe pièce présente des détails complexes et une silhouette qui célèbre la féminité moderne.",
        "La sophistication intemporelle rencontre le style contemporain dans cette création exquise.",
        "Conçu pour les audacieux et les beaux, cet article fait sensation où que vous alliez.",
        "Découvrez le luxe de tissus haut de gamme et d'une couture experte avec cet ajout unique à votre garde-robe.",
        "Un mélange parfait de confort et de style, cette pièce est essentielle pour la fashionista exigeante.",
        "Capturant l'essence de la haute couture, ce design est à la fois innovant et classique.",
        "Rayonnez de confiance et de charme avec ce vêtement magnifiquement construit.",
        "Un choix élégant pour les occasions spéciales, reflétant un engagement profond envers la qualité et la beauté.",
        "Sophistiqué, chic et élégant sans effort – un véritable témoignage d'excellence vestimentaire."
    ],
    pt: [
        "Uma obra-prima do design, elaborada com os materiais mais finos para personificar elegância e graça.",
        "Esta peça deslumbrante apresenta detalhes intrincados e uma silhueta que celebra a feminilidade moderna.",
        "Sofisticação atemporal encontra o estilo contemporâneo nesta criação requintada.",
        "Projetado para os ousados e belos, este item faz uma declaração onde quer que você vá.",
        "Experimente o luxo de tecidos premium e alfaiataria especializada com esta adição única ao seu guarda-roupa.",
        "Uma mistura perfeita de conforto e estilo, esta peça é essencial para a fashionista exigente.",
        "Capturando a essência da alta moda, este design é inovador e clássico.",
        "Irradie confiança e charme com esta peça vestuária lindamente construída.",
        "Uma escolha elegante para ocasiões especiais, refletindo um profundo compromisso com qualidade e beleza.",
        "Sofisticado, chique e estiloso sem esforço – um verdadeiro testamento de excelência em alfaiataria."
    ]
};

const getDeterministicItem = <T>(list: T[], seed: string): T => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % list.length;
    return list[index];
};

export async function fetchGalleryItems(locale: string = 'en'): Promise<GalleryItem[]> {
    try {
        const response = await fetch(GOOGLE_SHEET_URL, { next: { revalidate: 60 } });
        if (!response.ok) {
            throw new Error(`Failed to fetch Google Sheet: ${response.statusText}`);
        }
        const csvText = await response.text();

        const result = Papa.parse<string[]>(csvText, {
            header: false, // We use index-based access since headers might vary
            skipEmptyLines: true,
        });

        // Assume Row 1 is header, data starts from Row 2
        const rows = result.data.slice(1);



        return rows.map((row, index) => {
            // Column Mapping:
            // 0 (A): Picture
            // 1 (B): Name (Title)
            // 5 (F): Category/Collection (User said 6th column, which is index 5)

            const title = row[1] || `Untitled Item ${index + 1}`;
            const id = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`;

            // Handle Images: URL, Local File, or Placeholder
            const rawImage = row[0] ? row[0].trim() : '';
            let posterImage = '';

            if (rawImage === '') {
                // No image provided -> Use placeholder
                posterImage = getDeterministicItem(PLACEHOLDER_IMAGES, id);
            } else if (rawImage.startsWith('http') || rawImage.startsWith('https')) {
                // External URL -> Use as is
                posterImage = rawImage;
            } else {
                // Local filename -> Assume it's in public/images/
                posterImage = `/images/${rawImage}`;
            }

            // Handle Videos
            // If PLACEHOLDER_VIDEOS is empty, videoUrl will be undefined/empty, requiring UI to handle it.
            // getDeterministicItem might return undefined if list is empty.
            // We want to force image fallback if no valid video.
            const videoUrl = PLACEHOLDER_VIDEOS.length > 0
                ? getDeterministicItem(PLACEHOLDER_VIDEOS, id)
                : '';

            const uncategorizedLabel: Record<string, string> = {
                en: 'Uncategorized',
                it: 'Non categorizzato',
                es: 'Sin categoría',
                fr: 'Non classé',
                pt: 'Sem categoria'
            };
            const collection = (row[5] || uncategorizedLabel[locale] || 'Uncategorized').trim();

            // Assign deterministic description
            const descriptionList = PLACEHOLDER_DESCRIPTIONS_BY_LOCALE[locale] || PLACEHOLDER_DESCRIPTIONS_BY_LOCALE['en'];
            const description = getDeterministicItem(descriptionList, id);

            return {
                id,
                title,
                description,
                videoUrl,
                posterImage,
                category: collection, // User mapped 6th col to "Category of cloth" in first prompt, then "Collection" in second. We'll use it for both or specific logic.
                collection: collection, // Using same col for collection grouping
                featured: false,
            };
        }).filter(item => item.title !== ''); // Filter out completely empty rows if any

    } catch (error) {
        console.error('Error fetching Google Sheet data:', error);
        // Fallback? Or just rethrow? For now return empty to avoid app crash
        return [];
    }
}
