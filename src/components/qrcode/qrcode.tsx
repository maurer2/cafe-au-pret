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
    const payload = 'ABC123456789';
    const qrCodeMarkup: Ref<string | null> = ref(null);

    function getQRCodeMarkup(): Promise<string> {
      const qrCodeSettings = { errorCorrectionLevel: 'H', type: 'svg' };
      return QRCodeGenerator.toString(payload, qrCodeSettings);
    }

    onMounted(() => {
      getQRCodeMarkup()
        .then((markup: string) => {
          setTimeout(() => {
            qrCodeMarkup.value = markup;
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
        {qrCodeMarkup.value === null && <div>Loading QR</div>}
        {qrCodeMarkup.value !== null && (
          <figure>
            <div class={styles.qrcode} innerHTML={qrCodeMarkup.value} />
            <figcaption>{payload}</figcaption>
          </figure>
        )}
      </div>
    );
  },
});
