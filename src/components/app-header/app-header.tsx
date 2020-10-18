import { defineComponent, computed } from 'vue';
import styles from './app-header.module.css';
import { useStore } from '../../store';

export default defineComponent({
  name: 'AppHeader',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const remainingOrders = computed(
      () => store.getters.getDailyRemainingNumberOfOrders('YYYY-MM-DD') as number,
    );
    return () => (
      <header class={styles.header}>
        <h1 class={styles.title}>Coffeescript</h1>
        <dl class={styles.status}>
          <dt class={styles.statusTitle}>Remaining daily coffees</dt>
          <dd class={styles.statusValue}>{remainingOrders.value}</dd>
        </dl>
      </header>
    );
  },
});
