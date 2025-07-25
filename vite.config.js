import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/PrinceAppDinner/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Dinner Tracker',
        short_name: 'DinnerApp',
        start_url: '/PrinceAppDinner/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#a60000',
        icons: [
          {
            src: 'icon-192.png', // no need for base path here
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
