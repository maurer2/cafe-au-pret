import { defineStore } from 'pinia'

import { DrinkType, Order } from '../types/store2'
import menuList from '../data/menuList.json';
// import { saveToStorage, storageIsAvailable, hasStorageKey, getFromStorage } from '../util/storageUtil'

import { useDateTimeStore } from './date-time'

// const storageKey = 'coffeescript';

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: {
      // datekey, orders
    } as Record<string, Order[]>,
    menuList,
    maxDailyOrders: 5,
  }),
  getters: {
    getAllMenuEntries: (state): typeof menuList => {
      return [...state.menuList];
    },
    getMenuEntriesOfType: (state): (type: string) => Record<string, string>[] => {
      const drinkTypeKeyValuePairs = Object.entries(DrinkType);
      const drinkTypeValueKeyPairs = drinkTypeKeyValuePairs.map((entry) =>
        [...entry].reverse(),
      );
      const drinkTypes: Record<string, string> = Object.fromEntries(drinkTypeValueKeyPairs);

      return (type) => {
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
    getDailyOrders(state): Order[] { // regular function since accessing this is required
      const dateTimeStore = useDateTimeStore()

      const dateKey = dateTimeStore.getCurrentDateKey
      const hasOrders: boolean = this.hasDailyOrders;

      if (!hasOrders) {
        return [];
      }

      const dailyOrders = state.orders[dateKey];

      return dailyOrders
    },
    getDailyRemainingNumberOfOrders(state): number { // regular function since accessing this is required
      const dailyOrders = this.getDailyOrders;
      const { maxDailyOrders } = state;

      const orderDifference = maxDailyOrders - dailyOrders.length;

      return Math.sign(orderDifference) === 1 ? orderDifference : 0;
    },
  },
  actions: {
    async ADD_DAILY_ORDER(payload: { dateKey: string; order: Order }): Promise<void> {
      const { dateKey, order } = payload;
      const { orders } = this;
      const existingOrders = { ...orders };

      if (!(dateKey in existingOrders)) {
        existingOrders[dateKey] = [];
      }

      // todo check dateTime of order

      existingOrders[dateKey].push(order);

      this.orders = existingOrders;
    },
    async ADD_ORDER(order: Order): Promise<void | Error> {
      const dateTimeStore = useDateTimeStore()

      const dateKey = dateTimeStore.getCurrentDateKey
      const { isBlocked } = dateTimeStore
      const { dateTime } = order;

      if (isBlocked) {
        throw new Error('Blocked');
      } else {
        this.ADD_DAILY_ORDER({ dateKey, order });
        dateTimeStore.SET_BLOCKING_TIMEOUT(dateTime)

        // if (storageIsAvailable()) {
        //   this.PERSIST_ORDER({ dateKey });
        // }
      }
    },
    // async GET_SAVED_ORDERS() {
    //   const dateTimeStore = useDateTimeStore()

    //   const dateKey = dateTimeStore.getCurrentDateKey

    //   this.RESTORE_ORDER({ dateKey });
    // },
    // async PERSIST_ORDER(payload: { dateKey: string }) {
    //   const dateTimeStore = useDateTimeStore()

    //   const { blockingTimeoutEnd } = dateTimeStore

    //   const { orders } = this;
    //   const { dateKey } = payload;

    //   const ordersForDateKey = dateKey in orders ? orders[dateKey] : [];
    //   const blockingTimeoutEndConverted =
    //     blockingTimeoutEnd !== null ? (blockingTimeoutEnd as any).toISOString() : null;

    //   const saveData = {
    //     orders: {
    //       [dateKey]: ordersForDateKey,
    //     },
    //     blockingTimeoutEndConverted,
    //   };

    //   const saveDataSerialized = JSON.stringify(saveData, null, 2);

    //   saveToStorage(storageKey, saveDataSerialized);
    // },
    // async RESTORE_ORDER(payload: { dateKey: string }) {
    //   if (!hasStorageKey) {
    //     return;
    //   }

    //   const dateTimeStore = useDateTimeStore()
    //   const { dateKey } = payload;
    //   const savedData = getFromStorage(storageKey);

    //   if (savedData === null) {
    //     return;
    //   }

    //   const parsedSavedData: {
    //     orders: {
    //       [dateKey: string]: Order[];
    //     };
    //     blockingTimeoutEndConverted: string | null;
    //   } = JSON.parse(savedData as string);

    //   const { orders, blockingTimeoutEndConverted } = parsedSavedData;

    //   if (!(dateKey in orders)) {
    //     return;
    //   }

    //   const deserializedOrders = orders[dateKey].map((order) => {
    //     return { ...order, dateTime: new Date(order.dateTime) };
    //   });

    //   const blockingTimeoutEnd =
    //     blockingTimeoutEndConverted !== null
    //       ? new Date(blockingTimeoutEndConverted)
    //       : null;

    //   this.orders = {
    //     [dateKey]: deserializedOrders,
    //   };


    //   dateTimeStore.SET_BLOCKING_TIMEOUT(blockingTimeoutEnd)
    // },
  },
})
