import { StateType, Mutations, MutationsType } from './types';
import { saveToStorage, getFromStorage } from '../util/storageUtil';

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
    const { orders, currentDateTime } = state;
    const { dateKey } = payload;
    const storageKey = 'coffeescript';

    const ordersForDateKey = dateKey in orders ? orders[dateKey] : [];

    const saveData = {
      orders: {
        [dateKey]: ordersForDateKey,
      },
    };

    const saveDataSerialized = JSON.stringify(saveData, null, 2);

    saveToStorage(storageKey, saveDataSerialized);
  },
  [Mutations.RESTORE_ORDER](state: StateType, payload: { dateKey: string }) {
    const { dateKey } = payload;
    const storageKey = 'coffeescript';

    const savedData = getFromStorage(storageKey, dateKey);

    if (!saveToStorage) {
      return;
    }

    const parsedSavedData: {
      orders: {
        [dateKey: string]: Order[];
      };
    } = JSON.parse(savedData as string);

    const { orders } = parsedSavedData;

    if (!(dateKey in orders)) {
      return;
    }

    const deserializedOrders = orders[dateKey].map((order) => {
      return { ...order, dateTime: new Date(order.dateTime) };
    });

    state.orders = {
      [dateKey]: deserializedOrders,
    };
  },
};

export default mutations;
