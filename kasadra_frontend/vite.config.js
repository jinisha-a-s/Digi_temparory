/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,              // Use test/expect globally without import
    environment: 'jsdom',       // Browser-like environment for testing
    setupFiles: './src/setupTests.js'
    // Setup file before tests run
  }
})
