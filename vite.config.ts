import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/icon-192x192.svg', 'icons/icon-512x512.svg'],
      manifest: {
        name: 'Food Tinder',
        short_name: 'FoodTinder',
        description: 'Swipe na receptima koje voliš',
        theme_color: '#FF8C42',
        background_color: '#FFF8F0',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icons/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/icons/icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})
