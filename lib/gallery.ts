import { GalleryItem } from '@/types';
import { GALLERY_DATA } from './gallery-data';

export async function fetchGalleryItems(locale: string = 'it'): Promise<GalleryItem[]> {
    // This function is now deprecated in favor of direct Sanity queries
    // but kept for compatibility if imported elsewhere.
    // Ideally, we move everyone to use getGalleryItems from lib/sanity/queries
    const { getGalleryItems } = await import('@/lib/sanity/queries');
    return getGalleryItems(locale);
}
