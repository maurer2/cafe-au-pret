import { ActionContext, GetterTree } from 'vuex';

export type StateType = {
  userId: string;
  zoomLevel: number;
  currentDateTime: Date;
  dateTimeFormatter: Intl.DateTimeFormat;
  orders: {
    [orderDate: string]: Order[];
  };
  maxDailyOrders: number;
  menuList: MenuItem[];
  blockingDuration: number;
  blockingTimeoutEnd: Date | null;
  refreshTimeoutInSeconds: number;
};

export enum Mutations {
  UPDATE_ZOOM = 'UPDATE_ZOOM',
  ADD_DAILY_ORDER = 'ADD_DAILY_ORDER',
  UPDATE_CURRENT_DATE = 'UPDATE_CURRENT_DATE',
  SET_BLOCKING_TIMEOUT = 'SET_BLOCKING_TIMEOUT',
  PERSIST_ORDER = 'PERSIST_ORDER',
  RESTORE_ORDER = 'RESTORE_ORDER',
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
  GET_SAVED_ORDERS = 'GET_SAVED_ORDERS',
}

export type ActionsType = {
  [key in keyof typeof Actions]: (
    context: ActionContext<StateType, StateType>,
    payload?: any,
  ) => Promise<void>;
};

export type GettersType = GetterTree<StateType, StateType> & {
  getCurrentDateKey(state: StateType, getters?: GettersType): string;
  getCurrentDate(state: StateType, getters?: GettersType): string;
  getCurrentTime(state: StateType, getters?: GettersType): string;
  // getNumberOfDailyOrders(state: StateType, getters?: GettersType): (dateTime: string) => number;
  getDailyOrders(state: StateType, getters?: GettersType): Order[];
  hasDailyOrders(state: StateType, getters?: GettersType): boolean;
  isBlocked(state: StateType, getters?: GettersType): boolean;
  getRemainingBlockingTime(state: StateType, getters?: GettersType): number;
  getDailyRemainingNumberOfOrders: (
    state: StateType,
    getters?: GettersType,
  ) => number;
  getAllMenuEntries(state: StateType, getters?: GettersType): MenuItem[];
  getMenuEntriesOfType(
    state: StateType,
    getters?: GettersType,
  ): (type: DrinkType) => MenuItem[];
  getZoomLevelFormatted(state: StateType, getters?: GettersType): string;
};

export const drinks = [
  'Coffee',
  'Iced',
  'Tea',
  'Frappe',
  'Smoothie',
  'Other',
] as const;

// test
const drinks2 = {
  UP: 'UP',
  DOWN: 'DOWN',
} as const;

type DIRECTIONS = typeof drinks2[keyof typeof drinks2];

export type Drinks = typeof drinks[number];

export enum DrinkType {
  COFFEE = 'Coffee',
  ICED = 'Iced',
  TEA = 'Tea',
  FRAPPE = 'Frappe',
  SMOOTHIE = 'Smoothie',
  OTHER = 'Other',
}

// https://dev.to/3vilarthas/vuex-typescript-m4j
/*
export type StoreType =Omit<Store<StateType>, 'getters2'> & {
  getters2: {
    [K in keyof GettersType]: (
      state: StateType,
      getters: GettersType,
    ) => ReturnType<GettersType[K]>;
  };
} & {
  state: StateType;
  // modules?: Module<StateType, () => {}>;
  modules: any;
  mutations: MutationsType;
  actions: ActionsType;
  namespaced: boolean;
  getters: GettersType;
};
*/

export type StoreType = {
  state: StateType;
  // modules?: Module<StateType, () => {}>;
  modules: any;
  mutations: MutationsType;
  actions: ActionsType;
  namespaced: boolean;
  getters: GettersType;
};
