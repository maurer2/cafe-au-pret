import { defineComponent, Ref, ref, onMounted, onUpdated } from 'vue';
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
      const qrCodeSettings = { errorCorrectionLevel: 'H', width: '200', height: '200' };
      const qrCodeString = QRCodeGenerator.toDataURL(String(payload), qrCodeSettings);

      return qrCodeString;
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

    onUpdated(() => {
      console.log('updated');
    });

    return () => (
      <div class={styles.component}>
        <h2>QRCode</h2>
        <>
          {qrCodeMarkup.value === null && <div>Loading QR1</div>}
          {qrCodeMarkup.value !== null && (
            <figure>
              <div class={styles.qrcode} innerHTML={qrCodeMarkup.value} />
              <figcaption>{store.state.userId}</figcaption>
            </figure>
          )}
        </>

        <>
          {qrCodeImage.value === null && <div>Loading QR1</div>}
          {qrCodeImage.value !== null && (
            <figure>
              <div
                class={styles.qrcode}
                style={{
                  width: '200px',
                  height: '200px',
                  margin: 'auto',
                  background: `url(${qrCodeImage.value}) no-repeat`,
                }}
              />
              <figcaption>{store.state.userId}</figcaption>
            </figure>
          )}
        </>
      </div>
    );
  },
});
