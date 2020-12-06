import { defineComponent, onMounted, onUnmounted, computed } from 'vue';
import styles from './app.module.css';
import AppFooter from './components/app-footer/app-footer';
import AppHeader from './components/app-header/app-header';
import ProgressBar from './components/progress-bar/progress-bar';
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
    ProgressBar,
    ListDaily,
    'menu-list': Menu,
    'qr-code': QRCode,
  },
  props: {},
  setup() {
    const store = useStore();
    const refreshTimeout = computed(
      (): number => store.state.refreshTimeoutInSeconds,
    );
    let timeoutId = -1;

    function updateTime(): void {
      const newDate = new Date();

      store.dispatch(Actions.UPDATE_CURRENT_DATE, newDate);
      console.log('update');
    }

    function runUpdateTimer(): void {
      updateTime();

      timeoutId = window.setTimeout(() => {
        runUpdateTimer();
      }, refreshTimeout.value * 1_000);
    }

    function stopUpdateTimer(): void {
      window.clearTimeout(timeoutId);
    }

    onMounted(() => {
      // store.dispatch(Actions.ADD_ORDER, dummyOrder);
      runUpdateTimer();
    });

    onUnmounted(() => {
      stopUpdateTimer();
    });

    return () => (
      <>
        <app-header />
        <progress-bar />
        <main class={styles.main}>
          <qr-code />
          <list-daily />
          <menu-list />
        </main>
        <app-footer />
      </>
    );
  },
});
