import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      // 1. Target ONLY your source code to prevent the Rolldown crash
      include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
      exclude: [/node_modules/], // Strictly ignore libraries
      
      // 2. High security for your logic and keys
      compact: true,
      controlFlowFlattening: false, // Keep false to avoid Vercel memory crashes
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
      // 3. Remove manualChunks to let Vite handle the layout automatically. 
      // This is the safest way to avoid 'renderChunk' errors.
      output: {
        manualChunks: undefined, 
      },
    },
  },
})