import { createStore } from 'vuex';

const defaultStore = {
  state: {
    pretId: '12345',
  },
  modules: {},
  mutations: {},
  actions: {},
};

const store = createStore(defaultStore);

export default store;

export function useStore() {
  return store;
}
