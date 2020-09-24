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
    let qrCodeMarkup: string | null = null;

    onMounted(() => {
      if (qrCodeDomElement.value === null) {
        // throw new Error('barcode dom element is missing');
      }

      QRCodeGenerator.toString(payload)
        .then((markup: string) => {
          console.log(markup);
          qrCodeMarkup = markup;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return () => (
      <div class={styles.component}>
        <h2>QRCode</h2>
        <span>{String(qrCodeMarkup === null)}</span>
      </div>
    );
  },
});
