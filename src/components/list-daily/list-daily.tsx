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
          <caption class={styles.caption}>Caption</caption>
          <thead>
            <tr>
              <th class={styles.tableHeadColumn}>Counter</th>
              <th class={styles.tableHeadColumn}>Coffee name</th>
              <th class={styles.tableHeadColumn}>Order date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.name}>
                <td class={styles.tableColumn}>{index + 1}</td>
                <td class={styles.tableColumn}>{order.name}</td>
                <td class={styles.tableColumn}>{getTimeFormatted(order.dateTime)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td class={styles.tableFootColumn} colspan={3}>
                {remainingAmount.value}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    );
  },
});
