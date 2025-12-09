import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    minify: false,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: process.env.PORT || 5173,
    host: '0.0.0.0',
    strictPort: false,
    allowedHosts: [
      'handsome-courtesy-production.up.railway.app',
      '.railway.app'
    ]
  }
})
