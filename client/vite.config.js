import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      // 1. ONLY obfuscate your code (where your keys/logic are)
      // This prevents the 'renderChunk' error by ignoring node_modules
      include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
      exclude: [/node_modules/], 
      
      // 2. High-security settings that won't crash the Vercel build
      compact: true,
      controlFlowFlattening: false, // Critical to keep false on Vercel
      deadCodeInjection: false,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      splitStrings: true,
      unicodeEscapeSequence: true,
    }),
  ],
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // 3. Let Vite handle chunking automatically for maximum stability
        manualChunks: undefined,
      },
    },
  },
})