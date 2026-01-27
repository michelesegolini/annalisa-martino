import Papa from 'papaparse';
import { unstable_cache } from 'next/cache';

export interface GalleryItem {
    id: string;
    title: string;
    description_en: string;
    description_it: string;
    description_es: string;
    description_fr: string;
    description_pt: string;
    category: string;
    imageUrl: string;
    isVertical: boolean;
    rowSpan: number;
    colSpan: number;
    videoUrl?: string; // Optional field for video
}

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1Xl2N8dCgnJdQ0wM9Fw2Wv8skD870BXZO3fX9U0vS8b0/pub?output=csv';

// Helper to determine if a URL points to a video
const isVideoUrl = (url: string): boolean => {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.mov');
};

// Define localized descriptions for placeholders
const PLACEHOLDER_DESCRIPTIONS: Record<string, string[]> = {
    en: [
        "A study in movement and form, capturing the essence of modern elegance.",
        "Delicate textures meet structural precision in this signature piece.",
        "An exploration of light and shadow, defining the silhouette.",
        "Timeless craftsmanship embodied in every detail.",
        "A whisper of luxury, designed for the contemporary muse.",
        "Fluid lines and architectural inspiration merge seamlessly."
    ],
    it: [
        "Uno studio su movimento e forma, che cattura l'essenza dell'eleganza moderna.",
        "Texture delicate incontrano precisione strutturale in questo pezzo distintivo.",
        "Un'esplorazione di luce e ombra, che definisce la silhouette.",
        "Artigianato senza tempo incarnato in ogni dettaglio.",
        "Un sussurro di lusso, progettato per la musa contemporanea.",
        "Linee fluide e ispirazione architettonica si fondono perfettamente."
    ],
    es: [
        "Un estudio sobre movimiento y forma, capturando la esencia de la elegancia moderna.",
        "Texturas delicadas se encuentran con precisión estructural en esta pieza distintiva.",
        "Una exploración de luz y sombra, definiendo la silueta.",
        "Artesanía atemporal encarnada en cada detalle.",
        "Un susurro de lujo, diseñado para la musa contemporánea.",
        "Líneas fluidas e inspiración arquitectónica se fusionan a la perfección."
    ],
    fr: [
        "Une étude du mouvement et de la forme, capturant l'essence de l'élégance moderne.",
        "Des textures délicates rencontrent une précision structurelle dans cette pièce signature.",
        "Une exploration de l'ombre et de la lumière, définissant la silhouette.",
        "Un savoir-faire intemporel incarné dans chaque détail.",
        "Un murmure de luxe, conçu pour la muse contemporaine.",
        "Lignes fluides et inspiration architecturale se fondent harmonieusement."
    ],
    pt: [
        "Um estudo sobre movimento e forma, capturando a essência da elegância moderna.",
        "Texturas delicadas encontram precisão estrutural nesta peça de assinatura.",
        "Uma exploração de luz e sombra, definindo a silhueta.",
        "Artesanato atemporal incorporado em cada detalhe.",
        "Um sussurro de luxo, projetado para a musa contemporânea.",
        "Linhas fluidas e inspiração arquitetônica se fundem perfeitamente."
    ]
};

// Helper to get a deterministic random description
const getPlaceholderDescription = (seed: number, locale: string): string => {
    const descriptions = PLACEHOLDER_DESCRIPTIONS[locale] || PLACEHOLDER_DESCRIPTIONS['en'];
    const index = seed % descriptions.length;
    return descriptions[index];
};

// Helper check for local images (same as before)
const processImageUrl = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('https')) return url;
    // It's a filename, assume it's in public/images
    // Remove leading slash if present
    const cleanPath = url.startsWith('/') ? url.slice(1) : url;
    return `/images/${cleanPath}`;
};

// Cached fetch function
const getCachedSheetData = unstable_cache(
    async () => {
        try {
            const response = await fetch(GOOGLE_SHEET_URL, {
                // Remove 'no-store' to allow unstable_cache to work
                // next: { revalidate: 3600 } // Implicit in unstable_cache
            });

            if (!response.ok) {
                console.error(`Failed to fetch Google Sheet: ${response.status} ${response.statusText}`);
                throw new Error(`Failed to fetch Google Sheet: ${response.statusText}`);
            }

            const csvText = await response.text();

            return new Promise<GalleryItem[]>((resolve, reject) => {
                Papa.parse(csvText, {
                    header: true,
                    complete: (results) => {
                        const items = results.data
                            .map((row: any, index: number) => {
                                // ... existing mapping logic ...
                                // We need to duplicate the mapping logic here or extract it
                                // For safety, I'll allow the parse to finish then map outside
                                return row;
                            })
                            .filter((row: any) => row.Title && row.Image); // Basic validation

                        // Fix mapping
                        const mappedItems: GalleryItem[] = items.map((row: any, index: number) => {
                            const isVideo = isVideoUrl(row.Image);
                            // Generate description seed based on title length
                            const seed = (row.Title?.length || 0) + index;

                            return {
                                id: (index + 1).toString(),
                                title: row.Title,
                                description_en: row.Description_en || getPlaceholderDescription(seed, 'en'),
                                description_it: row.Description_it || getPlaceholderDescription(seed, 'it'),
                                description_es: row.Description_es || getPlaceholderDescription(seed, 'es'),
                                description_fr: row.Description_fr || getPlaceholderDescription(seed, 'fr'),
                                description_pt: row.Description_pt || getPlaceholderDescription(seed, 'pt'),
                                category: row.Category,
                                imageUrl: processImageUrl(row.Image), // Use helper
                                isVertical: row.IsVertical === 'TRUE',
                                rowSpan: parseInt(row.RowSpan) || 1,
                                colSpan: parseInt(row.ColSpan) || 1,
                                videoUrl: isVideo ? processImageUrl(row.Image) : undefined,
                            };
                        });

                        resolve(mappedItems);
                    },
                    error: (error: any) => {
                        reject(error);
                    }
                });
            });
        } catch (error) {
            console.error('Error fetching/parsing Google Sheet:', error);
            return []; // Return empty array on error
        }
    },
    ['google-sheet-data'], // Cache key
    { revalidate: 60 } // Revalidate every 60 seconds
);

export async function fetchGalleryItems(locale: string = 'en'): Promise<GalleryItem[]> {
    // Use the cached function
    return await getCachedSheetData();
}
