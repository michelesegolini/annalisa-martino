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

    // Sample video
    const SAMPLE_VIDEO = 'https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4';

    return [
        // Red Carpet Collection
        {
            id: '1',
            title: messages.items.silkElegance.title,
            description: messages.items.silkElegance.description,
            videoUrl: SAMPLE_VIDEO,
            posterImage: '/images/fashion-item-1.png',
            category: messages.categories.eveningWear,
            collection: messages.collections.redCarpet.title,
            featured: true,
        },
        {
            id: '2',
            title: messages.items.velvetDreams.title,
            description: messages.items.velvetDreams.description,
            videoUrl: SAMPLE_VIDEO,
            posterImage: '/images/fashion-item-2.png',
            category: messages.categories.cocktail,
            collection: messages.collections.redCarpet.title,
            featured: true,
        },

        // Magna Grecia Collection
        {
            id: '3',
            title: messages.items.laceSophistication.title,
            description: messages.items.laceSophistication.description,
            videoUrl: SAMPLE_VIDEO,
            posterImage: '/images/fashion-item-3.png',
            category: messages.categories.bridal,
            collection: messages.collections.magnaGrecia.title,
            featured: false,
        },
        {
            id: '4',
            title: messages.items.chiffonGrace.title,
            description: messages.items.chiffonGrace.description,
            videoUrl: SAMPLE_VIDEO,
            posterImage: '/images/fashion-item-4.png',
            category: messages.categories.ceremony,
            collection: messages.collections.magnaGrecia.title,
            featured: false,
        },

        // Moda Mediterranea Collection
        {
            id: '5',
            title: messages.items.azureHorizon.title,
            description: messages.items.azureHorizon.description,
            videoUrl: SAMPLE_VIDEO,
            posterImage: '/images/fashion-item-5.png',
            category: messages.categories.resort,
            collection: messages.collections.modaMediterranea.title,
            featured: true,
        },
        {
            id: '6',
            title: messages.items.goldenHour.title,
            description: messages.items.goldenHour.description,
            videoUrl: SAMPLE_VIDEO,
            posterImage: '/images/fashion-item-6.png',
            category: messages.categories.party18,
            collection: messages.collections.modaMediterranea.title,
            featured: false,
        }
    ];
}

