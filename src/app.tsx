import { defineComponent } from 'vue';
// import styles from './app.module.css';
import AppFooter from './components/app-footer/app-footer';
import AppHeader from './components/app-header/app-header';
import QRCode from './components/qrcode/qrcode';
import ListDaily from './components/list-daily/list-daily';
// import ListTotal from './components/list-total/list-total.vue';
import Menu from './components/menu/menu';
import Order from './components/order/order.vue';

import './app.css';

export default defineComponent({
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    ListDaily,
    // ListTotal,
    Menu,
    Order,
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
          {/* <ListTotal /> */}
          <Menu />
          <Order />
        </main>
        <AppFooter />
      </>
    );
  },
});
