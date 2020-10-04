import { defineComponent } from 'vue';
// import styles from './app.module.css';
import AppFooter from './components/app-footer/app-footer';
import AppHeader from './components/app-header/app-header';
import QRCode from './components/qrcode/qrcode';
import ListDaily from './components/list-daily/list-daily';
// import ListTotal from './components/list-total/list-total.vue';
import Offers from './components/offers/offers.vue';
import Order from './components/order/order.vue';

import './app.css';

export default defineComponent({
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    ListDaily,
    /// ListTotal,
    Offers,
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
          <Offers />
          <Order />
        </main>
        <AppFooter />
      </>
    );
  },
});
