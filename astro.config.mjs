// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.cctvtrailer.com',
  
  // Ensure static output for best SEO
  output: 'static',
  
  // Build configuration for SEO optimization
  build: {
    // Generate sitemap automatically
    format: 'directory',
    // Inline critical CSS for faster rendering
    inlineStylesheets: 'always'
  },
  
  // Compression for better performance
  compressHTML: true,
  
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Optimize CSS for production
      cssCodeSplit: true,
      // Minify for better performance (using default esbuild)
      minify: true
    }
  }
});