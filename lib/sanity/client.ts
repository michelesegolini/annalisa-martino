import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configure your Sanity project details here
export const sanityConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-25',
    useCdn: true,
};

export const client = createClient(sanityConfig);

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}
