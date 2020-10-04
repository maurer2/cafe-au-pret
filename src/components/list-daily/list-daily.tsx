import { defineComponent, ref, computed } from 'vue';
import styles from './list-daily.module.css';

export default defineComponent({
  name: 'ListDaily',
  components: {},
  props: {},
  setup() {
    const currentDate = new Date();
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
    const remainingAmount = ref(5);
    const dateFormatter = ref(
      new Intl.DateTimeFormat('in', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    );
    const dateHumanReadable = computed((): string => {
      const formatter = dateFormatter.value;

      return `
        ${formatter.formatToParts(currentDate)[0].value}
        ${formatter.formatToParts(currentDate)[1].value}
        ${formatter.formatToParts(currentDate)[2].value}
        ${formatter.formatToParts(currentDate)[3].value}
        ${formatter.formatToParts(currentDate)[4].value}
        `;
    });

    return () => (
      <section class={styles.list}>
        <h2>Daily purchases on {dateHumanReadable.value}</h2>
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
                <td class={styles.tableColumn}>{order.dateTime.toString()}</td>
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
