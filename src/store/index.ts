import { createStore } from 'vuex';
import { StoreType, SortType } from './types';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import menuList from '../data/menuList.json';

const dateTimeOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', dateTimeOptions);

const defaultStore: StoreType = {
  namespaced: true as true,
  state: {
    userId: 'ABC123456789',
    zoomLevel: 1.0,
    currentDateTime: new Date(),
    dateTimeFormatter,
    orders: {},
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
