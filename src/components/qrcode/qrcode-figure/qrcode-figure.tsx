import { defineComponent, Ref, ref, onMounted } from 'vue';
import QRCodeGenerator, { QRCodeToStringOptions } from 'qrcode';
import styles from './qrcode-figure.module.css';

export default defineComponent({
  name: 'QRCodeFigure',
  props: {
    userId: {
      type: String,
      default: '',
    },
    zoomLevel: {
      type: String,
      default: '',
    },
  },
  emits: [],
  setup(props) {
    const qrCodeMarkup: Ref<string | null> = ref(null);
    const qrCodeSettings: QRCodeToStringOptions = {
      errorCorrectionLevel: 'H',
      type: 'svg',
      margin: 0,
    };

    function getQRCodeMarkup(payload: string): Promise<string> {
      const qrCodeString = QRCodeGenerator.toString(payload, qrCodeSettings);

      return qrCodeString;
    }

    onMounted(() => {
      getQRCodeMarkup(props.userId)
        .then((markup: string) => {
          setTimeout(() => {
            qrCodeMarkup.value = markup;
          }, 0);
        })
        .catch((error: Error) => {
          console.log(error);
        });
    });

    return () => {
      const { zoomLevel, userId } = props;

      return (
        <section class={styles.qrcode}>
          {qrCodeMarkup.value === null && <div>Loading QR code</div>}
          {qrCodeMarkup.value !== null && (
            <figure class={styles.qrcodePicture}>
              <div
                class={styles.qrcodeImageWrapper}
                innerHTML={qrCodeMarkup.value}
                style={{
                  width: `calc(50vw * ${zoomLevel})`,
                }}
              />
              <figcaption class={styles.qrcodeText}>{userId}</figcaption>
            </figure>
          )}
        </section>
      );
    };
  },
});
