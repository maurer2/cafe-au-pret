import { defineComponent, PropType } from 'vue';

import styles from './list-footer.module.css';

export default defineComponent({
  name: 'ListBody',
  props: {
    remainingOrders: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  setup(props) {
    return () => (
      <tr class={styles.tableFootRow}>
        <td class={styles.tableFootColumn} colspan={3}>
          Number of drinks remaining:
        </td>
        <td class={styles.tableFootColumn}>{props.remainingOrders}</td>
      </tr>
    );
  },
});
