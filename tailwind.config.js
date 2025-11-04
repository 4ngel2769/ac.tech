/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.{vue,js,ts}',
    './app/pages/**/*.{vue,js,ts}',
    './app/composables/**/*.{js,ts}',
    './app/plugins/**/*.{js,ts}',
    './app/app.{js,ts,vue}',
    './app/App.{js,ts,vue}',
    './content/**/*.md',
    './nuxt.config.{js,ts}'
  ],
  // Aggressive purge configuration
  safelist: [
    // Dynamic classes that can be generated
    'dark',
    'light',
    // Tailwind v4 pattern matching for utility classes
    { pattern: /^bg-/ },
    { pattern: /^text-/ },
    { pattern: /^border-/ },
    { pattern: /^prose/ },
  ],
  theme: {
    extend: {
      colors: {
        'brand_primary': '#124BCF',
        'brand_secondary': '#5eceeb',
        'brand_secondary_saturated': '#5eceeb',
        'typography_primary': '#000000',
        'background': '#ffffff'
      },
      fontSize: {
        'xxs': '0.5rem',
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'highlight': '5rem',
        'h1': '4rem',
        'h2': '3rem',
        'h3': '2rem',
        'h4': '1.5rem',
        'h5': '1.25rem',
        'highlight_sm': '3.5rem',
        'h1_sm': '3rem',
        'h2_sm': '2.25rem',
        'h3_sm': '1.75rem',
        'h4_sm': '1.5rem',
        'h5_sm': '1.25rem'
      },
      lineHeight: {
        'xxs': '0.75rem',
        'xs': '1rem',
        'sm': '1.25rem',
        'base': '1.35rem',
        'lg': '1.45rem',
        'highlight': '5.5rem',
        'h1': '4.25rem',
        'h2': '3.25rem',
        'h3': '2.25rem',
        'h4': '1.75rem',
        'h5': '1.5rem',
        'highlight_sm': '3.75rem',
        'h1_sm': '3.25rem',
        'h2_sm': '2.5rem',
        'h3_sm': '2rem',
        'h4_sm': '1.75rem',
        'h5_sm': '1.5rem',
      },
      padding: {
        'section_x_sm': '1.5rem',
        'section_x': '5rem',
        'section_y_sm': '3rem',
        'section_y': '5rem'
      },
      spacing: {
        'nav': '4rem',
        'section_x': '5rem',
      }
    }
  }
}
