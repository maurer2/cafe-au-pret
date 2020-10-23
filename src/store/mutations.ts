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
  [Mutations.ADD_DAILY_ORDER](
    state: StateType,
    { dateTime, order }: { dateTime: string; order: Order },
  ) {
    const { orders } = state;
    const newOrders = { ...orders };

    newOrders[dateTime].push(order);

    state.orders = newOrders;
  },
};

export default mutations;
