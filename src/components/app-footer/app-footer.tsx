import { defineComponent } from 'vue';
// import styled from 'vue-styled-components';
// import * as Styles from './app-footer.styles';
import { useStore } from '../../store';

/*
export const Test = styled.span`
  display: block;
  background: red;
`;
*/

export default defineComponent({
  name: 'AppFooter',
  components: {
    // 'styled-test': Styles.Test,
    // 'styled-test': Test2,
    // Test,
  },
  props: {},
  setup() {
    const store = useStore();

    // console.log(store.state);

    return () => (
      <div>
        <footer class="footer">AppFooter</footer>
      </div>
    );
  },
});
