import { setActivePinia, createPinia } from 'pinia';

import { useOrdersStore } from './orders';
import { useDateTimeStore } from './date-time';

// jest.mock('./date-time.ts', (): ReturnType<typeof useDateTimeStore> => {
//   return {
//     ...useDateTimeStore,
//     getCurrentDateKey:  'wfwe',
//       return 'wefewfew'
//     }
//   }
// })

// jest.mock("./date-time.ts", () => {
//   const original = jest.requireActual("./date-time.ts");

//   console.log(original)

//   return {
//     __esModule: true,
//     ...original,
//     // default: jest.fn(),
//     // myFunc: jest.fn()
//   }
// });

// jest.spyOn(useDateTimeStore, '_pinia').mockImplementation(() => 'WEFWE')

describe('useUserStore', () => {
  let ordersStore: ReturnType<typeof useOrdersStore>;

  beforeEach(() => {
    setActivePinia(createPinia());

    ordersStore = useOrdersStore();

    const dateTimeStore = useDateTimeStore();

    // @ts-ignore
    jest.fn(dateTimeStore, 'getCurrentDateKey').mockReturnValue('qefqewf')
  });

  it('has state entries', () => {
    expect(ordersStore.orders).toBeDefined();
    expect(ordersStore.menuList).toBeDefined();
    expect(ordersStore.maxDailyOrders).toBeDefined();
  });

  // getters
  it('getter getAllMenuEntries returns an array of menu entries', async () => {
    expect(Array.isArray(ordersStore.getAllMenuEntries)).toBe(true)
    expect(ordersStore.getAllMenuEntries.length).toBeGreaterThan(0)

    ordersStore.getAllMenuEntries.forEach((entry) => {
      expect(entry).toHaveProperty('id')
      expect(entry).toHaveProperty('name')
      expect(entry).toHaveProperty('type')
    })
  });

  it('getter hasDailyOrders returns false if dateKey is missing', async () => {
    expect(ordersStore.hasDailyOrders).toBe(false)

  });






});
