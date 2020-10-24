import { ActionContext } from 'vuex';

export enum Mutations {
  UPDATE_ZOOM = 'UPDATE_ZOOM',
  ADD_DAILY_ORDER = 'ADD_DAILY_ORDER',
}

export type MutationsType = {
  [key in keyof typeof Mutations]: (state: StateType, payload?: any) => void;
};

export enum Actions {
  INCREASE_ZOOM = 'INCREASE_ZOOM',
  DECREASE_ZOOM = 'DECREASE_ZOOM',
  RESET_ZOOM = 'RESET_ZOOM',
  ADD_ORDER = 'ADD_ORDER',
}

export type ActionsType = {
  [key in keyof typeof Actions]: (
    context: ActionContext<StateType, StateType>,
    payload?: any,
  ) => Promise<void>;
};

export type GettersType = {
  getNumberOfDailyOrders(state: StateType, getters?: GettersType): (dateTime: string) => number;
  getDailyOrders(state: StateType, getters: GettersType): (dateTime: string) => Order[];
  hasDailyOrders: (state: StateType, getters?: GettersType) => (dateTime: string) => boolean;
  hasOrderWithinBlockingDuration: (
    state: StateType,
    getters: GettersType,
  ) => (dateTime: string) => boolean;
  getDailyRemainingNumberOfOrders: (
    state: StateType,
    getters?: GettersType,
  ) => (dateTime: string) => number;
  getMenuListSortedByPopularity: (state: StateType, getters?: GettersType) => MenuItem[];
  getMenuListSortedByAlphabet: (state: StateType, getters?: GettersType) => MenuItem[];
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
    orders: {
      [orderDate: string]: Order[];
    };
    maxDailyOrders: number;
    sortType: SortType;
    menuList: MenuItem[];
    isBlocked: boolean;
    blockingDuration: number;
    [key: string]: any;
  };
  modules: any;
  mutations: MutationsType;
  actions: ActionsType;
  getters: GettersType;
  namespaced: boolean;
};

export type StateType = StoreType['state'];
