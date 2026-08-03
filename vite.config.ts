import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: __dirname,
  base: './',
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@': __dirname,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      preserveSymlinks: true,
    },
  },
});
