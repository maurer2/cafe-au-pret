import { computed, defineComponent } from 'vue';
import styles from './index.module.css';

import { useStore } from '../../store';

import ListBody from './list-body/list-body';
import ListFooter from './list-footer/list-footer';

export default defineComponent({
  name: 'ListDaily',
  components: {
    ListBody,
    ListFooter,
  },
  props: {},
  setup() {
    const store = useStore();
    const hasOrders = computed(() => store.getters.hasDailyOrders as boolean);
    const ordersList = computed(() => store.getters.getDailyOrders as Order[]);
    const remainingOrders = computed(
      () => store.getters.getDailyRemainingNumberOfOrders as number,
    );
    const currentDate = computed(() => store.getters.getCurrentDate as string);
    // const currentDateFull = computed(() => store.state.currentDateTime);
    const dateTimeFormatter = computed(() => store.state.dateTimeFormatter);
    // const blockingTimeoutEnd = computed(() => store.state.blockingTimeoutEnd);

    /*
    const remainingMinutes = computed(() => {
      if (!blockingTimeoutEnd.value) {
        return 0 as number;
      }
      const differenceMS = blockingTimeoutEnd.value.getTime() - currentDateFull.value.getTime();
      const difference = differenceMS / 1000 / 60;

      return difference;
    });
    */

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
            <list-footer remainingOrders={remainingOrders.value} />
          </tfoot>
        </table>
      </section>
    );
  },
});
