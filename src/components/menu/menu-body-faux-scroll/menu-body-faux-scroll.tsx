import { defineComponent, ref, computed, CSSProperties, PropType } from 'vue';

import { DrinkType } from '../../../store/types';

import styles from './menu-body-faux-scroll.module.css';

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

    const isDragging = ref(false);
    const dragPositionX = ref(0);
    // const pointerId = ref(null);

    const dragContainer = ref<HTMLElement | null>(null);

    function updateDragging(event: PointerEvent) {
      dragPositionX.value += event.movementX;

      console.log(dragPositionX.value);
    }

    function startDragging(event: PointerEvent) {
      if (dragContainer.value === null) {
        return;
      }

      dragContainer.value.onpointermove = updateDragging;
      dragContainer.value.setPointerCapture(event.pointerId);
    }

    function stopDragging(event: PointerEvent) {
      if (dragContainer.value === null) {
        return;
      }

      dragContainer.value.onpointermove = null;
      dragContainer.value.releasePointerCapture(event.pointerId);
    }

    const cssVars = computed(() => ({
      '--content-faux-scroll-position': `${dragPositionX.value}`,
    }));

    return () => (
      <div
        class={styles.menuListsContainer}
        onPointerdown={startDragging}
        onPointerup={stopDragging}
        ref={dragContainer}
      >
        <div
          class={styles.menuListsContainerInner}
          style={cssVars.value as CSSProperties}
        >
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
      </div>
    );
  },
});
