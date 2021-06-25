import { defineComponent, PropType, toRefs } from 'vue';
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
    const { dateTimeFormatter, rowData, index } = toRefs(props);

    const time = getTimeFormatted(
      dateTimeFormatter.value,
      rowData.value.dateTime,
    );
    const indexOneBased = String(index.value + 1).padStart(2, '0');

    return () => (
      <tr class={styles.tableBodyRow} key={rowData.value.id}>
        <td class={styles.tableBodyColumn}>{indexOneBased}</td>
        <td class={styles.tableBodyColumn}>{rowData.value.name}</td>
        <td class={styles.tableBodyColumn}>
          <time datetime={rowData.value.dateTime.toISOString()}>{time}</time>
        </td>
        <td class={styles.tableBodyColumn}></td>
      </tr>
    );
  },
});
