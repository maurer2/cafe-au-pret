import { defineComponent, ref, Ref, computed } from 'vue';
import styles from './menu.module.css';
import { useStore } from '../../store';

export default defineComponent({
  name: 'Menu',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const entries = [{ id: 'id', name: 'item' }];

    return () => (
      <section class={styles.menu}>
        <h2>Menu</h2>

        <ul>
          <li>{entries[0].name}</li>
        </ul>
      </section>
    );
  },
});
