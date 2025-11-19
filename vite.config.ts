import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // If you want to keep using process.env for some reason, you can polyfill it,
      // but it's better to use import.meta.env in the code.
      // We will expose GEMINI_API_KEY on import.meta.env by adding it to envPrefix or just relying on VITE_ prefix.
      // For now, let's keep the define for backward compatibility if the user doesn't change the code,
      // but since we updated the code, we can remove the process.env.API_KEY binding or keep it as fallback.
    },
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(new URL(import.meta.url).pathname), '.'),
      }
    },
    envPrefix: ['VITE_', 'GEMINI_'],
    css: {
      postcss: './postcss.config.js',
    },
  };
});
