import { defineStore } from 'pinia'

// eslint-disable-next-line import/prefer-default-export
export const useUserStore = defineStore('userStore', {
  state: () => ({
    userId: 'ABC123456789',
    zoomLevel: 1.0,
  }),
  getters: {
    getZoomLevelFormatted: (state) => {
      const { zoomLevel } = state;

      return zoomLevel.toFixed(2);
    }
  },
  actions: {},
})
