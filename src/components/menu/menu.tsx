import { defineComponent, ref, computed } from 'vue';
import styles from './menu.module.css';
import { useStore } from '../../store';
import { ActionsType } from '../../store/types';
import Overlay from '../overlay/overlay';

enum SortType {
  alphabet = 'alphabet',
  popularity = 'popularity',
}

export default defineComponent({
  name: 'Menu',
  components: {
    Overlay,
  },
  props: {},
  setup() {
    const store = useStore();
    const { menuList } = store.state;
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
    const showOverlay = ref(false);
    const slots = {
      overlayContent: () => <span>Order added</span>,
    };

    const menuListSorted = computed(() => {
      if (orderTypeComputed.value === SortType.alphabet) {
        return menuListSortedByAlphabet.value;
      }
      return menuListSortedByPopularity.value;
    });

    function addItemToOrderedList({ id, name }: MenuItem) {
      const dummyOrder: Order = {
        id,
        name,
        dateTime: new Date(),
        tz: 'Europe/London',
      };

      store
        .dispatch(ActionsType.ADD_ORDER, dummyOrder)
        .then(() => {
          showOverlay.value = true;

          setTimeout(() => {
            showOverlay.value = false;
          }, 500);
        })
        .catch(() => {
          console.log(`${name} couldn't be added to the list`);
        });
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
              <button
                class={styles.menuButton}
                onClick={() => addItemToOrderedList(menuEntry)}
                type="button"
              >
                {menuEntry.name}
              </button>
            </li>
          ))}
        </ul>
        {showOverlay.value && <Overlay v-slots={slots} />}
      </section>
    );
  },
});
