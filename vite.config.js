import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // 增加到 1000 KB
    rollupOptions: {
      output: {
        manualChunks: {
          // 将大型依赖分离成单独的 chunk
          'react-vendor': ['react', 'react-dom'],
          'charts': ['recharts'],
          'supabase': ['@supabase/supabase-js'],
          'icons': ['lucide-react']
        }
      }
    }
  }
})
