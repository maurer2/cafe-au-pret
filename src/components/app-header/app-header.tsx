import { defineComponent, computed } from 'vue';
import styles from './app-header.module.css';
import { useStore } from '../../store';

export default defineComponent({
  name: 'AppHeader',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const dateTimeKey = computed(() => store.getters.getCurrentDateKey as string);

    const remainingOrders = computed(() => store.getters.getDailyRemainingNumberOfOrders as number);
    /*
    const isBlocked = computed(
      () => store.getters.hasOrderWithinBlockingDuration(dateTimeKey.value) as boolean,
    );
    */
    const isBlocked = { value: false };

    // console.log(isBlocked);
    return () => (
      <header class={styles.header}>
        <h1 class={styles.title}>Coffeescript</h1>
        <dl class={styles.status}>
          <dt class={styles.statusTitle}>Remaining drinks:</dt>
          <dd class={styles.statusValue}>{remainingOrders.value}</dd>

          <dt class={styles.statusTitle}>Status (Blocked):</dt>
          <dd class={styles.statusValue}>{String(isBlocked.value)}</dd>
        </dl>
      </header>
    );
  },
});
