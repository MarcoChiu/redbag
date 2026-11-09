import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const getBuildTime = () => {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const parts = formatter.formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type)?.value || '';
  return `${get('year')}${get('month')}${get('day')}${get('hour')}${get('minute')}`;
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
    __BUILD_TIME__: JSON.stringify(getBuildTime())
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000
  }
});
