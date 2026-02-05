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
  },
  markdown: {
    anchorLinks: false,
    highlight: {
      theme: 'nord',
      // theme: 'poimandres',
      // CRITICAL: Only preload languages ACTUALLY used in blog posts to reduce bundle size
      // Cloudflare Workers have 3 MB limit (free) / 10 MB (paid)
      // Each language adds ~50-200 KB to the bundle
      preload: [
        // 'java',
        'javascript',
        // 'typescript',
        'python',
        'bash',
        'c',
        'cpp',
        // 'csharp',
        // 'css',
        // 'html',
        // 'csv',
        'json',
        'yaml',
        // 'xml',
        'markdown',
        // 'php',
        // 'ruby',
        // 'sql',
        // 'go',
        // 'rust',
        'ini'
      ]
    },
    // https://github.com/rehypejs/rehype-external-links
    rehypePlugins: [
      [
        'rehype-external-links',
        {
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      ]
    ]
  }
})
