import { GalleryItem } from '@/types';
import { fetchGalleryItems as fetchFromGallery } from '@/lib/gallery';

export async function getGalleryItems(locale: string = 'en'): Promise<GalleryItem[]> {
    return await fetchFromGallery(locale);
}

// Mock data for development/demo purposes
export function getMockGalleryItems(locale: string = 'en'): GalleryItem[] {
    // In a real app, this would come from Sanity with locale-specific fields
    // For now, we'll use the translation keys to get localized content
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const messages = require(`../../messages/${locale}.json`);

    // Sample video for placeholder
    const PLACEHOLDER_VIDEO = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';

    return [
        // Red Carpet Collection
        {
            id: '1',
            title: messages.items.silkElegance.title,
            description: messages.items.silkElegance.description,
            videoUrl: PLACEHOLDER_VIDEO,
            posterImage: '/images/poster-1.jpg',
            category: messages.categories.eveningWear,
            collection: messages.collections.redCarpet.title,
            featured: true,
        },
        {
            id: '2',
            title: messages.items.velvetDreams.title,
            description: messages.items.velvetDreams.description,
            videoUrl: PLACEHOLDER_VIDEO,
            posterImage: '/images/poster-2.jpg',
            category: messages.categories.cocktail,
            collection: messages.collections.redCarpet.title,
            featured: true,
        },

        // Magna Grecia Collection
        {
            id: '3',
            title: messages.items.laceSophistication.title,
            description: messages.items.laceSophistication.description,
            videoUrl: PLACEHOLDER_VIDEO,
            posterImage: '/images/poster-3.jpg',
            category: messages.categories.bridal,
            collection: messages.collections.magnaGrecia.title,
            featured: false,
        },
        {
            id: '4',
            title: messages.items.chiffonGrace.title,
            description: messages.items.chiffonGrace.description,
            videoUrl: PLACEHOLDER_VIDEO,
            posterImage: 'https://placehold.co/600x900?text=Poster+4', // Fixed missing image
            category: messages.categories.ceremony,
            collection: messages.collections.magnaGrecia.title,
            featured: false,
        },

        // Moda Mediterranea Collection
        {
            id: '5',
            title: "Azure Horizon",
            description: "Inspired by the Tyrrhenian sea, this fluid silk dress captures the essence of Mediterranean summer.",
            videoUrl: PLACEHOLDER_VIDEO,
            posterImage: '/images/poster-1.jpg',
            category: messages.categories.resort,
            collection: messages.collections.modaMediterranea.title,
            featured: true,
        },
        {
            id: '6',
            title: "Golden Hour",
            description: "A tribute to the warm sunset light reflecting on ancient stones.",
            videoUrl: PLACEHOLDER_VIDEO,
            posterImage: '/images/poster-2.jpg',
            category: messages.categories.party18,
            collection: messages.collections.modaMediterranea.title,
            featured: false,
        }
    ];
}

