import { defineComponent, ref, computed, PropType } from 'vue';

import { DrinkType } from '../../../store/types';

import styles from './menu-body-scrollable.module.css';

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
      emit('add-drink', drink);
    }

    const dragPositionX = ref(0);
    const scrollContainer = ref<HTMLElement | null>(null);

    function updateDragging(event: PointerEvent) {
      dragPositionX.value += event.movementX;

      if (scrollContainer.value === null) {
        return;
      }

      console.log('updatedragging', dragPositionX.value);

      scrollContainer.value.scrollLeft = dragPositionX.value;
    }

    function startDragging(event: PointerEvent) {
      if (scrollContainer.value === null) {
        return;
      }

      scrollContainer.value.onpointermove = updateDragging;
      scrollContainer.value.setPointerCapture(event.pointerId);
    }

    function stopDragging(event: PointerEvent) {
      if (scrollContainer.value === null) {
        return;
      }

      scrollContainer.value.onpointermove = null;
      scrollContainer.value.releasePointerCapture(event.pointerId);
    }

    const scrollPositionX = computed(() => {
      console.log(dragPositionX.value);
      return `${dragPositionX.value}px`;
    });

    return () => (
      <div class={styles.menuListsContainer}>
        <div
          class={styles.menuListsContainerInner}
          ref={scrollContainer}
          onPointerdown={startDragging}
          onPointerup={stopDragging}
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
