import { createStore } from 'vuex';

type storeType = {
  state: {
    userId: string;
    zoomLevel: number;
    orders: {
      [orderDate: string]: Order[];
    };
  };
  modules: any;
  mutations: any;
  actions: any;
};

const defaultStore: storeType = {
  state: {
    userId: 'ABC123456789',
    zoomLevel: 1.0,
    orders: {
      'YYYY-MM-DD': [
        {
          id: String(Math.random()),
          name: `name-${Math.random().toPrecision(2)}`,
          dateTime: new Date(),
          tz: 'Europe/London',
        },
      ],
    },
  },
  modules: {},
  mutations: {
    updateZoom(state: any, change: number) {
      const { zoomLevel } = state;

      if (change === 0) {
        state.zoomLevel = 1;
        return;
      }

      // prettier-ignore
      const newZoomLevel = zoomLevel + (change / 100);
      state.zoomLevel = (Math as any).clamp(newZoomLevel, 0.5, 2.5);
    },
    addDailyOrder(state: storeType['state'], order: Order) {
      const { orders } = state;
      const currentDate = 'YYYY-MM-DD';

      orders[currentDate].push(order);
    },
  },
  actions: {
    increaseZoom(context: any): void {
      context.commit('updateZoom', 10);
    },
    decreaseZoom(context: any): void {
      context.commit('updateZoom', -10);
    },
    resetZoom(context: any): void {
      context.commit('updateZoom', 0);
    },
    addOrder(context: any, order: Order): void {
      context.commit('addDailyOrder', order);
    },
  },
};

const store = createStore(defaultStore);

export default store;

export function useStore() {
  return store;
}
