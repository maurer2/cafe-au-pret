import { createStore, ActionContext } from 'vuex';
import { StoreType, StateType, MutationsType, ActionsType } from './types';

const defaultStore: StoreType = {
  namespaced: true as true,
  state: {
    userId: 'ABC123456789',
    zoomLevel: 1.0,
    orders: {
      'YYYY-MM-DD': [
        {
          id: 'psl',
          name: 'PSL',
          dateTime: new Date(),
          tz: 'Europe/London',
        },
      ],
    },
  },
  modules: {},
  mutations: {
    [MutationsType.UPDATE_ZOOM](state: StateType, change: number) {
      const { zoomLevel } = state;

      if (change === 0) {
        state.zoomLevel = 1;
        return;
      }

      // prettier-ignore
      const newZoomLevel = zoomLevel + (change / 100);
      state.zoomLevel = (Math as any).clamp(newZoomLevel, 0.5, 2.5);
    },
    [MutationsType.ADD_DAILY_ORDER](state: StateType, order: Order) {
      const { orders } = state;
      const currentDate = 'YYYY-MM-DD';

      const newOrders = { ...state.orders };

      orders[currentDate].push(order);
    },
  },
  actions: {
    [ActionsType.INCREASE_ZOOM](context: ActionContext<StateType, StateType>): void {
      context.commit(MutationsType.UPDATE_ZOOM, 10);
    },
    [ActionsType.DECREASE_ZOOM](context: ActionContext<StateType, StateType>): void {
      context.commit(MutationsType.UPDATE_ZOOM, -10);
    },
    [ActionsType.RESET_ZOOM](context: ActionContext<StateType, StateType>): void {
      context.commit(MutationsType.UPDATE_ZOOM, 0);
    },
    [ActionsType.ADD_ORDER](context: ActionContext<StateType, StateType>, order: Order): void {
      context.commit(MutationsType.ADD_DAILY_ORDER, order);
    },
  },
  getters: {
    getNumberOfDailyOrders: (state: StateType) => (dateTime: string): number => {
      if (!(dateTime in state.orders)) {
        return 0;
      }

      return state.orders[dateTime].length;
    },
    getDailyOrders: (state: StateType) => (dateTime: string) => {
      if (!(dateTime in state.orders)) {
        return [];
      }
      return state.orders[dateTime];
    },
    hasDailyOrders: (state: StateType) => (dateTime: string): boolean => {
      if (!(dateTime in state.orders)) {
        return false;
      }

      return !!state.orders[dateTime].length;
    },
  },
};

const store = createStore(defaultStore);

export default store;

export function useStore() {
  return store;
}
