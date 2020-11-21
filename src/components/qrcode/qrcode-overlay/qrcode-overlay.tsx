import { defineComponent, PropType, computed, CSSProperties } from 'vue';
import { useStore } from '../../../store';
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
    const store = useStore();
    const remainingTime = computed((): number => store.getters.getRemainingBlockingTime);
    const gradientPercentage = computed(() => {
      return (props.percentageDone * 360) / 100;
    });
    const gradientTime = computed(() => {
      return remainingTime.value / 1000 / 60;
    });
    const cssVars = computed(() => ({
      '--gradient-switch': `${gradientPercentage.value}`,
    }));

    return () => (
      <div class={styles.qrcodeOverlay} style={cssVars.value as CSSProperties}>
        <span class={styles.qrcodeOverlayValue}>
          {String(gradientTime.value.toFixed(0))} Minutes
        </span>
      </div>
    );
  },
});
