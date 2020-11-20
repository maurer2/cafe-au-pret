import { defineComponent, computed } from 'vue';
import styles from './index.module.css';

import { useStore } from '../../store';
import { Actions } from '../../store/types';
import QRCodeFigure from './qrcode-figure/qrcode-figure';
import QRCodeControls from './qrcode-controls/qrcode-controls';
import QRCodeOverlay from './qrcode-overlay/qrcode-overlay';

export default defineComponent({
  name: 'QRCode',
  components: {
    'qr-code-figure': QRCodeFigure,
    'qr-code-controls': QRCodeControls,
    'qr-code-overlay': QRCodeOverlay,
  },
  props: {},
  setup() {
    const store = useStore();
    const { userId } = store.state;
    const zoomLevel = computed(() => store.getters.getZoomLevelFormatted as string);

    function zoomIn() {
      store.dispatch(Actions.INCREASE_ZOOM);
    }

    function zoomOut() {
      store.dispatch(Actions.DECREASE_ZOOM);
    }

    function zoomReset() {
      store.dispatch(Actions.RESET_ZOOM);
    }

    return () => (
      <section class={styles.qrcode}>
        <h2>QRCode (Zoom level: {zoomLevel.value})</h2>

        <qr-code-figure zoomLevel={zoomLevel.value} userId={userId}>
          <qr-code-overlay percentage-done={40} />
        </qr-code-figure>

        <qr-code-controls
          onIncreaseZoom={zoomIn}
          onDecreaseZoom={zoomOut}
          onResetZoom={zoomReset}
        />
      </section>
    );
  },
});
