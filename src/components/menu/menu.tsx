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
    const menuListSorted = [...menuList];
    // const menuListSortedAlphabetically = menuListSorted;
    const orderType = ref(SortType.popularity);
    const orderTypeComputed = computed({
      get: () => {
        return orderType.value;
      },
      set: (newValue) => {
        orderType.value = newValue;
      },
    });

    function toggleOrder() {
      if (orderTypeComputed.value === SortType.alphabet) {
        orderTypeComputed.value = SortType.popularity;
        return;
      }
      orderTypeComputed.value = SortType.alphabet;
    }

    return () => (
      <section class={styles.menu}>
        <h2>Menu</h2>

        <button onClick={toggleOrder}>v-model ({String(orderTypeComputed.value)})</button>

        <br />
        <br />

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
              name="order-type"
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
              name="order-type"
              value={SortType.popularity}
              v-model={orderTypeComputed.value}
            />
            Popularity
          </label>
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
