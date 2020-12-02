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
import MenuHead from './menu-head/menu-head';
import MenuBody from './menu-body/menu-body';

export default defineComponent({
  name: 'Menu',
  components: {
    Overlay,
    MenuHead,
    MenuBody,
  },
  props: {},
  setup() {
    const store = useStore();
    const activeDrinkType = ref(DrinkType.COFFEE);
    const slots = {
      overlayContent: () => <span>Order added</span>,
    };
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

    function updateActiveDrinkType(newValue: DrinkType) {
      activeDrinkType.value = newValue;
    }

    const cssVars = computed(() => ({
      '--menu-scroll-position': `${scrollbarPositionX.value}`,
      '--content-faux-scroll-position': `${dragPositionX.value}`,
    }));

    return () => (
      <section class={styles.menu}>
        <h2>Menu</h2>

        <menu-head
          activeDrinkType={activeDrinkType.value}
          onUpdateActiveDrinkType={updateActiveDrinkType}
        />
        <menu-body></menu-body>

        {showOverlay.value && <Overlay v-slots={slots} />}
      </section>
    );
  },
});
