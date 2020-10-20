import { defineComponent, Teleport } from 'vue';
import styles from './overlay.module.css';
import { useStore } from '../../store';

export default defineComponent({
  name: 'Overlay',
  components: {},
  props: {},
  setup(_, { slots }) {
    const store = useStore();

    return () => (
      <Teleport to="body">
        <div class={styles.overlay}>
          <div class={styles.wrapper}>
            <slot>{slots.overlayContent !== undefined && slots.overlayContent()}</slot>
          </div>
        </div>
      </Teleport>
    );
  },
});
