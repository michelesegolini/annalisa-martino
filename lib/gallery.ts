import { GalleryItem } from '@/types';
import { GALLERY_DATA } from './gallery-data';

export async function fetchGalleryItems(locale: string = 'it'): Promise<GalleryItem[]> {
    // Simulate async fetch for consistency with existing calls
    return GALLERY_DATA.map(item => ({
        id: item.id,
        title: item.title,
        description: item.descriptions[locale as keyof typeof item.descriptions] || item.descriptions.en,
        category: item.category,
        videoUrl: item.videoUrl || '',
        posterImage: item.imageUrl,
        collection: 'Collection',
        featured: true
    }));
}
