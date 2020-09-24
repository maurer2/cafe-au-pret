import { defineComponent, Ref, ref, onMounted } from 'vue';
import QRCodeGenerator from 'qrcode';
import styles from './qrcode.module.css';

export default defineComponent({
  name: 'QRCode',
  components: {},
  props: {},
  setup() {
    const payload = 'ABC123456789';
    const qrCodeDomElement: Ref<SVGElement | null> = ref(null);
    const qrCodeMarkup: Ref<string | null> = ref(null);

    onMounted(() => {
      if (qrCodeDomElement.value === null) {
        // throw new Error('barcode dom element is missing');
      }

      QRCodeGenerator.toString(payload)
        .then((markup: string) => {
          setTimeout(() => {
            qrCodeMarkup.value = markup;
          }, 1000);
        })
        .catch((error: Error) => {
          console.log(error);
        });
    });

    return () => (
      <div class={styles.component}>
        <h2>QRCode</h2>
        <span>{String(qrCodeMarkup.value === null)}</span>
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
