import { defineComponent } from 'vue';
// import styles from './app.module.css';
import AppFooter from './components/app-footer/app-footer';
import AppHeader from './components/app-header/app-header';
import QRCode from './components/qrcode/qrcode';
import ListDaily from './components/list-daily/list-daily';
import Menu from './components/menu/menu';

import './app.css';

export default defineComponent({
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    ListDaily,
    Menu,
    QRCode,
  },
  props: {},
  setup() {
    return () => (
      <>
        <AppHeader />
        <main class="main">
          <QRCode />
          <ListDaily />
          <Menu />
        </main>
        <AppFooter />
      </>
    );
  },
});
