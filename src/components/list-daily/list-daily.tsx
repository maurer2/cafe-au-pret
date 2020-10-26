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
    const ordersList = computed(() => store.getters.getDailyOrders('YYYY-MM-DD') as Order[]);
    const hasOrders = computed(() => store.getters.hasDailyOrders('YYYY-MM-DD') as boolean);
    const remainingOrders = computed(
      () => store.getters.getDailyRemainingNumberOfOrders('YYYY-MM-DD') as number,
    );
    const currentDate = computed(() => store.getters.getCurrentDate as string);
    const dateTimeFormatter = computed(() => store.state.dateTimeFormatter);

    return () => (
      <section class={styles.list}>
        <h2>Daily purchases on {currentDate.value}</h2>

        {hasOrders.value && (
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
            <tfoot class={styles.tableFoot}>
              <tr class={styles.tableFootRow}>
                <td class={styles.tableFootColumn} colspan={3}>
                  Number of drinks remaining:
                </td>
                <td class={styles.tableFootColumn}>{remainingOrders.value}</td>
              </tr>
            </tfoot>
          </table>
        )}
      </section>
    );
  },
});
