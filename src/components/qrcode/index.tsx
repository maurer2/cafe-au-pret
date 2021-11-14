import { defineComponent, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useStore } from '../../store';
import { Actions, GettersType } from '../../store/types';
// import { useStore2 } from '../../store2/index';

import styles from './index.module.css';
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
    // const store2 = useStore2();

    // const { zoomLevel: zoomLevel2 } = storeToRefs(store2);

    const { userId } = store.state;
    const zoomLevel = computed<
      ReturnType<GettersType['getZoomLevelFormatted']>
    >(() => store.getters.getZoomLevelFormatted);

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
        <h2>QRCode (Zoom level: {zoomLevel.value}</h2>

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
