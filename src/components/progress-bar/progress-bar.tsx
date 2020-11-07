import { defineComponent, computed, onMounted, ref, watch } from 'vue';
import { nanoid } from 'nanoid';

// import { Properties } from 'csstype';
import styles from './progress-bar.module.css';

import { useStore } from '../../store';

export default defineComponent({
  name: 'ProgressBar',
  props: {},
  setup() {
    const store = useStore();
    const currentTime = computed(() => store.getters.getCurrentTime as string);
    const refreshTimeout = computed(() => store.state.refreshTimeoutInMinutes as number);
    const progressBarDomElement = ref(null as HTMLElement | null);
    const animationKey = ref(`key-${nanoid(5)}`); // reset animation
    const progressBarValue = ref(0);
    // const currentAnimationState = ref('paused' as Properties<AnimationPlayState>);
    const currentAnimationState = ref('running' as 'paused' | 'running');
    const cssVars = computed(() => {
      return {
        '--progress-animation-duration': `${refreshTimeout.value * 60}s`,
        '--progress-animation-state': `${currentAnimationState.value}`,
      };
    });
    let intervalId = -1;

    function resetAnimation() {
      animationKey.value = `key-${nanoid(5)}`;
    }

    function startAnimation() {
      if (progressBarDomElement.value === null) {
        return;
      }

      currentAnimationState.value = 'running';
    }

    function updateProgressBarValues() {
      const timeoutInMS = refreshTimeout.value * 60 * 1000;
      const parts = 10;
      let index = 1;
      progressBarValue.value = 0;

      window.clearInterval(intervalId);

      intervalId = window.setInterval(() => {
        progressBarValue.value = index * parts;

        index += 1;
      }, timeoutInMS / parts);
    }

    onMounted(() => {
      if (progressBarDomElement.value === null) {
        throw new Error('progressBarDomElement not found');
      }

      updateProgressBarValues();
    });

    // temp watcher
    watch(currentTime, (newTime) => {
      console.log('update', newTime);
      updateProgressBarValues();
      resetAnimation();
      startAnimation();
    });

    return () => (
      <section class={styles.progressBar}>
        <progress
          ref={progressBarDomElement}
          class={styles.progressBarElement}
          max="100"
          value={progressBarValue.value}
          style={cssVars.value as any}
          key={animationKey.value}
        >
          <span class={styles.progressBarValue}>{progressBarValue.value}%</span>
        </progress>
      </section>
    );
  },
});
