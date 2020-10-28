import { defineComponent, onMounted, computed } from 'vue';
import styles from './app.module.css';
import AppFooter from './components/app-footer/app-footer';
import AppHeader from './components/app-header/app-header';
import QRCode from './components/qrcode/qrcode';
import ListDaily from './components/list-daily/list-daily';
import Menu from './components/menu/menu';

import { useStore } from './store';

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
    const store = useStore();
    const dateTimeKey = computed(() => store.getters.getCurrentDateKey as string);
    const dummyOrder: Order = {
      id: 'psl',
      name: 'PSL',
      dateTime: new Date(),
      tz: 'Europe/London',
    };

    // onMounted(() => {});

    return () => (
      <>
        <AppHeader />
        <main class={styles.main}>
          <QRCode />
          <ListDaily />
          <Menu />
        </main>
        <AppFooter />
      </>
    );
  },
});
