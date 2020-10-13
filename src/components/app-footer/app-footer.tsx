import { defineComponent } from 'vue';
import styles from './app-footer.module.css';

import { useStore } from '../../store';

export default defineComponent({
  name: 'AppFooter',
  components: {},
  props: {},
  setup() {
    const store = useStore();

    return () => <footer class={styles.footer}>AppFooter</footer>;
  },
});
