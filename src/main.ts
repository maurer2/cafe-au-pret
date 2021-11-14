import { createApp } from 'vue';
import { createPinia } from 'pinia'

import App from './app';
import store, { key } from './store';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';

createApp(App)
  .use(store, key)
  .use(createPinia())
  .mount('#app');
