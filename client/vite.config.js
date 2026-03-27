import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
  plugins: [
    react(),
    {
      ...obfuscator({
        // High Obfuscation Settings
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        numbersToExpressions: true,
        simplify: true,
        stringArray: true,
        stringArrayEncoding: ['base64', 'rc4'],
        stringArrayThreshold: 0.75,
        splitStrings: true,
        unicodeEscapeSequence: true,
      }),
      // CRITICAL: Only apply this plugin during the build phase, 
      // not during 'npm run dev' or Vite's initial analysis.
      apply: 'build', 
    }
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
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion', 'gsap'],
        },
      },
    },
  },
})