import { defineComponent, ref } from 'vue';
import styles from './list-daily.module.css';

export default defineComponent({
  name: 'ListDaily',
  components: {},
  props: {},
  setup() {
    const remainingAmount = ref(5);
    const orders: Order[] = [
      {
        name: 'name',
        dateTime: new Date(),
        tz: 'Europe/London',
      },
      {
        name: 'näme',
        dateTime: new Date(),
        tz: 'Europe/London',
      },
    ];

    const currentDate = new Date();
    const dateFormatter = ref(
      new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        // hour12: true,
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

    return () => (
      <section class={styles.list}>
        <h2>Daily purchases on {getDateFormatted(currentDate)}</h2>

        <table class={styles.table}>
          <caption class={styles.tableCaption}>Caption</caption>
          <thead class={styles.tableHead}>
            <tr class={styles.tableHeadRow}>
              <th class={styles.tableHeadColumn}>#</th>
              <th class={styles.tableHeadColumn}>Coffee name</th>
              <th class={styles.tableHeadColumn}>Order time</th>
            </tr>
          </thead>
          <tbody class={styles.tableBody}>
            {orders.map((order, index) => {
              const { name, dateTime } = order;
              const indexOneBased = index + 1;
              const time = getTimeFormatted(dateTime);

              return (
                <tr class={styles.tableBodyRow} key={order.name}>
                  <td class={styles.tableBodyColumn}>{indexOneBased}</td>
                  <td class={styles.tableBodyColumn}>{name}</td>
                  <td class={styles.tableBodyColumn}>{time}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot class={styles.tableFoot}>
            <tr class={styles.tableFootRow}>
              <td class={styles.tableFootColumn} colspan={2}>
                Number of drinks
              </td>
              <td class={styles.tableFootColumn}>{remainingAmount.value}</td>
            </tr>
          </tfoot>
        </table>
      </section>
    );
  },
});
