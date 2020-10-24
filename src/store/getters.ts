import { GettersType } from './types';

const getters: GettersType = {
  getNumberOfDailyOrders: (state) => (dateTime) => {
    if (!(dateTime in state.orders)) {
      return 0;
    }

    return state.orders[dateTime].length;
  },
  getDailyOrders: (state, gettersList) => (dateTime) => {
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
  hasOrderWithinBlockingDuration: (state, gettersList) => (dateTime) => {
    const { blockingDuration } = state;
    const hasOrdersForDateTime = gettersList.hasDailyOrders(dateTime as any);

    if (!hasOrdersForDateTime) {
      return false;
    }

    const dailyOrdersCB = getters.getDailyOrders(state, gettersList);
    const dailyOrders = dailyOrdersCB(dateTime);

    const [lastOrder] = dailyOrders.slice(-1);

    // const hasDailyOrdersToday = gettersList.hasDailyOrders(state)(dateTime);

    console.log(lastOrder);

    return false;
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
