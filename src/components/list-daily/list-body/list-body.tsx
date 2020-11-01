import { defineComponent, PropType } from 'vue';
import styles from './list-body.module.css';

import { getTimeFormatted } from '../../../util/dateUtil';

export default defineComponent({
  name: 'ListBody',
  props: {
    index: {
      type: Number as PropType<number>,
      default: 0,
    },
    rowData: {
      type: Object as PropType<Order>,
      default: null,
    },
    dateTimeFormatter: {
      type: Object as PropType<Intl.DateTimeFormat>,
      default: null,
    },
  },
  setup(props) {
    const time = getTimeFormatted(props.dateTimeFormatter, props.rowData.dateTime);
    const indexOneBased = String(props.index + 1).padStart(2, '0');

    return () => (
      <tr class={styles.tableBodyRow} key={props.rowData.id}>
        <td class={styles.tableBodyColumn}>{indexOneBased}</td>
        <td class={styles.tableBodyColumn}>{props.rowData.name}</td>
        <td class={styles.tableBodyColumn}>{time}</td>
        <td class={styles.tableBodyColumn}></td>
      </tr>
    );
  },
});
