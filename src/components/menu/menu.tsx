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
    const listOrderedAlphabetically = ref(true);
    const isOrderedAlphabetically = computed({
      get: () => listOrderedAlphabetically.value,
      set: (newValue) => {
        listOrderedAlphabetically.value = newValue;
      },
    });

    function toggleOrder() {
      isOrderedAlphabetically.value = !isOrderedAlphabetically.value;
    }

    return () => (
      <section class={styles.menu}>
        <h2>Menu</h2>

        <button onClick={toggleOrder}>
          v-model test ({String(isOrderedAlphabetically.value)})
        </button>

        <div class={styles.menuHeader}>
          <div class="">
            <input
              type="radio"
              name="order-type"
              id="radio-button--alphabetically"
              value="true"
              v-model={isOrderedAlphabetically.value}
            />
            <label for="radio-button--alphabetically">Alphabetical</label>
          </div>

          <div class="">
            <input
              type="radio"
              name="order-type"
              id="radio-button--popularity"
              value="false"
              v-model={isOrderedAlphabetically.value}
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
