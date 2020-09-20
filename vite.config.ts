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
    include: ['vue'],
  },
};

export default config;
