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
    include: ['vue', 'core-js/features/math/clamp', 'core-js', 'regenerator-runtime/runtime'],
  },
};

export default config;
