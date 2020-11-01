import { StateType, Mutations, MutationsType } from './types';

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
  [Mutations.ADD_DAILY_ORDER](state: StateType, payload: { dateKey: string; order: Order }) {
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
};

export default mutations;
