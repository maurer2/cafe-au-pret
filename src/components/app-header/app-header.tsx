import { defineComponent, computed } from 'vue';

import { useStore } from '../../store';
import { GettersType } from '../../store/types';

import styles from './app-header.module.css';

export default defineComponent({
  name: 'AppHeader',
  components: {},
  props: {},
  setup() {
    const store = useStore();

    const remainingOrders = computed<ReturnType<GettersType['isBlocked']>>(
      () => store.getters.getDailyRemainingNumberOfOrders,
    );
    const isBlocked = computed<ReturnType<GettersType['isBlocked']>>(
      () => store.getters.isBlocked,
    );

    return () => (
      <header class={styles.header}>
        <h1 class={styles.title}>Coffeescript</h1>
        <dl class={styles.status}>
          <dt class={styles.statusTitle}>Remaining drinks:</dt>
          <dd class={styles.statusValue}>{remainingOrders.value}</dd>

          <dt class={styles.statusTitle}>Status:</dt>
          <dd class={styles.statusValue}>
            {isBlocked.value === true ? 'Blocked' : 'Not Blocked'}
          </dd>
        </dl>
      </header>
    );
  },
});
