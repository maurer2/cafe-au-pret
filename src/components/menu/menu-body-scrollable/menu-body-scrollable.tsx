import { defineComponent, ref, computed, CSSProperties, PropType } from 'vue';
import styles from './menu-body-scrollable.module.css';
import { DrinkType } from '../../../store/types';

export default defineComponent({
  name: 'Menu',
  components: {},
  props: {
    activeDrinkType: {
      type: String as PropType<DrinkType.COFFEE>,
      default: DrinkType.COFFEE,
    },
    isBlocked: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    menuItems: {
      type: Array as PropType<MenuItem[]>,
      default: [],
    },
  },
  emits: ['update-active-drink-type', 'add-drink', 'show-overlay'],
  setup(props, { emit }) {
    function addDrink(drink: MenuItem) {
      // emit('add-drink', drink);
    }

    const scrollContainer = ref<HTMLElement | null>(null);

    return () => (
      <div class={styles.menuListsContainer} ref={scrollContainer}>
        <div class={styles.menuListContainer}>
          <ul class={styles.menuList}>
            {props.menuItems.map((menuEntry) => (
              <li class={styles.menuListEntry}>
                <button
                  class={styles.menuButton}
                  onClick={() => addDrink(menuEntry)}
                  disabled={props.isBlocked}
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
            {props.menuItems.map((menuEntry) => (
              <li class={styles.menuListEntry}>
                <button
                  class={styles.menuButton}
                  onClick={() => addDrink(menuEntry)}
                  disabled={props.isBlocked}
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
            {props.menuItems.map((menuEntry) => (
              <li class={styles.menuListEntry}>
                <button
                  class={styles.menuButton}
                  onClick={() => addDrink(menuEntry)}
                  disabled={props.isBlocked}
                  type="button"
                >
                  {menuEntry.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
});
