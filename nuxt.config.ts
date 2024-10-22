// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  experimental: {
    payloadExtraction: false
  },
  router: {
      options: {
          strict: false
      }
  },

  routeRules: {
    '/': { prerender: true }
  },
  content: {
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: 'github-dark',
      preload: ['java','javascript']
    },
    markdown: {
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
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Angel Capra 🚀',
      meta: [
        { name: 'description', content: 'Explore Angel Capra\'s projects in cybersecurity, IoT development, and embedded systems. As a passionate cybersecurity student, I showcase a diverse portfolio from hacking devices with ESP32 and Arduino to creating innovative tech solutions. Discover the intersection of cybersecurity and IoT technology, and find fascinating projects that push the boundaries of tech innovation.' },
        { name: 'keywords', content: 'angel capra, angel, capra, portfolio, cyber security, cybersecurity, cyber, security, angeldev0, 4ngel2769, cybersecurity portfolio, IoT, internet of things' }
      ],
      link: [
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

  modules: [// '@nuxtjs/seo',
  '@formkit/auto-animate', '@nuxt/ui', '@nuxtjs/robots', "@nuxt/image", "@nuxtjs/sitemap", "@nuxtjs/color-mode", '@nuxt/content'],

  ui: {
    global: true,
    icons: ['mdi', 'simple-icons']
  },
  
  runtimeConfig: {
    public: {
      GITHUB: 'https://github.com/4ngel2769',
      LINKEDIN: 'https://www.linkedin.com/in/angelcapra',
      TWITTER: 'https://x.com/4ngel2769',
      INSTAGRAM: 'https://www.instagram.com/piestudios123',
      EMAIL: process.env.GITHUB,
      YOUTUBE: 'https://youtube.com/@angeldev0',
      DEVTO: 'https://dev.to/angeldev0',
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
    url: 'https://angelcapra.tech',
    // name: 'Angel 🚀',
  //   // description: 'Personal website; find my projects, social links, and more. 📄',
    defaultLocale: 'en',
  },

  compatibilityDate: '2024-07-09',
})