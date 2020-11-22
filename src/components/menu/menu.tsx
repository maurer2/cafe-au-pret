import { defineComponent, ref, computed } from 'vue';
import styles from './menu.module.css';
import { useStore } from '../../store';
import { Actions } from '../../store/types';
import Overlay from '../overlay/overlay';
import { SortType } from './menu.types';

export default defineComponent({
  name: 'Menu',
  components: {
    Overlay,
  },
  props: {},
  setup() {
    const store = useStore();
    const orderType = ref(SortType.popularity);
    const slots = {
      overlayContent: () => <span>Order added</span>,
    };
    const orderTypeComputed = computed({
      get: () => {
        return orderType.value;
      },
      set: (newValue) => {
        orderType.value = newValue;
      },
    });
    const isBlocked = computed((): boolean => store.getters.isBlocked);
    const menuListSortedByPopularity = computed(
      () => store.getters.getMenuListSortedByPopularity as MenuItem[],
    );
    const menuListSortedByAlphabet = computed(
      () => store.getters.getMenuListSortedByAlphabet as MenuItem[],
    );
    const showOverlay = ref(false);

    const menuListSorted = computed(() => {
      if (orderTypeComputed.value === SortType.alphabet) {
        return menuListSortedByAlphabet.value;
      }
      return menuListSortedByPopularity.value;
    });

    function addItemToOrderedList({ id, name }: MenuItem) {
      const order: Order = {
        id,
        name,
        dateTime: new Date(),
        tz: 'Europe/London',
      };

      store
        .dispatch(Actions.ADD_ORDER, order)
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

        <div class={styles.menuHeaderStateHighlighter}>
          <div class={styles.menuHeaderStateHighlighterBar}></div>
        </div>

        <div class={styles.menuListsContainer}>
          <div class={styles.menuListContainer}>
            <ul class={styles.menuList}>
              {menuListSorted.value.map((menuEntry) => (
                <li class={styles.menuListEntry}>
                  <button
                    class={styles.menuButton}
                    onClick={() => addItemToOrderedList(menuEntry)}
                    disabled={isBlocked.value}
                    type="button"
                  >
                    {menuEntry.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div class={styles.menuListContainer}>
            <ul class={styles.menuList}>
              {menuListSorted.value.map((menuEntry) => (
                <li class={styles.menuListEntry}>
                  <button
                    class={styles.menuButton}
                    onClick={() => addItemToOrderedList(menuEntry)}
                    disabled={isBlocked.value}
                    type="button"
                  >
                    {menuEntry.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {showOverlay.value && <Overlay v-slots={slots} />}
      </section>
    );
  },
});
