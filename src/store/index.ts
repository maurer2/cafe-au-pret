import { createStore } from 'vuex';

const defaultStore = {
  state: {
    userId: 'ABC123456789',
    zoomLevel: 1.0,
  },
  modules: {},
  mutations: {
    increaseZoom(state: any) {
      state.zoomLevel = Math.clamp(state.zoomLevel + 0.1, 0, 2);
    },
    decreaseZoom(state: any) {
      state.zoomLevel = Math.clamp(state.zoomLevel - 0.1, 0, 2);
    },
  },
  actions: {
    increaseZoom(context: any) {
      context.commit('increaseZoom');
    },
    decreaseZoom(context: any) {
      context.commit('decreaseZoom');
    },
  },
};

const store = createStore(defaultStore);

export default store;

export function useStore() {
  return store;
}
