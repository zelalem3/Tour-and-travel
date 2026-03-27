import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      // We keep high security but disable "Control Flow Flattening"
      // This is usually what causes the Rolldown/Vercel crash
      compact: true,
      controlFlowFlattening: false, 
      deadCodeInjection: true,
      numbersToExpressions: true,
      simplify: true,
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
        // Keep the function syntax for modern Vite
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor';
            if (id.includes('framer-motion')) return 'animations';
            return 'libs';
          }
        },
      },
    },
  },
})