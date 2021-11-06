import { defineStore } from 'pinia'

import { DrinkType } from '../types/store2'
import menuList from '../data/menuList.json';
import { saveToStorage, storageIsAvailable, hasStorageKey, getFromStorage } from '../util/storageUtil'

import { useDateTimeStore } from './date-time'

const storageKey = 'coffeescript';

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
  actions: {
    async ADD_DAILY_ORDER(payload: { dateKey: string; order: Order }) {
      const { dateKey, order } = payload;
      const { orders } = this;
      const newOrders = { ...orders };

      if (!(dateKey in newOrders)) {
        newOrders[dateKey] = [];
      }

      newOrders[dateKey].push(order);

      this.orders = newOrders;
    },
    async ADD_ORDER(order: Order) {
      const dateTimeStore = useDateTimeStore()

      const dateKey = dateTimeStore.getCurrentDateKey
      const { isBlocked } = dateTimeStore
      const { dateTime } = order;

      if (isBlocked) {
        throw new Error('Blocked');
      } else {
        this.ADD_DAILY_ORDER({ dateKey, order });
        dateTimeStore.SET_BLOCKING_TIMEOUT(dateTime)

        if (storageIsAvailable()) {
          this.PERSIST_ORDER({ dateKey });
        }
      }
    },
    async GET_SAVED_ORDERS() {
      const dateTimeStore = useDateTimeStore()

      const dateKey = dateTimeStore.getCurrentDateKey

      this.RESTORE_ORDER({ dateKey });
    },
    async PERSIST_ORDER(payload: { dateKey: string }) {
      const dateTimeStore = useDateTimeStore()

      const { blockingTimeoutEnd } = dateTimeStore

      const { orders } = this;
      const { dateKey } = payload;

      const ordersForDateKey = dateKey in orders ? orders[dateKey] : [];
      const blockingTimeoutEndConverted =
        blockingTimeoutEnd !== null ? (blockingTimeoutEnd as any).toISOString() : null;

      const saveData = {
        orders: {
          [dateKey]: ordersForDateKey,
        },
        blockingTimeoutEndConverted,
      };

      const saveDataSerialized = JSON.stringify(saveData, null, 2);

      saveToStorage(storageKey, saveDataSerialized);
    },
    async RESTORE_ORDER(payload: { dateKey: string }) {
      if (!hasStorageKey) {
        return;
      }

      const dateTimeStore = useDateTimeStore()
      const { dateKey } = payload;
      const savedData = getFromStorage(storageKey);

      if (savedData === null) {
        return;
      }

      const parsedSavedData: {
        orders: {
          [dateKey: string]: Order[];
        };
        blockingTimeoutEndConverted: string | null;
      } = JSON.parse(savedData as string);

      const { orders, blockingTimeoutEndConverted } = parsedSavedData;

      if (!(dateKey in orders)) {
        return;
      }

      const deserializedOrders = orders[dateKey].map((order) => {
        return { ...order, dateTime: new Date(order.dateTime) };
      });

      const blockingTimeoutEnd =
        blockingTimeoutEndConverted !== null
          ? new Date(blockingTimeoutEndConverted)
          : null;

      this.orders = {
        [dateKey]: deserializedOrders,
      };


      dateTimeStore.SET_BLOCKING_TIMEOUT(blockingTimeoutEnd)
    },
  },
})
