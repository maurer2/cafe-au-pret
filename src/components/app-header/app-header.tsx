import { defineComponent, ref } from 'vue';
import styles from './app-header.module.css';

export default defineComponent({
  name: 'AppHeader',
  components: {},
  props: {},
  setup() {
    const remainingAmount = ref(5);
    return () => (
      <header class={styles.header}>
        <h1 class={styles.title}>Coffescript</h1>
        <dl class={styles.status}>
          <dt class={styles.statusTitle}>Remaining daily coffees</dt>
          <dd class={styles.statusValue}>{remainingAmount.value}</dd>
        </dl>
      </header>
    );
  },
});
