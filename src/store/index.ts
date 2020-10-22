import { createStore } from 'vuex';
import { StoreType, StateType, MutationsType, ActionsType, SortType } from './types';
import menuList from '../data/menuList.json';

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
    maxDailyOrders: 5,
    sortType: SortType.popularity,
    menuList,
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
    [MutationsType.ADD_DAILY_ORDER](
      state: StateType,
      { dateTime, order }: { dateTime: string; order: Order },
    ) {
      const { orders } = state;
      const newOrders = { ...orders };

      newOrders[dateTime].push(order);

      state.orders = newOrders;
    },
  },
  actions: {
    async [ActionsType.INCREASE_ZOOM](context) {
      context.commit(MutationsType.UPDATE_ZOOM, 10);
    },
    async [ActionsType.DECREASE_ZOOM](context) {
      context.commit(MutationsType.UPDATE_ZOOM, -10);
    },
    async [ActionsType.RESET_ZOOM](context) {
      context.commit(MutationsType.UPDATE_ZOOM, 0);
    },
    async [ActionsType.ADD_ORDER](context, order: Order) {
      const dateTime = 'YYYY-MM-DD';

      context.commit(MutationsType.ADD_DAILY_ORDER, { dateTime, order });
    },
  },
  getters: {
    getNumberOfDailyOrders: (state) => (dateTime) => {
      if (!(dateTime in state.orders)) {
        return 0;
      }

      return state.orders[dateTime].length;
    },
    getDailyOrders: (state) => (dateTime) => {
      if (!(dateTime in state.orders)) {
        return [];
      }
      return state.orders[dateTime];
    },
    hasDailyOrders: (state) => (dateTime) => {
      if (!(dateTime in state.orders)) {
        return false;
      }

      return !!state.orders[dateTime].length;
    },
    getDailyRemainingNumberOfOrders: (state) => (dateTime) => {
      const { maxDailyOrders } = state;

      if (!(dateTime in state.orders)) {
        return maxDailyOrders;
      }

      const orderDifference = maxDailyOrders - state.orders[dateTime].length;

      return Math.sign(orderDifference) === 1 ? orderDifference : 0;
    },
    getMenuListSortedByPopularity: (state) => {
      const sortedList = [...state.menuList];

      return sortedList;
    },
    getMenuListSortedByAlphabet: (state) => {
      const sortedList = [...state.menuList].sort((entry1, entry2) =>
        entry1.name.localeCompare(entry2.name),
      );

      return sortedList;
    },
  },
};

const store = createStore(defaultStore);

export default store;

export function useStore() {
  return store;
}
