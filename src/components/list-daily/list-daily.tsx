import { defineComponent, ref } from 'vue';
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
        time: new Date(),
        tz: 'Europe/London',
      },
      {
        name: 'näme',
        time: new Date(),
        tz: 'Europe/London',
      },
    ];

    return () => (
      <section class={styles.list}>
        <h2>Daily purchases on {currentDate}</h2>
        <table class={styles.table}>
          <caption class={styles.caption}>Caption</caption>
          <tr>
            <th class={styles.tableHead}>Counter</th>
            <th class={styles.tableHead}>Coffee name</th>
            <th class={styles.tableHead}>Order date</th>
          </tr>
          {orders.map((order, index) => (
            <tr key={order.name}>
              <td class={styles.tableColumn}>{index + 1}</td>
              <td class={styles.tableColumn}>{order.name}</td>
              <td class={styles.tableColumn}>{order.time.toString()}</td>
            </tr>
          ))}
        </table>
      </section>
    );
  },
});
