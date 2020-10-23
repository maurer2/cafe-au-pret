import { ActionContext } from 'vuex';

export enum MutationsType {
  UPDATE_ZOOM = 'UPDATE_ZOOM',
  ADD_DAILY_ORDER = 'ADD_DAILY_ORDER',
}

export enum ActionsType {
  INCREASE_ZOOM = 'INCREASE_ZOOM',
  DECREASE_ZOOM = 'DECREASE_ZOOM',
  RESET_ZOOM = 'RESET_ZOOM',
  ADD_ORDER = 'ADD_ORDER',
}

export type GettersType = {
  getNumberOfDailyOrders(state: StateType): (dateTime: string) => number;
  getDailyOrders(state: StateType): (dateTime: string) => Order[];
  hasDailyOrders: (state: StateType) => (dateTime: string) => boolean;
  getDailyRemainingNumberOfOrders: (state: StateType) => (dateTime: string) => number;
  getMenuListSortedByPopularity: (state: StateType) => MenuItem[];
  getMenuListSortedByAlphabet: (state: StateType) => MenuItem[];
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
    [key: string]: any;
  };
  modules: any;
  mutations: {
    [key in keyof typeof MutationsType]: (state: StateType, payload?: any) => void;
  };
  actions: {
    [key in keyof typeof ActionsType]: (
      context: ActionContext<StateType, StateType>,
      payload?: any,
    ) => Promise<void>;
  };
  getters: GettersType;
  [key: string]: any;
};

export type StateType = StoreType['state'];
