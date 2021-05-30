import {
  defineComponent,
  ref,
  onMounted,
  PropType,
  computed,
  watch,
  onBeforeMount,
  onRenderTriggered,
} from 'vue';
import QRCodeGenerator, { QRCodeToStringOptions } from 'qrcode';
import styles from './qrcode-figure.module.css';
import { useStore } from '../../../store';

import useQrcode from '../../../hooks/useQrcode';

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
    const store = useStore();
    const qrCodeMarkup = useQrcode(props.userId, qrcodeStyle);
    const isBlocked = computed((): boolean => store.getters.isBlocked);
    // const showQrcode = computed((): boolean => qrCodeMarkup !== undefined);
    const qrCodeColorBlocked = ref<string>('#00000');

    onBeforeMount(() => {
      qrCodeColorBlocked.value = getComputedStyle(
        document.documentElement,
      ).getPropertyValue('--concrete');
    });

    /*
    onMounted(
      async (): Promise<void> => {
        try {
          setQRCodeMarkup();
        } catch (error) {
          console.log(error);
        }
      },
    );
    */

    watch(isBlocked, () => {
      // setQRCodeMarkup();
    });

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
