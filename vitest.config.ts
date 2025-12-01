import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'nuxt',
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, '.'),
    },
  },
})
