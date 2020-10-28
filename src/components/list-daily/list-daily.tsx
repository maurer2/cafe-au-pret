import { computed, defineComponent } from 'vue';
import styles from './list-daily.module.css';

import { useStore } from '../../store';
import { getTimeFormatted } from '../../util/dateUtil';

export default defineComponent({
  name: 'ListDaily',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const dateTimeKey = computed(() => store.getters.getCurrentDateKey as string);
    const ordersList = computed(() => store.getters.getDailyOrders(dateTimeKey.value) as Order[]);
    const hasOrders = computed(() => store.getters.hasDailyOrders(dateTimeKey.value) as boolean);
    const remainingOrders = computed(
      () => store.getters.getDailyRemainingNumberOfOrders(dateTimeKey.value) as number,
    );
    const currentDate = computed(() => store.getters.getCurrentDate as string);
    const dateTimeFormatter = computed(() => store.state.dateTimeFormatter);

    return () => (
      <section class={styles.list}>
        <h2>
          Daily purchases on {currentDate.value} ({dateTimeKey.value})
        </h2>

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
              {ordersList.value.map(({ id, name, dateTime }, index) => {
                const time = getTimeFormatted(dateTimeFormatter.value, dateTime);
                const indexOneBased = String(index + 1).padStart(2, '0');

                return (
                  <tr class={styles.tableBodyRow} key={id}>
                    <td class={styles.tableBodyColumn}>{indexOneBased}</td>
                    <td class={styles.tableBodyColumn}>{name}</td>
                    <td class={styles.tableBodyColumn}>{time}</td>
                    <td class={styles.tableBodyColumn}></td>
                  </tr>
                );
              })}
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
