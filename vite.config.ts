import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import Prerender from 'vite-plugin-prerender';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        Prerender({
          staticDir: path.join(__dirname, 'dist'),
          routes: [
            '/',
            '/services',
            '/services/it-infrastructure-support',
            '/services/cctv-security-solutions',
            '/services/networking-connectivity',
            '/services/data-security-firewalls',
            '/services/smart-office-solutions',
            '/services/office-renovation-interiors',
            '/about',
            '/contact'
          ],
          rendererConfig: {
            maxConcurrentRoutes: 1,
            renderAfterTime: 500,
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
