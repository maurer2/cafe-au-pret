import { setActivePinia, createPinia } from 'pinia';

import { useOrdersStore } from './orders';

describe('useUserStore', () => {
  let ordersStore: ReturnType<typeof useOrdersStore>;

  beforeEach(() => {
    setActivePinia(createPinia());

    ordersStore = useOrdersStore();
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
