import { GettersType } from './types';
import { getTimeFormatted, getDateFormatted } from '../util/dateUtil';

const getters: GettersType = {
  getCurrentDateKey: (state) => {
    const dateString = getters.getCurrentDate(state);

    return dateString.replaceAll('/', '-');
  },
  getCurrentDate: (state) => {
    const { currentDateTime, dateTimeFormatter } = state;

    const dateFormatted = getDateFormatted(dateTimeFormatter, currentDateTime);

    return dateFormatted;
  },
  getCurrentTime: (state) => {
    const { currentDateTime, dateTimeFormatter } = state;

    const timeFormatted = getTimeFormatted(dateTimeFormatter, currentDateTime);

    return timeFormatted;
  },
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

    const currentDate = new Date();
    const previousDate = lastOrder.dateTime;

    console.log(currentDate.getTime() - previousDate.getTime());

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
