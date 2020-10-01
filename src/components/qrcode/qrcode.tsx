import { defineComponent, Ref, ref, onMounted } from 'vue';
import QRCodeGenerator from 'qrcode';
import styles from './qrcode.module.css';
import { useStore } from '../../store';

export default defineComponent({
  name: 'QRCode',
  components: {},
  props: {},
  setup() {
    const store = useStore();
    const qrCodeMarkup: Ref<string | null> = ref(null);
    const qrCodeImage: Ref<string | null> = ref(null);

    // SVG markup string
    function getQRCodeMarkup(payload: string): Promise<string> {
      const qrCodeSettings = { errorCorrectionLevel: 'H', type: 'svg', margin: 1 };
      const qrCodeString = QRCodeGenerator.toString(String(payload), qrCodeSettings);

      return qrCodeString;
    }

    // PNG base64 image
    function getQRCodeImage(payload: string) {
      const qrCodeSettings = { errorCorrectionLevel: 'H', width: '200', height: '200', margin: 0 };
      const qrCodeString = QRCodeGenerator.toDataURL(String(payload), qrCodeSettings);

      return qrCodeString;
    }

    function handleClick(isZoomInButton = true) {
      if (isZoomInButton) {
        store.dispatch('increaseZoom');
        return;
      }

      store.dispatch('decreaseZoom');
    }

    onMounted(() => {
      getQRCodeMarkup(store.state.userId)
        .then((markup: string) => {
          setTimeout(() => {
            qrCodeMarkup.value = markup;
          }, 1000);
        })
        .catch((error: Error) => {
          console.log(error);
        });

      getQRCodeImage(store.state.userId)
        .then((markup: string) => {
          setTimeout(() => {
            qrCodeImage.value = markup;
          }, 1000);
        })
        .catch((error: Error) => {
          console.log(error);
        });
    });

    return () => (
      <div class={styles.component}>
        <h2>QRCode (Zoom level {store.state.zoomLevel.toFixed(2)})</h2>
        <>
          {qrCodeMarkup.value === null && <div>Loading QR1</div>}
          {qrCodeMarkup.value !== null && (
            <figure class={styles.qrcode}>
              <div class={styles.image}>
                <div innerHTML={qrCodeMarkup.value} />
              </div>
              <figcaption>{store.state.userId}</figcaption>
            </figure>
          )}
        </>

        <>
          {qrCodeImage.value === null && <div>Loading QR2</div>}
          {qrCodeImage.value !== null && (
            <figure class={styles.qrcode}>
              <img
                class={styles.image}
                src={qrCodeImage.value}
                alt=""
                style={{
                  display: 'block',
                  margin: `calc(1rem + ${store.state.zoomLevel}rem) auto`,
                  transform: `scale(${store.state.zoomLevel})`,
                  transformOrigin: 'center',
                }}
              />
              <figcaption>{store.state.userId}</figcaption>
            </figure>
          )}
        </>

        <div class="button-group">
          <button type="button" onClick={() => handleClick()}>
            Zoom in
          </button>
          <button type="button" onClick={() => handleClick(false)}>
            Zoom out
          </button>
        </div>
      </div>
    );
  },
});
