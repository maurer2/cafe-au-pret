import { defineComponent, PropType, computed } from 'vue';
import styles from './qrcode-overlay.module.css';

export default defineComponent({
  name: 'QRCodeOverlay',
  props: {
    percentageDone: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  setup(props) {
    const gradientEndValue = computed(() => {
      return (props.percentageDone * 360) / 100;
    });
    const cssVars = computed(() => ({
      '--gradient-end': `${gradientEndValue.value}`,
    }));

    return () => (
      <div class={styles.qrcodeOverlay} style={cssVars.value as any}>
        <span class={styles.qrcodeOverlayValue}>{String(gradientEndValue.value)}</span>
      </div>
    );
  },
});
