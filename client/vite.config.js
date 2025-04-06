import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    define: {
      'process.env.PORT': JSON.stringify(env.PORT || 10000),
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || '')
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: command !== 'build', // Only generate source maps in development
    },
    server: {
      proxy: {
        '/api': {
          target: `http://localhost:${env.PORT || 10000}`,
          changeOrigin: true,
        },
        '/leetcode': {
          target: `http://localhost:${env.PORT || 10000}`,
          changeOrigin: true,
        }
      }
    }
  }
})
