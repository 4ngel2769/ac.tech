import { defineNuxtConfig } from 'nuxt/config'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB: string
    }
  }
}

export default defineNuxtConfig({
  devtools: {
    enabled: false,

    // timeline: {
    //   enabled: true
    // }
  },
  ssr: true,
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
  },
  router: {
      options: {
          strict: false,
          hashMode: false,
      }
  },
  nitro: {
    prerender: {
      routes: ['/projects', '/blog', '/']
    },
    // Exclude large assets from worker bundle - serve from /public instead
    publicAssets: [
      {
        baseURL: '/fonts',
        dir: 'public/fonts',
        maxAge: 31536000 // 1 year
      }
    ],
    routeRules: {
      // Cache static assets aggressively
      '/_nuxt/**': { 
        headers: { 
          'cache-control': 'public, max-age=31536000, immutable' 
        } 
      },
      '/fonts/**': { 
        headers: { 
          'cache-control': 'public, max-age=31536000, immutable' 
        } 
      },
      '/assets/**': { 
        headers: { 
          'cache-control': 'public, max-age=31536000, immutable' 
        } 
      },
      // Cache images
      '/**/*.{png,jpg,jpeg,gif,webp,avif,svg,ico,mp4}': { 
        headers: { 
          'cache-control': 'public, max-age=2592000' // 30 days
        } 
      },
      // Cache HTML pages for shorter duration
      '/**/*.html': { 
        headers: { 
          'cache-control': 'public, max-age=3600, must-revalidate' // 1 hour
        } 
      },
    }
  },
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // Blog page pre-rendered at build time
    '/blog': { prerender: true },
    // Individual blog posts can be SSR or static
    '/blog/**': { prerender: true },
    // Projects page pre-rendered at build time
    '/projects': { prerender: true },
    // Individual projects can be SSR or static
    '/projects/**': { prerender: true },
    // Admin or dashboard pages are SPA
    '/admin/**': { ssr: false },
  },

  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['vue', 'vue-router'],
            'fontawesome': ['@fortawesome/fontawesome-svg-core', '@fortawesome/vue-fontawesome'],
          }
        }
      }
    }
  },

  //
  app: {
    head: {
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-K7ZPX7THHN",
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K7ZPX7THHN');
          `,
          type: "text/javascript",
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Angel Capra 🚀',
      meta: [
        { name: 'description', content: 'Explore Angel Capra\'s projects in cybersecurity, IoT development, and embedded systems. As a passionate cybersecurity student, I showcase a diverse portfolio from hacking devices with ESP32 and Arduino to creating innovative tech solutions. Discover the intersection of cybersecurity and IoT technology, and find fascinating projects that push the boundaries of tech innovation.' },
        { name: 'keywords', content: 'angel capra, angel, capra, angel c, ac.tech, angellabs, portfolio, cyber security, cybersecurity, cyber, security, angeldev0, 4ngel2769, cybersecurity portfolio, IoT, internet of things' },
        { name: 'theme-color', content: '#0a0e0f' }
      ],
      link: [
        { rel: 'canonical', href: 'https://angellabs.xyz' },
        { rel: 'icon', type: 'image/x-icon', href: '/android-chrome-512x512.png'},
        // DNS prefetch for performance
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
        // Preconnect to font providers
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        // Nerd font icons - use font-display: swap
        { rel: 'stylesheet', href: 'https://www.nerdfonts.com/assets/css/webfont.css', media: 'print', onload: "this.media='all'" },
        // Google's material icons - use font-display: swap
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap', media: 'print', onload: "this.media='all'" },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap', media: 'print', onload: "this.media='all'" },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap', media: 'print', onload: "this.media='all'" },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sen:wght@400;500;600;700;800&display=swap', media: 'print', onload: "this.media='all'" },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Sen:wght@400..800&family=Syncopate:wght@400;700&display=swap', media: 'print', onload: "this.media='all'" }
      ]
    }
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/main.css',
    '~/assets/css/tailwind.css'
  ],

  modules: ['@formkit/auto-animate', '@nuxt/ui', '@nuxtjs/robots', "@nuxt/image", "nuxt-gtag", "@nuxtjs/sitemap", "@nuxtjs/color-mode", '@nuxt/content', 'nuxt-og-image'],

  content: {
    markdown: {
      anchorLinks: false,
      highlight: {
        theme: 'nord',
        // CRITICAL: Only preload languages ACTUALLY used in blog posts to reduce bundle size
        // Cloudflare Workers have 3 MB limit (free) / 10 MB (paid)
        // Each language adds ~50-200 KB to the bundle
        preload: [
          'javascript',
          'python',
          'bash',
          'c',
          'cpp',
          'json',
          'yaml',
          'markdown',
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
  } as any,

  image: {
    format: ['webp', 'avif'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  icon: {
    
  },

  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    config: {
      page_title: 'Angel Capra',
    },
    loadingStrategy: 'defer',
  },

  ui: {
    global: true
  },

  // Color mode configuration
  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  
  runtimeConfig: {
    public: {
      GITHUB: 'https://github.com/4ngel2769',
      LINKEDIN: 'https://www.linkedin.com/in/angelcapra',
      TWITTER: 'https://x.com/4ngel2769',
      INSTAGRAM: 'https://www.instagram.com/piestudios123',
      EMAIL: '',
      YOUTUBE: 'https://youtube.com/@angeldev0',
      DEVTO: 'https://dev.to/angeldev0',
      baseUrl: 'https://angellabs.xyz',
      siteName: 'Angel Capra 🚀',
    }
  },

  // colorMode: {
  //   preference: 'dark'
  // },
  // ogImage: {
  //   enabled: true
  // },
  // sitemap: {
  //   enabled: true
  // },
  // robots: {
  //   enabled: true
  // },
  // seoExperiments: {
  //   enabled: true
  // },
  // schemaOrg: {
  //   enabled: true
  // },
  // linkChecker: {
  //   enabled: true
  // },
  site: {
    url: 'https://angellabs.xyz',
    name: 'Angel Capra 🚀',
  //   // description: 'Personal website; find my projects, social links, and more. 📄',
    defaultLocale: 'en',
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
    exclude: [
      '/api/**',
      '/admin/**',
    ],
  },

  // compatibilityDate: '2024-07-09',
  compatibilityDate: '2025-07-22',
})
