import { defineComponent, computed, onMounted, ref, onUnmounted } from 'vue';
import { nanoid } from 'nanoid';

// import { Properties } from 'csstype';
import styles from './progress-bar.module.css';

import { useStore } from '../../store';
import { Mutations } from '../../store/types';

export default defineComponent({
  name: 'ProgressBar',
  props: {},
  setup() {
    const store = useStore();
    const refreshTimeout = computed(() => store.state.refreshTimeoutInMinutes as number);
    const progressBarDomElement = ref(null as HTMLElement | null);
    const animationKey = ref(`key-${nanoid(5)}`);
    const progressBarValue = ref(0);
    const intervalId = ref(-1);

    // const currentAnimationState = ref('paused' as Properties<AnimationPlayState>);
    const currentAnimationState = ref('running' as 'paused' | 'running');
    const cssVars = computed(() => {
      return {
        '--progress-animation-duration': `${refreshTimeout.value * 60}s`,
        '--progress-animation-state': `${currentAnimationState.value}`,
      };
    });

    function startAnimation() {
      if (progressBarDomElement.value === null) {
        return;
      }

      currentAnimationState.value = 'running';
    }

    function resetAnimation() {
      animationKey.value = `key-${nanoid(5)}`;
    }

    function updateProgressBarValues() {
      const timeoutInMS = refreshTimeout.value * 60 * 1000;
      const parts = 20;
      let step = 1;

      progressBarValue.value = 0;

      if (intervalId.value !== -1) {
        window.clearInterval(intervalId.value);
      }

      intervalId.value = window.setInterval(() => {
        progressBarValue.value = (100 / parts) * step;
        step += 1;
      }, timeoutInMS / parts);
    }

    store.subscribe((mutation) => {
      if (mutation.type === Mutations.UPDATE_CURRENT_DATE) {
        updateProgressBarValues();
        resetAnimation();
        startAnimation();
      }
    });

    onMounted(() => {
      if (progressBarDomElement.value === null) {
        throw new Error('progressBarDomElement not found');
      }
    });

    onUnmounted(() => {
      if (intervalId.value !== -1) {
        window.clearInterval(intervalId.value);
      }
    });

    return () => (
      <div class={styles.progressBar} style={cssVars.value as any} key={animationKey.value}>
        <progress
          ref={progressBarDomElement}
          class={styles.progressBarElement}
          max="100"
          value={progressBarValue.value}
        >
          {progressBarValue.value}%
        </progress>
      </div>
    );
  },
});
