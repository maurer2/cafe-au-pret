import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [vue(), vueJsx()],
    };
  }
  return {
    plugins: [vue(), vueJsx()],
    build: {
      target: ['chrome80', 'firefox60', 'safari13', 'edge18'],
    },
  };
});
