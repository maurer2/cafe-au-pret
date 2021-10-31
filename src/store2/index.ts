import { defineStore } from 'pinia'

import menuList from '../data/menuList.json';

// eslint-disable-next-line import/prefer-default-export
export const useMainStore = defineStore('store2', {
  state: () => ({
    userId: 'ABC123456789',
    zoomLevel: 1.0,
    currentDateTime: new Date(),
    dateTimeFormatter: new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
    orders: {},
    maxDailyOrders: 5,
    menuList,
    blockingDuration: 1,
    blockingTimeoutEnd: null,
    refreshTimeoutInSeconds: 10,
  }),
  getters: {},
  actions: {},
})
