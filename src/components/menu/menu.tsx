import { defineComponent, ref, Ref, computed } from 'vue';
import styles from './menu.module.css';
import { useStore } from '../../store';
import menuList from './menu.json';

export default defineComponent({
  name: 'Menu',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const menuListSorted = [...menuList]; // todo

    return () => (
      <section class={styles.menu}>
        <h2>Menu</h2>

        <ul class={styles.menuList}>
          {menuListSorted.map((menuEntry) => (
            <li class={styles.menuListEntry}>
              <button class={styles.menuButton} type="button">
                {menuEntry.name}
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  },
});
