/* eslint-disable no-debugger */
import { defineComponent, computed, onMounted, ref } from 'vue';
// import { Properties } from 'csstype';
import styles from './progress-bar.module.css';

// import { useStore } from '../../store';

export default defineComponent({
  name: 'ProgressBar',
  props: {},
  setup() {
    // const currentAnimationState = ref('paused' as Properties<AnimationPlayState>);
    const currentAnimationState = ref('paused' as 'paused' | 'running');
    // const store = useStore();
    const cssVars = computed(() => {
      return {
        '--progress-animation-duration': '5s',
        '--progress-animation-state': `${currentAnimationState.value}`,
      };
    });

    onMounted(() => {
      // updateProgressBar();
      // test timeout
      window.setInterval(() => {
        const refElement = document.querySelector('#progress-bar');

        if (!refElement) {
          return;
        }
        currentAnimationState.value = 'paused';
        refElement.getBoundingClientRect();
        window.setTimeout(() => {
          currentAnimationState.value = 'running';
        }, 100);
        // updateProgressBar();
        /*
        if (currentPosition.value === 0) {
          currentPosition.value = 100;
        } else {
          currentPosition.value = 0;
        }
        */
        // currentPosition.value = 0;
        // document.body.getBoundingClientRect();
        // currentPosition.value = 100;
        // currentPosition.value *= -1;
      }, 5_000);
    });

    return () => (
      <progress
        id="progress-bar"
        class={styles.progressBar}
        max="100"
        value="100"
        style={cssVars.value as any}
      >
        <span class="visually-hidden">50%</span>
      </progress>
    );
  },
});
