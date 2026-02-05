import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/**/*.md',
      schema: z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
          headline: z.string().optional(),
          excerpt: z.string().optional(),

          date: z.string().optional(),
          dateUpdated: z.string().optional(),

          author: z.string().optional(),
          authorUrl: z.string().optional(),

          tags: z.array(z.string()).optional(),
          socialImage: z
            .object({
              src: z.string().optional(),
              alt: z.string().optional(),
              mime: z.string().optional(),
              width: z.number().optional(),
              height: z.number().optional()
            })
            .optional()
        })
        .passthrough()
    })
  }
})
