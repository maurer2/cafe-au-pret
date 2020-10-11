import { defineComponent, ref, Ref, computed } from 'vue';
import styles from './menu.module.css';
import { useStore } from '../../store';
import menuList from './menuData.json';

export default defineComponent({
  name: 'Menu',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const menuListSorted = [...menuList];
    const menuListSortedAlphabetically = menuListSorted;
    const listOrderedAlphabetically = ref(true);
    const isOrderedAlphabetically = computed({
      get: () => listOrderedAlphabetically.value,
      set: (newValue) => {
        listOrderedAlphabetically.value = newValue;
      },
    });

    function toggleOrder() {
      isOrderedAlphabetically.value = !isOrderedAlphabetically.value;
    }

    return () => (
      <section class={styles.menu}>
        <h2>Menu</h2>

        <button onClick={toggleOrder}>
          v-model test ({String(isOrderedAlphabetically.value)})
        </button>

        <div class={styles.menuHeader}>
          <code>{JSON.stringify(isOrderedAlphabetically.value, null, 4)}</code>
          <label
            class={[
              styles.menuHeaderLabel,
              isOrderedAlphabetically.value === true ? styles.menuHeaderLabelIsActive : '',
            ]}
          >
            <input
              class={styles.menuHeaderButton}
              type="radio"
              name="order-type"
              value="true"
              v-model={isOrderedAlphabetically.value}
            />
            Alphabetical {String(isOrderedAlphabetically.value === true)}
          </label>
          <label
            class={[
              styles.menuHeaderLabel,
              isOrderedAlphabetically.value === false ? styles.menuHeaderLabelIsActive : '',
            ]}
          >
            <input
              class={styles.menuHeaderButton}
              type="radio"
              name="order-type"
              value="false"
              v-model={isOrderedAlphabetically.value}
            />
            Popularity {String(isOrderedAlphabetically.value === false)}
          </label>
        </div>

        <ul class={styles.menuList}>
          {menuListSorted.map((menuEntry) => (
            <li class={styles.menuListEntry}>
              <button class={styles.menuButton} type="button">
                {menuEntry.name}
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  },
});
