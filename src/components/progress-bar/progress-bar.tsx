/* eslint-disable no-debugger */
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
    const animationKey = ref(`id-${nanoid(5)}`); // reset animation

    // const currentAnimationState = ref('paused' as Properties<AnimationPlayState>);
    const currentAnimationState = ref('running' as 'paused' | 'running');
    const cssVars = computed(() => {
      return {
        '--progress-animation-duration': `${refreshTimeout.value * 60}s`,
        '--progress-animation-state': `${currentAnimationState.value}`,
      };
    });

    function resetAnimation() {
      animationKey.value = `id-${nanoid(5)}`;
    }

    function startAnimation() {
      if (progressBarDomElement.value === null) {
        return;
      }

      currentAnimationState.value = 'running';
    }

    onMounted(() => {
      if (progressBarDomElement.value === null) {
        throw new Error('progressBarDomElement not found');
      }
    });

    // temp watcher
    watch(currentTime, (newTime) => {
      console.log('update', newTime);
      resetAnimation();
      startAnimation();
    });

    return () => (
      <section class={styles.progressBar}>
        <progress
          ref={progressBarDomElement}
          class={styles.progressBarElement}
          max="100"
          value="100"
          style={cssVars.value as any}
          key={animationKey.value}
        >
          <span class="visually-hidden">50%</span>
        </progress>
      </section>
    );
  },
});
