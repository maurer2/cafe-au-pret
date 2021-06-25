import { GetterTree } from 'vuex';
// eslint-disable-next-line import/named
import { GettersType, DrinkType, StateType } from './types';
import {
  getTimeFormatted,
  getDateFormatted,
  getCurrentDateISO,
} from '../util/dateUtil';

const getters: GetterTree<StateType, StateType> & GettersType = {
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

    const differenceInMS =
      blockingTimeoutEnd.getTime() - currentDateTime.getTime();

    return Math.sign(differenceInMS) === 1;
  },
  getRemainingBlockingTime: (state) => {
    const { blockingTimeoutEnd, currentDateTime } = state;

    if (!blockingTimeoutEnd) {
      return 0;
    }

    const differenceInMS =
      blockingTimeoutEnd.getTime() - currentDateTime.getTime();

    return Math.sign(differenceInMS) === 1 ? differenceInMS : 0;
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
  getAllMenuEntries: (state) => {
    return [...state.menuList];
  },
  getMenuEntriesOfType: (state) => (type) => {
    const drinkTypeKeyValuePairs = Object.entries(DrinkType);
    const drinkTypeValueKeyPairs = drinkTypeKeyValuePairs.map((entry) =>
      [...entry].reverse(),
    );
    const drinkTypes = Object.fromEntries(drinkTypeValueKeyPairs);

    if (!(type in drinkTypes)) {
      return [];
    }

    const keyMapped = drinkTypes[type];
    const filteredList = state.menuList.filter(
      (entry) => entry.type === keyMapped,
    );

    return filteredList;
  },
  getZoomLevelFormatted: (state) => {
    const { zoomLevel } = state;

    return zoomLevel.toFixed(2);
  },
};

export default getters;
