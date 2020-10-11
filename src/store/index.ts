import { createStore } from 'vuex';

const defaultStore = {
  state: {
    userId: 'ABC123456789',
    zoomLevel: 1.0,
  },
  modules: {},
  mutations: {
    updateZoom(state: any, change: number) {
      const { zoomLevel } = state;

      if (change === 0) {
        state.zoomLevel = 1;
        return;
      }

      // prettier-ignore
      const newZoomLevel = zoomLevel + (change / 100);
      state.zoomLevel = (Math as any).clamp(newZoomLevel, 0.5, 2.5);
    },
  },
  actions: {
    increaseZoom(context: any) {
      context.commit('updateZoom', 10);
    },
    decreaseZoom(context: any) {
      context.commit('updateZoom', -10);
    },
    resetZoom(context: any) {
      context.commit('updateZoom', 0);
    },
  },
};

const store = createStore(defaultStore);

export default store;

export function useStore() {
  return store;
}
