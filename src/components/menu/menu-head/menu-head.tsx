import {
  defineComponent,
  ref,
  computed,
  watch,
  CSSProperties,
  PropType,
} from 'vue';
import styles from './menu-head.module.css';
import { DrinkType } from '../../../store/types';

export default defineComponent({
  name: 'Menu',
  components: {},
  props: {
    activeDrinkType: {
      type: String as PropType<DrinkType>,
      default: DrinkType.COFFEE,
    },
  },
  emits: ['update-active-drink-type'],
  setup(props, { emit }) {
    const activeDrinkTypeComputed = computed({
      get: () => {
        return props.activeDrinkType;
      },
      set: (newValue: DrinkType) => {
        emit('update-active-drink-type', newValue);
      },
    });
    const scrollbarPositionX = ref(0);
    const visibleDrinkTypes = [DrinkType.COFFEE, DrinkType.FRAPPE];

    /*
    watch(orderType, (newValue) => {
      if (newValue === SortType.popularity) {
        scrollbarPositionX.value = 100;
        return;
      }

      scrollbarPositionX.value = 0;
    });
    */

    const cssVars = computed(() => ({
      '--menu-scroll-position': `${scrollbarPositionX.value}`,
    }));

    return () => (
      <>
        <div class={styles.menuHeader}>
          <label
            class={[
              styles.menuHeaderLabel,
              activeDrinkTypeComputed.value === DrinkType.COFFEE
                ? styles.menuHeaderLabelIsActive
                : '',
            ]}
            data-label={DrinkType.COFFEE}
          >
            <input
              class={styles.menuHeaderButton}
              type="radio"
              name="sort-type"
              value={DrinkType.COFFEE}
              v-model={activeDrinkTypeComputed.value}
            />
            {DrinkType.COFFEE}
          </label>
          <label
            class={[
              styles.menuHeaderLabel,
              activeDrinkTypeComputed.value === DrinkType.FRAPPE
                ? styles.menuHeaderLabelIsActive
                : '',
            ]}
            data-label={DrinkType.FRAPPE}
          >
            <input
              class={styles.menuHeaderButton}
              type="radio"
              name="sort-type"
              value={DrinkType.FRAPPE}
              v-model={activeDrinkTypeComputed.value}
            />
            {DrinkType.FRAPPE}
          </label>
        </div>

        <div class={styles.menuHeaderStateHighlighter}>
          <div
            class={styles.menuHeaderStateHighlighterBar}
            style={cssVars.value as CSSProperties}
          />
        </div>
      </>
    );
  },
});
