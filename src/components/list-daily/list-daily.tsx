import { computed, defineComponent, ref, Ref } from 'vue';
import styles from './list-daily.module.css';

export default defineComponent({
  name: 'ListDaily',
  components: {},
  props: {},
  setup() {
    const maxDailyOrders = 5;
    const orders: Ref<Order[]> = ref([
      {
        id: String(Math.random()),
        name: `name-${Math.random().toPrecision(2)}`,
        dateTime: new Date(),
        tz: 'Europe/London',
      },
    ]);
    const hasOrders = computed(() => orders.value.length !== 0);
    const remainingOrders = computed(() => {
      if (!hasOrders.value) {
        return maxDailyOrders;
      }

      const orderDifference = maxDailyOrders - orders.value.length;

      return Math.sign(orderDifference) === 1 ? orderDifference : 0;
    });

    const currentDate = new Date();
    const dateFormatter = ref(
      new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
    );

    function getDateFormatted(dateTime: Date): string {
      const dateFormatted = dateFormatter.value.formatToParts(dateTime);

      // only contains last literal separator e.g. seconds literal not date literal
      const { day, month, year } = Object.fromEntries(
        dateFormatted.map((datePart) => [datePart.type, datePart.value]),
      );

      return `${day}/${month}/${year}`;
    }

    function getTimeFormatted(dateTime: Date): string {
      const dateFormatted = dateFormatter.value.formatToParts(dateTime);

      // only contains last literal separator e.g. seconds literal not date literal
      const { hour, minute, second } = Object.fromEntries(
        dateFormatted.map((datePart) => [datePart.type, datePart.value]),
      );

      return `${hour}:${minute}:${second}`;
    }

    function addPurchase() {
      const newEntry = {
        id: String(Math.random()),
        name: `name-${Math.random().toPrecision(2)}`,
        dateTime: new Date(),
        tz: 'Europe/London',
      };

      orders.value = [...orders.value, newEntry];
    }

    function removePurchase() {
      const newOrders = [...orders.value];

      newOrders.pop();

      orders.value = newOrders;
    }

    return () => (
      <section class={styles.list}>
        <h2>Daily purchases on {getDateFormatted(currentDate)}</h2>

        <div>
          <h3>Show table: {String(hasOrders.value)}</h3>
        </div>

        <div>
          <button type="button" onClick={addPurchase}>
            Add purchase
          </button>

          <button type="button" onClick={removePurchase}>
            Remove purchase
          </button>
        </div>

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
              {orders.value.map((order, index) => {
                const { id, name, dateTime } = order;
                const time = getTimeFormatted(dateTime);
                const indexOneBased = index + 1;

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
