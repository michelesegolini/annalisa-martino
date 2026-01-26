import { client } from './client';
import { GalleryItem } from '@/types';

export async function getGalleryItems(): Promise<GalleryItem[]> {
    const query = `*[_type == "galleryItem"] | order(featured desc, _createdAt desc) {
    "id": _id,
    title,
    description,
    "videoUrl": video.asset->url,
    "posterImage": posterImage.asset->url,
    category,
    featured
  }`;

    try {
        const items = await client.fetch(query);
        return items;
    } catch (error) {
        console.error('Error fetching gallery items:', error);
        // Return mock data for development
        return getMockGalleryItems('en');
    }
}

// Mock data for development/demo purposes
export function getMockGalleryItems(locale: string = 'en'): GalleryItem[] {
    // In a real app, this would come from Sanity with locale-specific fields
    // For now, we'll use the translation keys to get localized content
    const messages = require(`../../messages/${locale}.json`);

    return [
        {
            id: '1',
            title: messages.items.silkElegance.title,
            description: messages.items.silkElegance.description,
            videoUrl: '/videos/placeholder-1.mp4',
            posterImage: '/images/poster-1.jpg',
            category: messages.categories.eveningWear,
            featured: true,
        },
        {
            id: '2',
            title: messages.items.velvetDreams.title,
            description: messages.items.velvetDreams.description,
            videoUrl: '/videos/placeholder-2.mp4',
            posterImage: '/images/poster-2.jpg',
            category: messages.categories.cocktail,
            featured: true,
        },
        {
            id: '3',
            title: messages.items.laceSophistication.title,
            description: messages.items.laceSophistication.description,
            videoUrl: '/videos/placeholder-3.mp4',
            posterImage: '/images/poster-3.jpg',
            category: messages.categories.bridal,
            featured: false,
        },
        {
            id: '4',
            title: messages.items.chiffonGrace.title,
            description: messages.items.chiffonGrace.description,
            videoUrl: '/videos/placeholder-4.mp4',
            posterImage: '/images/poster-4.jpg',
            category: messages.categories.dayWear,
            featured: false,
        },
    ];
}

