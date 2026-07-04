import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/scoreboard': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
        secure: false,
      },
      '/events': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
        secure: false,
      },
      '/achievements': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
        secure: false,
      },
      '/history': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
