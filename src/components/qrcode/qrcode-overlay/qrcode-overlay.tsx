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
  setup() {
    const store = useStore();
    const isBlocked = computed((): boolean => store.getters.isBlocked);
    const blockingDurationInMinutes = computed(
      (): number => store.state.blockingDuration,
    );
    const remainingTimeInMs = computed(
      (): number => store.getters.getRemainingBlockingTime,
    );
    const gradientTime = computed(() => {
      return remainingTimeInMs.value / 1000 / 60;
    });
    const gradientPercentage = computed(() => {
      const blockingDurationInMs = blockingDurationInMinutes.value * 60 * 1000;

      if (remainingTimeInMs.value === 0) {
        return 0;
      }

      // prettier-ignore
      const percentages = 100 - ((remainingTimeInMs.value * 100) / blockingDurationInMs)

      return (Math as any).clamp(percentages, 0, 100);
    });
    const gradientDegrees = computed(() => {
      const gradients = (gradientPercentage.value / 100) * 360;

      return (Math as any).clamp(gradients, 0, 360);
    });
    const cssVars = computed(() => ({
      '--gradient-switch': `${gradientDegrees.value}`,
    }));

    return () => (
      <>
        {isBlocked.value ? (
          <div
            class={styles.qrcodeOverlay}
            style={cssVars.value as CSSProperties}
          >
            <div class={styles.qrcodeOverlayValue}>
              <span>{String(gradientTime.value.toFixed(0))} min </span>
              <span>({String(gradientPercentage.value.toFixed(0))}%)</span>
            </div>
          </div>
        ) : null}
      </>
    );
  },
});
