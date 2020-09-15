import * as path from 'path';
import cors from '@koa/cors'; // https://github.com/vitejs/vite/issues/341

import type { UserConfig } from 'vite';

const config: UserConfig = {
  /*
  alias: {
    '/@data/': path.resolve(__dirname, './../data/') // https://github.com/vitejs/vite/issues/279#issuecomment-635646269
  },
  */
  configureServer({ app }) {
    app.use(
      cors({
        origin: '*'
      })
    )
  }
};

export default config;
