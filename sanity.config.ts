'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './sanity/schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schema' folder
    schema: {
        types: schemaTypes,
    },
    plugins: [
        structureTool({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            structure: (S: any, context: any) => {
                return S.list()
                    .title('Content')
                    .items([
                        orderableDocumentListDeskItem({
                            type: 'galleryItem',
                            title: 'Gallery Items (Dresses)',
                            S,
                            context,
                        }),
                        ...S.documentTypeListItems().filter(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (listItem: any) => listItem.getId() !== 'galleryItem'
                        ),
                    ])
            },
        }),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        // visionTool({defaultApiVersion: '2024-01-25'}),
    ],
})
