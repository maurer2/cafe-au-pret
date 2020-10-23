import { GettersType } from './types';

const getters: GettersType = {
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
};

export default getters;
