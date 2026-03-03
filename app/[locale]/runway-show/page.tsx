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


    const videoItem: GalleryItem = {
        id: 'ab-video-slide',
        title: t('videoSlide.title'),
        description: t('videoSlide.description'),
        category: '',
        collection: 'Main',

        videoUrls: [
            'https://res.cloudinary.com/dfdbbgsja/video/upload/v1771177994/Sfilata_1_q2fnn8.mp4',
            'https://res.cloudinary.com/dfdbbgsja/video/upload/v1771177983/Sfilata_2_uhfloh.mp4'
        ],

        price: ''
    };

    return (
        <main>
            <VirtualGallery items={[videoItem]} />
        </main>
    );
}
