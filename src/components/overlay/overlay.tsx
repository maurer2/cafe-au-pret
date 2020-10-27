import { defineComponent, Teleport, Slot } from 'vue';
import styles from './overlay.module.css';

export default defineComponent({
  name: 'Overlay',
  components: {},
  props: {},
  setup(_, { slots }) {
    const content: Maybe<Slot> = slots.overlayContent;

    return () => (
      <Teleport to="body">
        {content ? (
          <div class={styles.overlay}>
            <div class={styles.wrapper}>{content()}</div>
          </div>
        ) : null}
      </Teleport>
    );
  },
});
