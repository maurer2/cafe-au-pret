import { defineComponent, onMounted, computed, onUnmounted } from 'vue';
import styles from './app.module.css';
import AppFooter from './components/app-footer/app-footer';
import AppHeader from './components/app-header/app-header';
import QRCode from './components/qrcode';
import ListDaily from './components/list-daily';
import Menu from './components/menu/menu';

import { useStore } from './store';
import { Actions } from './store/types';

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
    const dummyOrder: Order = {
      id: 'psl',
      name: 'PSL',
      dateTime: new Date(),
      tz: 'Europe/London',
    };
    let timeoutId = -1;

    function updateTime(): void {
      const newDate = new Date();

      store.dispatch(Actions.UPDATE_CURRENT_DATE, newDate);
    }

    function runUpdateTimer(): void {
      updateTime();

      timeoutId = window.setTimeout(() => {
        runUpdateTimer();
      }, 10_000);
    }

    function stopUpdateTimer(): void {
      window.clearTimeout(timeoutId);
    }

    onMounted(() => {
      store.dispatch(Actions.ADD_ORDER, dummyOrder);

      runUpdateTimer();
    });

    onUnmounted(() => {
      stopUpdateTimer();
    });

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
