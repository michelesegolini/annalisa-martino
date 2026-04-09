import { defineField, defineType } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export const category = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
    ],
})

export const galleryItem = defineType({
    name: 'galleryItem',
    title: 'Gallery Item (Dress)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title (Code/Internal Name)',
            type: 'string',
            description: 'Internal reference name (e.g., "Aura", "Lyra")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'titles',
            title: 'Localized Titles',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'it', title: 'Italian', type: 'string' }),
                defineField({ name: 'es', title: 'Spanish', type: 'string' }),
                defineField({ name: 'fr', title: 'French', type: 'string' }),
                defineField({ name: 'pt', title: 'Portuguese', type: 'string' }),
            ],
        }),
        defineField({
            name: 'descriptions',
            title: 'Descriptions',
            type: 'object',
            fields: [
                defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
                defineField({ name: 'it', title: 'Italian', type: 'text', rows: 3 }),
                defineField({ name: 'es', title: 'Spanish', type: 'text', rows: 3 }),
                defineField({ name: 'fr', title: 'French', type: 'text', rows: 3 }),
                defineField({ name: 'pt', title: 'Portuguese', type: 'text', rows: 3 }),
            ],
            description: 'Description of the dress in each language.',
        }),
        defineField({
            name: 'category',
            title: 'Collection / Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'Additional images for the slideshow.',
        }),
        defineField({
            name: 'video',
            title: 'Video (Optional)',
            type: 'file',
            options: {
                accept: 'video/*',
            },
        }),
        defineField({
            name: 'videoUrl',
            title: 'External Video URL (Optional fallback)',
            type: 'url',
            description: 'If you use an external link (like Cloudinary) instead of uploading a file.',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'string',
            description: 'e.g. "2.800€"',
        }),
        defineField({
            name: 'isVertical',
            title: 'Is Vertical Image?',
            type: 'boolean',
            initialValue: true,
            description: 'Affects layout grid. Vertical images take 2 rows.',
        }),
        defineField({
            name: 'featured',
            title: 'Featured?',
            type: 'boolean',
            initialValue: false,
            description: 'Show first or highlight?',
        }),
        orderRankField({ type: 'galleryItem' })
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            subtitle: 'category.title', // Changed to access title from reference
        },
    },
})

import { siteSettings } from './siteSettings'

export const schemaTypes = [siteSettings, galleryItem, category]
