import { computed, defineComponent } from 'vue';
import styles from './list-daily.module.css';

import { useStore } from '../../store';

import ListBody from './list-body/list-body';

export default defineComponent({
  name: 'ListDaily',
  components: {
    'list-body': ListBody,
  },
  props: {},
  setup() {
    const store = useStore();
    const dateTimeKey = computed(() => store.getters.getCurrentDateKey as string);
    const hasOrders = computed(() => store.getters.hasDailyOrders as boolean);
    const ordersList = computed(() => store.getters.getDailyOrders as Order[]);
    const remainingOrders = computed(() => store.getters.getDailyRemainingNumberOfOrders as number);
    const currentDate = computed(() => store.getters.getCurrentDate as string);
    const dateTimeFormatter = computed(() => store.state.dateTimeFormatter);

    return () => (
      <section class={styles.list}>
        <h2>Purchases on {currentDate.value}</h2>

        <table class={styles.table}>
          <caption class={styles.tableCaption}>Caption</caption>
          <thead class={styles.tableHead}>
            <tr class={styles.tableHeadRow}>
              <th class={styles.tableHeadColumn}>#</th>
              <th class={styles.tableHeadColumn}>Coffee name</th>
              <th class={styles.tableHeadColumn}>Order time</th>
              <th class={styles.tableHeadColumn}></th>
            </tr>
          </thead>
          {hasOrders.value && (
            <tbody class={styles.tableBody}>
              {ordersList.value.map((order, index) => (
                <list-body
                  index={index}
                  rowData={order}
                  dateTimeFormatter={dateTimeFormatter.value}
                />
              ))}
            </tbody>
          )}
          <tfoot class={styles.tableFoot}>
            <tr class={styles.tableFootRow}>
              <td class={styles.tableFootColumn} colspan={3}>
                Number of drinks remaining:
              </td>
              <td class={styles.tableFootColumn}>{remainingOrders.value}</td>
            </tr>
          </tfoot>
        </table>
      </section>
    );
  },
});
