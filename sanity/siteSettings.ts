import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
        }),
        defineField({
            name: 'lookbookPdf',
            title: 'Lookbook PDF File',
            type: 'file',
            description: 'Upload the high-resolution Lookbook PDF here. Users will receive this file upon submitting the Lookbook form.',
            options: {
                accept: 'application/pdf',
            },
        }),
    ],
})
