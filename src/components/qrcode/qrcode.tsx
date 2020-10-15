import { defineComponent, Ref, ref, onMounted, computed } from 'vue';
import QRCodeGenerator, { QRCodeToStringOptions } from 'qrcode';
import styles from './qrcode.module.css';
import { useStore } from '../../store';
import { ActionsType } from '../../store/types';

export default defineComponent({
  name: 'QRCode',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const { userId } = store.state;
    const zoomLevel = computed(() => store.state.zoomLevel.toFixed(2));
    const qrCodeMarkup: Ref<string | null> = ref(null);

    function getQRCodeMarkup(payload: string): Promise<string> {
      const qrCodeSettings: QRCodeToStringOptions = {
        errorCorrectionLevel: 'H',
        type: 'svg',
        margin: 0,
      };
      const qrCodeString = QRCodeGenerator.toString(payload, qrCodeSettings);

      return qrCodeString;
    }

    function zoomIn() {
      store.dispatch(ActionsType.INCREASE_ZOOM);
    }

    function zoomOut() {
      store.dispatch(ActionsType.DECREASE_ZOOM);
    }

    function zoomReset() {
      store.dispatch(ActionsType.RESET_ZOOM);
    }

    onMounted(() => {
      getQRCodeMarkup(store.state.userId)
        .then((markup: string) => {
          setTimeout(() => {
            qrCodeMarkup.value = markup;
          }, 1);
        })
        .catch((error: Error) => {
          console.log(error);
        });
    });

    return () => (
      <div class={styles.qrcode}>
        <h2>QRCode (Zoom level: {zoomLevel.value})</h2>

        <>
          {qrCodeMarkup.value === null && <div>Loading QR code</div>}
          {qrCodeMarkup.value !== null && (
            <figure class={styles.qrcodePicture}>
              <div
                class={styles.qrcodeImageWrapper}
                innerHTML={qrCodeMarkup.value}
                style={{
                  width: `calc(50vw * ${zoomLevel.value})`,
                }}
              />
              <figcaption class={styles.qrcodeText}>{userId}</figcaption>
            </figure>
          )}
        </>

        <div class={styles.controls}>
          <button class={styles.control} type="button" onClick={() => zoomIn()}>
            Zoom in
          </button>
          <button class={styles.control} type="button" onClick={() => zoomReset()}>
            1x
          </button>
          <button class={styles.control} type="button" onClick={() => zoomOut()}>
            Zoom out
          </button>
        </div>
      </div>
    );
  },
});
