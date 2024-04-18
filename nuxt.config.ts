// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  //
  app: {
    head: {
      title: 'Angel 🚀',
      meta: [
        { name: 'description', content: 'Angel Capra \'s portfolio and personal website ; find my projects, socials , and more. 📄' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/android-chrome-512x512.png'},
        // Nerd font icons
        { rel: 'stylesheet', href: 'https://www.nerdfonts.com/assets/css/webfont.css' },
        // Google's material icons
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap'}
      ]
    }
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  modules: [
    '@formkit/auto-animate',
    '@nuxt/ui',
    // '@nuxtjs/seo',
    '@nuxtjs/robots'
  ],
  ui: {
    global: true,
    icons: ['mdi', 'simple-icons']
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
    // description: 'Personal website; find my projects, social links, and more. 📄',
    defaultLocale: 'en',
  }
})