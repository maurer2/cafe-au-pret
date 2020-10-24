import { createStore } from 'vuex';
import { StoreType, SortType } from './types';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
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
    isBlocked: false,
    blockingDuration: 30,
  },
  modules: {},
  mutations,
  actions,
  getters,
};

const store = createStore(defaultStore);

export default store;

export function useStore() {
  return store;
}
