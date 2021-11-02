/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia'

import { DrinkType } from '../types/store2'
import menuList from '../data/menuList.json';

import { useDateTimeStore } from './date-time'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: {
    } as Record<string, any[]>,
    menuList,
    maxDailyOrders: 5,

  }),
  getters: {
    getAllMenuEntries: (state) => {
      return [...state.menuList];
    },
    getMenuEntriesOfType: (state) => {
      const drinkTypeKeyValuePairs = Object.entries(DrinkType);
      const drinkTypeValueKeyPairs = drinkTypeKeyValuePairs.map((entry) =>
        [...entry].reverse(),
      );
      const drinkTypes = Object.fromEntries(drinkTypeValueKeyPairs);

      return (type: string) => {
        if (!(type in drinkTypes)) {
          return [];
        }

        const keyMapped = drinkTypes[type];
        const filteredList = state.menuList.filter(
          (entry) => entry.type === keyMapped,
        );

        return filteredList;
      }
    },
    hasDailyOrders: (state): boolean => {
      const dateTimeStore = useDateTimeStore()

      const dateKey = dateTimeStore.getCurrentDateKey

      if (!(dateKey in state.orders)) {
        return false;
      }

      return Boolean(state.orders[dateKey].length);
    },
    getDailyOrders: (state): any[] => {
      const dateTimeStore = useDateTimeStore()

      const dateKey = dateTimeStore.getCurrentDateKey
      const hasOrders: boolean = (this as any).hasDailyOrders;

      if (!hasOrders) {
        return [];
      }

      return state.orders[dateKey];
    },
    getDailyRemainingNumberOfOrders: (state): number => {
      const dailyOrders = (this as any).getDailyOrders(state);
      const hasOrders: boolean = (this as any).hasDailyOrders(state);

      const { maxDailyOrders } = state;

      if (!hasOrders) {
        return maxDailyOrders;
      }

      const orderDifference = maxDailyOrders - dailyOrders.length;

      return Math.sign(orderDifference) === 1 ? orderDifference : 0;
    },
  },
  actions: {},
})
