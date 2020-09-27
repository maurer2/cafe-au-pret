import { createStore } from 'vuex';

const defaultStore = {
  state: {
    userId: 'ABC123456789',
    zoomLevel: 1,
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
