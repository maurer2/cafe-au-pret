import { StateType, Mutations, MutationsType } from './types';
import {
  saveToStorage,
  getFromStorage,
  hasStorageKey,
} from '../util/storageUtil';

const storageKey = 'coffeescript';

const mutations: MutationsType = {
  [Mutations.UPDATE_ZOOM](state: StateType, change: number) {
    const { zoomLevel } = state;

    if (change === 0) {
      state.zoomLevel = 1;
      return;
    }

    // prettier-ignore
    const newZoomLevel = zoomLevel + (change / 100);
    state.zoomLevel = (Math as any).clamp(newZoomLevel, 0.5, 2.5);
  },
  [Mutations.ADD_DAILY_ORDER](
    state: StateType,
    payload: { dateKey: string; order: Order },
  ) {
    const { dateKey, order } = payload;

    const { orders } = state;
    const newOrders = { ...orders };

    if (!(dateKey in newOrders)) {
      newOrders[dateKey] = [];
    }

    newOrders[dateKey].push(order);

    state.orders = newOrders;
  },
  [Mutations.UPDATE_CURRENT_DATE](state: StateType, dateTime: Date) {
    state.currentDateTime = dateTime;
  },
  [Mutations.SET_BLOCKING_TIMEOUT](state, dateTime: Date) {
    const blockingDurationMs: number = state.blockingDuration * 60 * 1000;
    const startDateMs: number = dateTime.getTime();
    const endDateMs: number = startDateMs + blockingDurationMs;

    const blockingTimeoutEnd = new Date(endDateMs);

    state.blockingTimeoutEnd = blockingTimeoutEnd;
  },
  [Mutations.PERSIST_ORDER](state: StateType, payload: { dateKey: string }) {
    const { orders, blockingTimeoutEnd } = state;
    const { dateKey } = payload;

    const ordersForDateKey = dateKey in orders ? orders[dateKey] : [];
    const blockingTimeoutEndConverted =
      blockingTimeoutEnd !== null ? blockingTimeoutEnd.toISOString() : null;

    const saveData = {
      orders: {
        [dateKey]: ordersForDateKey,
      },
      blockingTimeoutEndConverted,
    };

    const saveDataSerialized = JSON.stringify(saveData, null, 2);

    saveToStorage(storageKey, saveDataSerialized);
  },
  [Mutations.RESTORE_ORDER](state: StateType, payload: { dateKey: string }) {
    if (!hasStorageKey) {
      return;
    }

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

    state.orders = {
      [dateKey]: deserializedOrders,
    };

    state.blockingTimeoutEnd = blockingTimeoutEnd;
  },
};

export default mutations;
