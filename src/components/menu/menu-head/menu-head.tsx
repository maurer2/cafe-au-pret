import { defineComponent, ref, computed, CSSProperties, PropType } from 'vue';
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
    const activeDrinkTypeComputed = computed({
      get: () => {
        return props.activeDrinkType;
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
          {props.visibleDrinkTypes.map((visibleDrinkType) => (
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
        {props.showScrollbar && (
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
