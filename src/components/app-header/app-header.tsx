import { defineComponent, computed } from 'vue';
import styles from './app-header.module.css';
import { useStore } from '../../store';

export default defineComponent({
  name: 'AppHeader',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const remainingOrders = computed(() => store.getters.getDailyRemainingNumberOfOrders as number);
    const isBlocked = computed((): boolean => store.getters.isBlocked);

    return () => (
      <header class={styles.header}>
        <h1 class={styles.title}>Coffeescript</h1>
        <dl class={styles.status}>
          <dt class={styles.statusTitle}>Remaining drinks:</dt>
          <dd class={styles.statusValue}>{remainingOrders.value}</dd>

          <dt class={styles.statusTitle}>Status:</dt>
          <dd class={styles.statusValue}>{isBlocked.value ? 'Blocked' : 'Not Blocked'}</dd>
        </dl>
      </header>
    );
  },
});
