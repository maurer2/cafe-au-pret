import { defineComponent, ref, Ref, computed } from 'vue';
import styles from './menu.module.css';
import { useStore } from '../../store';
import menuList from './menuData.json';

export default defineComponent({
  name: 'Menu',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const menuListSorted = [...menuList]; // todo
    const orderedAlphabetically = 'byPopularity';
    /*
    const isOrderedAlphabetically = computed({
      get: () => orderedAlphabetically.value,
      set: (newValue) => {
        orderedAlphabetically.value = newValue;
      },
    });
    */

    return () => (
      <section class={styles.menu}>
        <h2>Menu ({orderedAlphabetically})</h2>

        <div class={styles.menuHeader} v-show={false}>
          <div class="">
            <input
              type="radio"
              name="order-type"
              id="radio-button--alphabetically"
              value="alphabetically"
              v-model={orderedAlphabetically}
            />
            <label for="radio-button--alphabetically">Alphabetical</label>
          </div>

          <div class="">
            <input
              type="radio"
              name="order-type"
              id="radio-button--popularity"
              value="byPopularity"
              v-model={orderedAlphabetically}
            />
            <label for="radio-button--popularity">Popularity</label>
          </div>
        </div>

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
