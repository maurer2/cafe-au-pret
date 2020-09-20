import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppFooter',
  props: {},
  setup() {
    return () => <footer class="footer">AppFooter</footer>;
  },
});
