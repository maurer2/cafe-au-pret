import { defineComponent, ref, onMounted, PropType } from 'vue';
import QRCodeGenerator, { QRCodeToStringOptions } from 'qrcode';
import styles from './qrcode-figure.module.css';

export default defineComponent({
  name: 'QRCodeFigure',
  props: {
    userId: {
      type: String as PropType<string>,
      default: '',
    },
    zoomLevel: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const qrCodeMarkup = ref(undefined as string | undefined);
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
          }, 500);
        })
        .catch((error: Error) => {
          console.log(error);
        });
    });

    return () => {
      const { zoomLevel, userId } = props;

      return (
        <>
          {qrCodeMarkup.value ? (
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
          ) : (
            <div class={styles.qrcodeLoader}>Loading</div>
          )}
        </>
      );
    };
  },
});
