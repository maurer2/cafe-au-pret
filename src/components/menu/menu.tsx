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
    const orderedAlphabetically = ref(true);
    /*
    const isOrderedAlphabetically = computed({
      get: () => orderedAlphabetically.value,
      set: (newValue) => {
        orderedAlphabetically.value = newValue;
      },
    });
    */

    function changeOrder(_: Event, newOrderIsAlphabetic: boolean) {
      orderedAlphabetically.value = newOrderIsAlphabetic;
    }

    return () => (
      <section class={styles.menu}>
        <h2>Menu ({String(orderedAlphabetically.value)})</h2>

        <div class={styles.menuHeader}>
          <div class="">
            <input
              type="radio"
              name="order-type"
              id="radio-button--alphabetically"
              value="true"
              checked={orderedAlphabetically.value}
              onClick={(event) => changeOrder(event, true)}
            />
            <label for="radio-button--alphabetically">Alphabetical</label>
          </div>

          <div class="">
            <input
              type="radio"
              name="order-type"
              id="radio-button--popularity"
              value="false"
              checked={!orderedAlphabetically.value}
              onClick={(event) => changeOrder(event, false)}
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
