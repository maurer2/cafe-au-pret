import {
  defineComponent,
  ref,
  computed,
  watch,
  CSSProperties,
  reactive,
} from 'vue';
import styles from './menu.module.css';
import { useStore } from '../../store';
import { Actions, DrinkType } from '../../store/types';
import Overlay from '../overlay/overlay';

export default defineComponent({
  name: 'Menu',
  components: {
    Overlay,
  },
  props: {},
  setup() {
    const store = useStore();
    const activeDrinkType = ref(DrinkType.COFFEE);
    const slots = {
      overlayContent: () => <span>Order added</span>,
    };
    const activeDrinkTypeComputed = computed({
      get: () => {
        return activeDrinkType.value;
      },
      set: (newValue) => {
        activeDrinkType.value = newValue;
      },
    });
    const isBlocked = computed((): boolean => store.getters.isBlocked);
    const menuList = computed(
      (): MenuItem[] => store.getters.getMenuEntriesOfType,
    );
    const showOverlay = ref(false);
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

    const isDragging = ref(false);
    const dragPositionX = ref(0);
    // const pointerId = ref(null);

    const mau = ref<HTMLElement | null>(null);

    function updateDragging(event: PointerEvent) {
      dragPositionX.value += event.movementX;

      console.log(dragPositionX.value);
    }

    function startDragging(event: PointerEvent) {
      if (mau.value === null) {
        return;
      }

      mau.value.onpointermove = updateDragging;
      mau.value.setPointerCapture(event.pointerId);
    }

    function stopDragging(event: PointerEvent) {
      if (mau.value === null) {
        return;
      }

      mau.value.onpointermove = null;
      mau.value.releasePointerCapture(event.pointerId);
    }

    const cssVars = computed(() => ({
      '--menu-scroll-position': `${scrollbarPositionX.value}`,
      '--content-faux-scroll-position': `${dragPositionX.value}`,
    }));

    return () => (
      <section class={styles.menu}>
        <h2>Menu</h2>

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

        <div
          class={styles.menuListsContainer}
          onPointerdown={startDragging}
          onPointerup={stopDragging}
          ref={mau}
        >
          <div
            class={styles.menuListsContainerInner}
            style={cssVars.value as CSSProperties}
          >
            <div class={styles.menuListContainer}>
              <ul class={styles.menuList}>
                {menuList.value.map((menuEntry) => (
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
                {menuList.value.map((menuEntry) => (
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
        </div>
        {showOverlay.value && <Overlay v-slots={slots} />}
      </section>
    );
  },
});
