import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from "@tailwindcss/vite";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB: string
    }
  }
}

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  experimental: {
    payloadExtraction: false
  },
  router: {
      options: {
          strict: false
      }
  },
  nitro: {
    prerender: {
      routes: ['/projects', '/']
    }
  },
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // Projects page pre-rendered at build time
    '/projects': { prerender: true },
    // Individual projects can be SSR or static
    '/projects/**': { prerender: true },
    // Admin or dashboard pages are SPA
    '/admin/**': { ssr: false },
  },

  vite: {
    // plugins: [tailwindcss()],
    // optimizeDeps: {
    //   include: ['@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', '@fortawesome/vue-fontawesome']
    // }
  },

  content: {
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: 'everforest-dark',
      preload: [
        'java',
        'javascript',
        'typescript',
        'python',
        'bash',
        'c',
        'cpp',
        'csharp',
        'css',
        'html',
        'csv',
        'json',
        'yaml',
        'xml',
        'markdown',
        'php',
        'ruby',
        'sql',
        'go',
        'rust'
      ]
    },
    markdown: {
      anchorLinks: false,
      // https://github.com/rehypejs/rehype-external-links
      rehypePlugins: [
        [
        'rehype-external-links',
          {
            target: '_blank',
            rel: 'noopener noreferer'
          }
        ]
      ]
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
          children: `
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
        { name: 'keywords', content: 'angel capra, angel, capra, angel c, ac.tech, angellabs, portfolio, cyber security, cybersecurity, cyber, security, angeldev0, 4ngel2769, cybersecurity portfolio, IoT, internet of things' }
      ],
      link: [
        { rel: 'canonical', href: 'https://angellabs.xyz' },
        { rel: 'icon', type: 'image/x-icon', href: '/android-chrome-512x512.png'},
        // Nerd font icons
        { rel: 'stylesheet', href: 'https://www.nerdfonts.com/assets/css/webfont.css' },
        // Google's material icons
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap'},
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap'},
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sen:wght@400;500;600;700;800&display=swap'}
      ]
    }
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '/assets/css/main.css'
  ],

  modules: [
    '@formkit/auto-animate',
    '@nuxt/ui',
    '@nuxtjs/robots',
    "@nuxt/image",
    "nuxt-gtag",
    "@nuxtjs/sitemap",
    "@nuxtjs/color-mode",
    '@nuxt/content'
  ],

  icon: {
    
  },

  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },

  ui: {
    global: true
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

  // compatibilityDate: '2024-07-09',
})
