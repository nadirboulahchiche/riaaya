import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    minify: false, // Disable minification to avoid syntax errors
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
    strictPort: false
  }
})
