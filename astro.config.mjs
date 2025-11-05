// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.cctvtrailer.com',

  // Ensure static output for best SEO
  output: 'static',

  // URL handling: Remove trailing slashes for consistency
  // This ensures all URLs (except homepage) don't have trailing slashes
  // matching our canonical URLs and sitemap
  trailingSlash: 'never',

  // Build configuration for performance optimization
  build: {
    // Generate sitemap automatically
    format: 'directory',
    // Don't inline all styles - load CSS asynchronously
    inlineStylesheets: 'never'
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