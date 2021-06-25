import { defineComponent, PropType, toRefs } from 'vue';
import { QRCodeToStringOptions } from 'qrcode';

import useQrCode from '../../../hooks/use-qrcode';

import styles from './qrcode-figure.module.css';

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
    const { userId, zoomLevel } = toRefs(props);
    const qrCodeMarkup = useQrCode(userId.value, qrcodeStyle);

    return () => (
      <>
        {qrCodeMarkup.value ? (
          <figure class={styles.qrcodePicture}>
            <div
              class={styles.qrcodeImageWrapperOuter}
              style={{
                width: `calc(50vw * ${zoomLevel.value})`,
              }}
            >
              {slots.default !== undefined ? slots.default() : null}
              <div
                class={styles.qrcodeImageWrapper}
                innerHTML={qrCodeMarkup.value}
              />
            </div>
            <figcaption class={styles.qrcodeText}>{userId.value}</figcaption>
          </figure>
        ) : (
          <div class={styles.qrcodeLoader}>Loading</div>
        )}
      </>
    );
  },
});
