import { createApp } from 'vue';
import App from './app.vue';
import store from './store';

import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

createApp(App).use(store).mount('#app');
