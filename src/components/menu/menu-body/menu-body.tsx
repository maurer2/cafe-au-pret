import { defineComponent, PropType, toRefs } from 'vue';

import { DrinkType } from '../../../store/types';

import styles from './menu-body.module.css';

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
  emits: {
    'add-drink': ({ type }: { type: MenuItem['type'] }) => {
      return type !== '';
    },
  },
  setup(props, { emit }) {
    const { menuItems, isBlocked } = toRefs(props);

    function addDrink(drink: MenuItem): void {
      emit('add-drink', drink);
    }

    return () => (
      <div class={styles.menuListsContainer}>
        <div class={styles.menuListContainer}>
          <ul class={styles.menuList}>
            {menuItems.value.map((menuEntry) => (
              <li class={styles.menuListEntry}>
                <button
                  class={styles.menuButton}
                  onClick={() => addDrink(menuEntry)}
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
    );
  },
});
