import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// Export the Vite config using ES module syntax
export default defineConfig({
  server: {
    open: false,
    port: 3000,
  },
  resolve: {
    alias: {
      '~': '/src', // Define '~' as an alias for the 'src' directory
    },
  },
})
