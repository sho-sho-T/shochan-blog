import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'; // If you plan to test React components later

export default defineConfig({
  plugins: [react()], // Add react plugin if needed
  test: {
    globals: true, // Use global APIs like describe, it, expect
    environment: 'jsdom', // Simulate DOM environment for testing React components or browser APIs
    // setupFiles: './vitest.setup.ts', // Optional setup file
    include: ['**/*.test.{ts,tsx}'], // Test file pattern
    // Add other configurations as needed
  },
}); 