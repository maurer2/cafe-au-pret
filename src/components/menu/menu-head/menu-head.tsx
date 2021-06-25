import {
  defineComponent,
  ref,
  computed,
  CSSProperties,
  PropType,
  toRefs,
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
    visibleDrinkTypes: {
      type: Array as PropType<DrinkType[]>,
      default: () => [],
    },
    showScrollbar: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['update-active-drink-type'],
  setup(props, { emit }) {
    const { activeDrinkType, visibleDrinkTypes, showScrollbar } = toRefs(props);

    const activeDrinkTypeComputed = computed({
      get: () => {
        return activeDrinkType.value;
      },
      set: (newValue: DrinkType) => {
        emit('update-active-drink-type', newValue);
      },
    });
    const scrollbarPositionX = ref(0);

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
          {visibleDrinkTypes.value.map((visibleDrinkType) => (
            <>
              <label
                class={[
                  styles.menuHeaderLabel,
                  activeDrinkTypeComputed.value === visibleDrinkType
                    ? styles.menuHeaderLabelIsActive
                    : '',
                ]}
                data-label={visibleDrinkType}
              >
                <input
                  class={styles.menuHeaderButton}
                  type="radio"
                  name="sort-type"
                  value={visibleDrinkType}
                  v-model={activeDrinkTypeComputed.value}
                />
                {visibleDrinkType}
              </label>
            </>
          ))}
        </div>
        {showScrollbar.value && (
          <div class={styles.menuHeaderStateHighlighter}>
            <div
              class={styles.menuHeaderStateHighlighterBar}
              style={cssVars.value as CSSProperties}
            />
          </div>
        )}
      </>
    );
  },
});
