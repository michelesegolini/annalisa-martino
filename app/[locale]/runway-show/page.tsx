import { getTranslations } from 'next-intl/server';
import VirtualGallery from '@/components/gallery/VirtualGallery';
import { GalleryItem } from '@/types';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'gallery' });
    const n = await getTranslations({ locale, namespace: 'navigation' });

    return {
        title: `${n('runwayShow')} | Annalisa Martino`,
        description: t('videoSlide.description'),
    };
}

export default async function RunwayShowPage({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'gallery' });

    // Construct the video item just like in the A/B test logic, but as a standalone item
    const videoItem: GalleryItem = {
        id: 'ab-video-slide',
        title: t('videoSlide.title'),
        description: t('videoSlide.description'),
        category: 'Collection',
        collection: 'Main',
        videoUrl: 'https://res.cloudinary.com/dfdbbgsja/video/upload/v1769992104/Sfilate_qaspeu.mp4',
        posterImage: '/images/fashion-item-1.png',
        price: ''
    };

    return (
        <main>
            {/* Reuse VirtualGallery. It will handle the single item display. 
                 Since it's a single item, we might need to ensure the scroll behavior 
                 is what the user expects (or doesn't expect). 
                 The user said "exactly like this", so reusing the component is the best bet.
             */}
            <VirtualGallery items={[videoItem]} />
        </main>
    );
}
