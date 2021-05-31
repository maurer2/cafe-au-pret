import { defineComponent, PropType } from 'vue';
import { QRCodeToStringOptions } from 'qrcode';
import styles from './qrcode-figure.module.css';
import useQrcode from '../../../hooks/use-qrcode';

const qrcodeStyle: QRCodeToStringOptions = {
  errorCorrectionLevel: 'H',
  type: 'svg',
  margin: 0,
  color: {
    dark: '#000',
    light: '#fff',
  },
};

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
  setup(props, { slots }) {
    const qrCodeMarkup = useQrcode(props.userId, qrcodeStyle);

    return () => {
      const { zoomLevel, userId } = props;

      return (
        <>
          {qrCodeMarkup.value ? (
            <figure class={styles.qrcodePicture}>
              <div
                class={styles.qrcodeImageWrapperOuter}
                style={{
                  width: `calc(50vw * ${zoomLevel})`,
                }}
              >
                {slots.default !== undefined ? slots.default() : null}
                <div
                  class={styles.qrcodeImageWrapper}
                  innerHTML={qrCodeMarkup.value}
                />
              </div>
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
