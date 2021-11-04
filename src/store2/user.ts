import { defineStore } from 'pinia'
// @ts-ignore
import clamp from 'core-js/features/math/clamp'

// eslint-disable-next-line import/prefer-default-export
export const useUserStore = defineStore('userStore', {
  state: () => ({
    userId: null as string | null,
    zoomLevel: 1.0,
    zoomLevelMin: 0.5,
    zoomLevelMax: 2.5,
  }),
  getters: {
    getZoomLevelFormatted: (state) => {
      const { zoomLevel } = state;

      return zoomLevel.toFixed(2);
    },
    hasUserId: (state) => {
      const { userId } = state;

      if (userId === null) {
        return false
      }

      return Boolean(userId.length)
    }
  },
  actions: {
    async INCREASE_ZOOM(): Promise<void> {
      const { zoomLevel, zoomLevelMin, zoomLevelMax } = this

      const newZoomLevel = Math.round((zoomLevel + 0.1) * 100) / 100;
      this.zoomLevel = clamp(newZoomLevel, zoomLevelMin, zoomLevelMax)
    },
    async DECREASE_ZOOM(): Promise<void> {
      const { zoomLevel, zoomLevelMin, zoomLevelMax } = this

      const newZoomLevel = Math.round((zoomLevel - 0.1) * 100) / 100;
      this.zoomLevel = clamp(newZoomLevel, zoomLevelMin, zoomLevelMax)
    },
    async RESET_ZOOM(): Promise<void> {
      this.zoomLevel = 1.0
    },
    async SET_USER_ID(newUserId: string): Promise<void> {
      this.userId = newUserId
    },
  },
})
