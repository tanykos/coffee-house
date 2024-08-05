import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        index: './index.html',
        menu: './menu.html'
      }
    }
  },
  css: {
    devSourcemap: true
  },
  base: "/coffee-house/"
})
