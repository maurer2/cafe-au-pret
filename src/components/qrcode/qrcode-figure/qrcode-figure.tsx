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
      color: {
        dark: '#000',
        light: '#fff',
      },
    };

    async function getQRCodeMarkup(payload: string): Promise<string> {
      const qrCodeString = QRCodeGenerator.toString(payload, qrCodeSettings);

      return qrCodeString;
    }

    async function setQRCodeMarkup(): Promise<void> {
      try {
        const markup = await getQRCodeMarkup(props.userId);

        qrCodeMarkup.value = markup;
      } catch (error) {
        console.log(error);
      }
    }

    onMounted(
      async (): Promise<void> => {
        try {
          setQRCodeMarkup();
        } catch (error) {
          console.log(error);
        }
      },
    );

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
