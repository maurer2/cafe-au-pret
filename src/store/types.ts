import { ActionContext } from 'vuex';

export enum Mutations {
  UPDATE_ZOOM = 'UPDATE_ZOOM',
  ADD_DAILY_ORDER = 'ADD_DAILY_ORDER',
  UPDATE_CURRENT_DATE = 'UPDATE_CURRENT_DATE',
  SET_BLOCKING_TIMEOUT = 'SET_BLOCKING_TIMEOUT',
}

export type MutationsType = {
  [key in keyof typeof Mutations]: (state: StateType, payload?: any) => void;
};

export enum Actions {
  INCREASE_ZOOM = 'INCREASE_ZOOM',
  DECREASE_ZOOM = 'DECREASE_ZOOM',
  RESET_ZOOM = 'RESET_ZOOM',
  ADD_ORDER = 'ADD_ORDER',
  UPDATE_CURRENT_DATE = 'UPDATE_CURRENT_DATE',
}

export type ActionsType = {
  [key in keyof typeof Actions]: (
    context: ActionContext<StateType, StateType>,
    payload?: any,
  ) => Promise<void>;
};

export type GettersType = {
  getCurrentDateKey(state: StateType, getters?: GettersType): string;
  getCurrentDate(state: StateType, getters?: GettersType): string;
  getCurrentTime(state: StateType, getters?: GettersType): string;
  // getNumberOfDailyOrders(state: StateType, getters?: GettersType): (dateTime: string) => number;
  getDailyOrders(state: StateType, getters?: GettersType): Order[];
  hasDailyOrders: (state: StateType, getters?: GettersType) => boolean;
  isBlocked: (state: StateType, getters?: GettersType) => boolean;
  getDailyRemainingNumberOfOrders: (state: StateType, getters?: GettersType) => number;
  getMenuListSortedByPopularity: (state: StateType, getters?: GettersType) => MenuItem[];
  getMenuListSortedByAlphabet: (state: StateType, getters?: GettersType) => MenuItem[];
  getZoomLevelFormatted: (state: StateType, getters?: GettersType) => string;
  [key: string]: any;
};

export enum SortType {
  alphabet = 'alphabet',
  popularity = 'popularity',
}

export type StoreType = {
  state: {
    userId: string;
    zoomLevel: number;
    currentDateTime: Date;
    dateTimeFormatter: Intl.DateTimeFormat;
    orders: {
      [orderDate: string]: Order[];
    };
    maxDailyOrders: number;
    sortType: SortType;
    menuList: MenuItem[];
    blockingDuration: number;
    blockingTimeoutEnd: Date | null;
    refreshTimeoutInMinutes: number;
  };
  modules: any;
  mutations: MutationsType;
  actions: ActionsType;
  getters: GettersType;
  namespaced: boolean;
};

export type StateType = StoreType['state'];
