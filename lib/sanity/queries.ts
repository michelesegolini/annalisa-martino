import { GalleryItem } from '@/types';
import { client, urlFor } from './client';

export async function getGalleryItems(locale: string = 'en'): Promise<GalleryItem[]> {
    const query = `*[_type == "galleryItem"] | order(orderRank) {
    _id,
    title,
    titles,
    descriptions,
    "category": category->title,
    mainImage,
    gallery,
    video,
    videoUrl,
    price,
    isVertical,
    featured
  }`;

    const items = await client.fetch(query);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.map((item: any) => {
        // Fallback for title/description if specific locale is missing
        const localizedTitle = item.titles?.[locale] || item.title;
        const localizedDescription = item.descriptions?.[locale] || item.descriptions?.en || '';

        const videoUrl = item.videoUrl || '';
        // If a video file is uploaded to Sanity (not just URL)
        // We'd typically use getFileAsset(item.video).url but for simplicity check if it's an object with asset
        // For now, assuming videoUrl usage or simple file URL handling if needed.

        return {
            id: item._id,
            title: localizedTitle,
            description: localizedDescription,
            category: item.category,
            collection: item.category, // Using category as collection for now
            price: item.price || '',
            videoUrl: videoUrl,
            posterImage: item.mainImage ? urlFor(item.mainImage).width(800).url() : '',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            images: item.gallery?.map((img: any) => urlFor(img).width(800).url()) || [],
            featured: item.featured || false,
            isVertical: item.isVertical || false,
        };
    });
}

export async function getLookbookPdfUrl(): Promise<string | null> {
    try {
        const query = `*[_type == "siteSettings"][0].lookbookPdf.asset->url`;
        const url = await client.fetch(query);
        return url || null;
    } catch (error) {
        console.error("Error fetching lookbook PDF URL from Sanity:", error);
        return null;
    }
}
