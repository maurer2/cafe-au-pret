import { defineComponent } from 'vue';
import styles from './qrcode-controls.module.css';

export default defineComponent({
  name: 'QRCodeControls',
  props: {},
  emits: ['increase-zoom', 'decrease-zoom', 'reset-zoom'],
  setup(_, { emit }) {
    function zoomIn(): void {
      emit('increase-zoom');
    }

    function zoomOut(): void {
      emit('decrease-zoom');
    }

    function zoomReset(): void {
      emit('reset-zoom');
    }

    return () => (
      <div class={styles.controls}>
        <button class={styles.control} type="button" onClick={zoomIn}>
          Zoom in
        </button>
        <button class={styles.control} type="button" onClick={zoomReset}>
          1x
        </button>
        <button class={styles.control} type="button" onClick={zoomOut}>
          Zoom out
        </button>
      </div>
    );
  },
});
