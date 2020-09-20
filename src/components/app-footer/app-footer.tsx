import { defineComponent } from 'vue';
import styled from 'vue-styled-components';
// import * as Styles from './app-footer.styles';

export const Test = styled.span`
  display: block;
  background: red;
`;

export default defineComponent({
  name: 'AppFooter',
  components: {
    // 'styled-test': Styles.Test,
    // 'styled-test': Test2,
    Test,
  },
  props: {},
  setup() {
    return () => (
      <Test>
        <footer class="footer">AppFooter</footer>
      </Test>
    );
  },
});
