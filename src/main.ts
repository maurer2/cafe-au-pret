import { createApp } from 'vue';
import App from './app.vue';
import store from './store';

import 'core-js';
import 'core-js/features/math/clamp';
import 'regenerator-runtime/runtime';

import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

createApp(App).use(store).mount('#app');
