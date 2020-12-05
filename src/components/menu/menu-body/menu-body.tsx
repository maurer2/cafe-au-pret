import { defineComponent, ref, computed, CSSProperties, PropType } from 'vue';
import styles from './menu-body.module.css';
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
    const activeDrinkTypeComputed = computed({
      get: () => {
        return props.activeDrinkType;
      },
      set: (newValue: DrinkType) => {
        emit('update-active-drink-type', newValue);
      },
    });

    function addDrink(drink: MenuItem) {
      emit('add-drink', drink);
    }

    return () => (
      <div class={styles.menuListsContainer}>
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
