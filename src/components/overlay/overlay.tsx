import { defineComponent, ref, computed, Teleport } from 'vue';
import styles from './overlay.module.css';
import { useStore } from '../../store';

export default defineComponent({
  name: 'Overlay',
  components: {},
  props: {},
  setup() {
    const store = useStore();

    return () => (
      <Teleport to="body">
        <div class={styles.overlay}>
          <div class={styles.wrapper}>
            <template>Overlay</template>
          </div>
        </div>
      </Teleport>
    );
  },
});
