import { defineComponent, computed, onMounted, ref } from 'vue';
import styles from './progress-bar.module.css';

// import { useStore } from '../../store';

export default defineComponent({
  name: 'ProgressBar',
  props: {},
  setup(_, context) {
    const currentPosition = ref(0);
    // const store = useStore();
    const cssVars = computed(() => {
      return {
        '--progress-animation-duration': '10s',
        '--progress-animation-position': `${currentPosition.value}%`,
      };
    });

    function updateProgressBar() {
      if (currentPosition.value === 0) {
        currentPosition.value = 100;
      } else {
        currentPosition.value = 0;
      }
    }

    onMounted(() => {
      // updateProgressBar();
      // test timeout
      window.setInterval(() => {
        updateProgressBar();
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
      }, 10_000);
    });

    return () => (
      <progress class={styles.progressBar} max="100" value="100" style={cssVars.value as any}>
        <span class="visually-hidden">50%</span>
      </progress>
    );
  },
});
