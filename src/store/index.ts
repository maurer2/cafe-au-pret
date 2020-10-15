import { createStore, ActionContext } from 'vuex';
import { storeType, MutationsType, ActionsType } from './types';

type stateType = storeType['state'];

const defaultStore: storeType = {
  state: {
    userId: 'ABC123456789',
    zoomLevel: 1.0,
    orders: {
      'YYYY-MM-DD': [
        {
          id: String(Math.random()),
          name: `name-${Math.random().toPrecision(2)}`,
          dateTime: new Date(),
          tz: 'Europe/London',
        },
      ],
    },
  },
  modules: {},
  mutations: {
    [MutationsType.UPDATE_ZOOM](state: stateType, change: number) {
      const { zoomLevel } = state;

      if (change === 0) {
        state.zoomLevel = 1;
        return;
      }

      // prettier-ignore
      const newZoomLevel = zoomLevel + (change / 100);
      state.zoomLevel = (Math as any).clamp(newZoomLevel, 0.5, 2.5);
    },
    [MutationsType.ADD_DAILY_ORDER](state: stateType, order: Order) {
      const { orders } = state;
      const currentDate = 'YYYY-MM-DD';

      const newOrders = { ...state.orders };

      orders[currentDate].push(order);
    },
  },
  actions: {
    [ActionsType.INCREASE_ZOOM](context: ActionContext<stateType, stateType>): void {
      context.commit(MutationsType.UPDATE_ZOOM, 10);
    },
    [ActionsType.DECREASE_ZOOM](context: ActionContext<stateType, stateType>): void {
      context.commit(MutationsType.UPDATE_ZOOM, -10);
    },
    [ActionsType.RESET_ZOOM](context: ActionContext<stateType, stateType>): void {
      context.commit(MutationsType.UPDATE_ZOOM, 0);
    },
    [ActionsType.ADD_ORDER](context: ActionContext<stateType, stateType>, order: Order): void {
      context.commit(MutationsType.ADD_DAILY_ORDER, order);
    },
  },
};

const store = createStore(defaultStore);

export default store;

export function useStore() {
  return store;
}
