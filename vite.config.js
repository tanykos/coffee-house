import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true, // enable production source maps
    rollupOptions: {
      input: {
        index: './index.html',
        menu: './menu.html'
      }
    }
  },
  css: {
    devSourcemap: true // enable CSS source maps during development
  },
  base: "/coffee-house/"
})
