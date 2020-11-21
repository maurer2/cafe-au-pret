import { defineComponent, PropType, computed, CSSProperties } from 'vue';
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
    const gradientPercentage = computed(() => {
      return (props.percentageDone * 360) / 100;
    });
    const gradientTime = computed(() => {
      return (props.percentageDone * 360) / 100;
    });
    const cssVars = computed(() => ({
      '--gradient-switch': `${gradientPercentage.value}`,
    }));

    return () => (
      <div class={styles.qrcodeOverlay} style={cssVars.value as CSSProperties}>
        <span class={styles.qrcodeOverlayValue}>{String(gradientPercentage.value)}%</span>
      </div>
    );
  },
});
