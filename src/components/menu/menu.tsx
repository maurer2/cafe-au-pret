import { defineComponent, ref, computed } from 'vue';
import styles from './menu.module.css';
import { useStore } from '../../store';
import menuList from './menuData.json';

enum SortType {
  alphabet = 'alphabet',
  popularity = 'popularity',
}

export default defineComponent({
  name: 'Menu',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const orderType = ref(SortType.popularity);
    const orderTypeComputed = computed({
      get: () => {
        return orderType.value;
      },
      set: (newValue) => {
        orderType.value = newValue;
      },
    });
    const menuListSortedByPopularity = ref([...menuList]);
    const menuListSortedByAlphabet = ref(
      [...menuList].sort((entry1, entry2) => entry1.name.localeCompare(entry2.name)),
    );

    const menuListSorted = computed(() => {
      if (orderTypeComputed.value === SortType.alphabet) {
        return menuListSortedByAlphabet.value;
      }
      return menuListSortedByPopularity.value;
    });

    function addItemToOrderedList() {
      const dummyOrder: Order = {
        id: String(Math.random()),
        name: `name-${Math.random().toPrecision(2)}`,
        dateTime: new Date(),
        tz: 'Europe/London',
      };
      store.dispatch('addOrder', dummyOrder);

      console.log(store.state.orders['YYYY-MM-DD']);
      console.log('clicked');
    }

    return () => (
      <section class={styles.menu}>
        <h2>Menu</h2>

        <div class={styles.menuHeader}>
          <label
            class={[
              styles.menuHeaderLabel,
              orderTypeComputed.value === SortType.alphabet ? styles.menuHeaderLabelIsActive : '',
            ]}
          >
            <input
              class={styles.menuHeaderButton}
              type="radio"
              name="sort-type"
              value={SortType.alphabet}
              v-model={orderTypeComputed.value}
            />
            Alphabet
          </label>
          <label
            class={[
              styles.menuHeaderLabel,
              orderTypeComputed.value === SortType.popularity ? styles.menuHeaderLabelIsActive : '',
            ]}
          >
            <input
              class={styles.menuHeaderButton}
              type="radio"
              name="sort-type"
              value={SortType.popularity}
              v-model={orderTypeComputed.value}
            />
            Popularity
          </label>
        </div>

        <ul class={styles.menuList}>
          {menuListSorted.value.map((menuEntry) => (
            <li class={styles.menuListEntry}>
              <button class={styles.menuButton} onClick={addItemToOrderedList} type="button">
                {menuEntry.name}
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  },
});
