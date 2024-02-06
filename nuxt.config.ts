// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  //
  app: {
    head: {
      title: 'Angel 🚀',
      meta: [
        { name: 'description', content: 'Personal website; find my projects, social links, and more. 📄' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/android-chrome-512x512.png'},
        // Nerd font icons
        { rel: 'stylesheet', href: 'https://www.nerdfonts.com/assets/css/webfont.css' },
        // Google's material icons
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' },
        { rel: 'stylesheet', href: 'ttps://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap'}
      ]
    }
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  modules: ['@formkit/auto-animate', '@nuxt/ui'],
  ui: {
    global: true,
    icons: ['mdi', 'simple-icons']
  },
  colorMode: {
    preference: 'dark'
  }
})