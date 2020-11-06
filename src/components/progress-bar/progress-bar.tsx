/* eslint-disable no-debugger */
import { defineComponent, computed, onMounted, ref, watch } from 'vue';
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

    // const currentAnimationState = ref('paused' as Properties<AnimationPlayState>);
    const currentAnimationState = ref('paused' as 'paused' | 'running');
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

      currentAnimationState.value = 'paused';
      progressBarDomElement.value.getBoundingClientRect();
      currentAnimationState.value = 'running';
    }

    function endAnimation() {
      currentAnimationState.value = 'paused';
    }

    onMounted(() => {
      if (progressBarDomElement.value === null) {
        throw new Error('progressBarDomElement not found');
      }
    });

    // temp watcher
    watch(currentTime, (newTime) => {
      console.log('update', newTime);
      startAnimation();
    });

    return () => (
      <>
        <progress
          ref={progressBarDomElement}
          class={styles.progressBar}
          max="100"
          value="100"
          style={cssVars.value as any}
        >
          <span class="visually-hidden">50%</span>
        </progress>
      </>
    );
  },
});
