import cors from '@koa/cors'; // https://github.com/vitejs/vite/issues/341

import type { UserConfig } from 'vite';

const config: UserConfig = {
  configureServer({ app }) {
    app.use(
      cors({
        origin: '*',
      }),
    );
  },
  optimizeDeps: {
    include: [
      'vue',
      'core-js',
      'core-js/stable',
      'core-js/features/math/clamp',
      'regenerator-runtime/runtime',
    ],
  },
};

export default config;
