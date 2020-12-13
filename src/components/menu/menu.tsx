import { defineComponent, ref, computed } from 'vue';
import styles from './menu.module.css';
import { useStore } from '../../store';
import { Actions, DrinkType } from '../../store/types';

import Overlay from '../overlay/overlay';
import MenuHead from './menu-head/menu-head';
import MenuBody from './menu-body/menu-body';
// import MenuBodyScrollable from './menu-body-scrollable/menu-body-scrollable';

export default defineComponent({
  name: 'Menu',
  components: {
    Overlay,
    MenuHead,
    MenuBody,
    // MenuBodyScrollable,
  },
  props: {},
  setup() {
    const store = useStore();
    const activeDrinkType = ref<DrinkType | 'All'>(DrinkType.COFFEE);
    const slots = {
      overlayContent: () => <span>Order added</span>,
    };
    const isBlocked = computed((): boolean => store.getters.isBlocked);
    const menuItems = computed((): MenuItem[] => {
      if (activeDrinkType.value === 'All') {
        return store.getters.getAllMenuEntries();
      }
      return store.getters.getMenuEntriesOfType(activeDrinkType.value);
    });
    const showOverlay = ref(false);
    const visibleDrinkTypes = Object.values(DrinkType);

    function addDrink({ id, name }: MenuItem) {
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
          console.log(`${name} couldn't be added to the list.`);
        });
    }

    function updateActiveDrinkType(newValue: DrinkType) {
      activeDrinkType.value = newValue;
    }

    return () => (
      <section class={styles.menu}>
        <h2>Menu</h2>

        <menu-head
          activeDrinkType={activeDrinkType.value}
          visibleDrinkTypes={visibleDrinkTypes}
          onUpdateActiveDrinkType={updateActiveDrinkType}
        />
        <menu-body
          menuItems={menuItems.value}
          isBlocked={isBlocked.value}
          onAddDrink={addDrink}
        />

        {showOverlay.value && <Overlay v-slots={slots} />}
      </section>
    );
  },
});
