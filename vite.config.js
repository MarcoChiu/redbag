import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const getBuildTime = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${yyyy}${mm}${dd}${hh}${min}`;
};

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3007
  },
  plugins: [react()],
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(getBuildTime())
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000
  }
});
