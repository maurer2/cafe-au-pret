import { GettersType } from './types';
import { getTimeFormatted, getDateFormatted, getCurrentDateISO } from '../util/dateUtil';

const getters: GettersType = {
  getCurrentDateKey: (state) => {
    const { currentDateTime, dateTimeFormatter } = state;

    const isoString = getCurrentDateISO(dateTimeFormatter, currentDateTime);

    return isoString;
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
  /*
  getNumberOfDailyOrders: (state) => (dateTime) => {
    if (!(dateTime in state.orders)) {
      return 0;
    }

    return state.orders[dateTime].length;
  },
  */
  hasDailyOrders: (state) => {
    const dateKey = getters.getCurrentDateKey(state);

    if (!(dateKey in state.orders)) {
      return false;
    }

    return !!state.orders[dateKey].length;
  },
  getDailyOrders: (state) => {
    const dateKey = getters.getCurrentDateKey(state);
    const hasOrders = getters.hasDailyOrders(state);

    if (!hasOrders) {
      return [];
    }

    return state.orders[dateKey];
  },
  isBlocked: (state) => {
    const { blockingTimeoutEnd, currentDateTime } = state;

    if (!blockingTimeoutEnd) {
      return false;
    }

    const differenceMS = blockingTimeoutEnd.getTime() - currentDateTime.getTime();

    return Math.sign(differenceMS) === 1;
  },
  getDailyRemainingNumberOfOrders: (state) => {
    const dailyOrders = getters.getDailyOrders(state);
    const hasOrders = getters.hasDailyOrders(state);

    const { maxDailyOrders } = state;

    if (!hasOrders) {
      return maxDailyOrders;
    }

    const orderDifference = maxDailyOrders - dailyOrders.length;

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
  getZoomLevelFormatted: (state) => {
    const { zoomLevel } = state;

    return zoomLevel.toFixed(2);
  },
};

export default getters;
