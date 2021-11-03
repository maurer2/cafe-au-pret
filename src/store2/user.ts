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
  actions: {
    async INCREASE_ZOOM(): Promise<void> {
      // prettier-ignore
      const newZoomLevel = this.zoomLevel + (10 / 100);
      this.zoomLevel = (Math as any).clamp(newZoomLevel, 0.5, 2.5);
    },
    async DECREASE_ZOOM() {
      // prettier-ignore
      const newZoomLevel = this.zoomLevel + (-10 / 100);
      this.zoomLevel = (Math as any).clamp(newZoomLevel, 0.5, 2.5);
    },
    async RESET_ZOOM() {
      this.zoomLevel = 1.0
    },
  },
})
