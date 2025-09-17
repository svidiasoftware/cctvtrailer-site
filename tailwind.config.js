/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/pages/**/*.{astro,html,js}',
    './src/components/**/*.{astro,html,js}',
    './src/layouts/**/*.{astro,html,js}'
  ],
  theme: {
    extend: {
      // Custom theme extensions if needed
      colors: {
        'primary': '#10b981',  // Green for CTAs
        'secondary': '#1f2937', // Dark gray
      }
    },
  },
  plugins: [],
  // Performance optimizations
  corePlugins: {
    // Disable unused core plugins to reduce CSS size
    float: false,
    clear: false,
    skew: false,
    caretColor: false,
    sepia: false,
  },
  // Further optimize by only including used variants
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'],
      textColor: ['hover', 'focus'],
      transform: ['hover'],
      scale: ['hover'],
    },
  },
}