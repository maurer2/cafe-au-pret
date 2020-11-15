import { defineComponent, computed, onMounted, ref, onUnmounted } from 'vue';

import styles from './progress-bar.module.css';

import { useStore } from '../../store';
import { Mutations } from '../../store/types';

export default defineComponent({
  name: 'ProgressBar',
  props: {},
  setup() {
    const store = useStore();
    const refreshTimeout = computed(() => store.state.refreshTimeoutInMinutes);
    const progressBarAnimationDomElement = ref<HTMLElement | null>(null);
    const progressBarAnimation = ref<null | Animation>(null);
    const progressBarValue = ref(0);
    const intervalId = ref(-1);
    const storeSubscription = ref();

    const animationKeyframes: Keyframe[] = [
      { transform: 'translateX(0%)' },
      { transform: 'translateX(100%)' },
    ];

    const animationOptions: KeyframeAnimationOptions = {
      duration: refreshTimeout.value * 60 * 1000,
      iterations: 1,
      easing: 'linear',
    };

    const animationState = ref<AnimationPlayState>('paused');

    function startAnimation() {
      if (progressBarAnimation.value === null) {
        return;
      }

      progressBarAnimation.value.play();
      animationState.value = 'running';

      console.log('play');
    }

    function resetAnimation() {
      if (progressBarAnimation.value === null) {
        return;
      }

      progressBarAnimation.value.finish();
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

    storeSubscription.value = store.subscribe((mutation) => {
      if (mutation.type === Mutations.UPDATE_CURRENT_DATE) {
        resetAnimation();
        startAnimation();
        updateProgressBarValues();
      }
    });

    onMounted(() => {
      if (progressBarAnimationDomElement.value === null) {
        throw new Error('progressBarAnimationDomElement not found');
      }

      if (!('animate' in progressBarAnimationDomElement.value)) {
        return;
      }

      progressBarAnimation.value = progressBarAnimationDomElement.value.animate(
        animationKeyframes,
        animationOptions,
      );

      progressBarAnimation.value.pause();
    });

    onUnmounted(() => {
      if (intervalId.value !== -1) {
        window.clearInterval(intervalId.value);
      }

      // unsubscribe
      storeSubscription.value();

      if (progressBarAnimation.value !== null) {
        progressBarAnimation.value.cancel();
      }
    });

    return () => (
      <div class={styles.progressBar}>
        <div class={styles.progressBarElementInner} ref={progressBarAnimationDomElement} />
        <progress class={styles.progressBarElement} max="100" value={progressBarValue.value}>
          {progressBarValue.value}%
        </progress>
      </div>
    );
  },
});
