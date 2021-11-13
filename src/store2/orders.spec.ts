import { setActivePinia, createPinia } from 'pinia';

import { useOrdersStore } from './orders';
import { useDateTimeStore } from './date-time';

describe('useUserStore', () => {
  let ordersStore: ReturnType<typeof useOrdersStore>;
  let dateTimeStore: ReturnType<typeof useDateTimeStore>;

  beforeEach(() => {
    setActivePinia(createPinia());

    ordersStore = useOrdersStore();

    // lock down other store state
    dateTimeStore = useDateTimeStore();
    dateTimeStore.$patch({ currentDateTime: new Date(2021, 8, 1, 12, 12, 12) })
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

  it('getter getMenuEntriesOfType returns empty array if type is not found or type is empty', async () => {
    expect(ordersStore.getMenuEntriesOfType('cat')).toEqual([])
    expect(ordersStore.getMenuEntriesOfType('')).toEqual([])
  });

  it('getter getMenuEntriesOfType returns list of menu entries if type is found', async () => {
    const filteredEntries = ordersStore.getMenuEntriesOfType('Coffee')

    expect(Array.isArray(filteredEntries)).toBe(true)

    filteredEntries.forEach((entry) => {
      expect(entry).toHaveProperty('id')
      expect(entry).toHaveProperty('name')
      expect(entry).toHaveProperty('type')
    })
  });

  it('getter hasDailyOrders returns false if entries with dateKey are not found or orders are empty', async () => {
    expect(dateTimeStore.getCurrentDateKey).toBe('2021-09-01')
    expect(Object.values(ordersStore.orders).length).toBe(0)

    const testOrder = {
      id: 'test',
      name: 'test',
      dateTime: new Date(2020, 8, 1, 12, 12, 12),
      tz: 'GMT'
    }

    ordersStore.$patch({
      orders: {
        '2020-09-01': [testOrder]
      }
    })

    expect(ordersStore.hasDailyOrders).toBe(false)
  });

  it('getter hasDailyOrders returns true if orders for datekey are available', async () => {
    expect(ordersStore.hasDailyOrders).toBe(false)
    expect(dateTimeStore.getCurrentDateKey).toBe('2021-09-01')

    const testOrder = {
      id: 'test',
      name: 'test',
      dateTime: new Date(2021, 8, 1, 12, 12, 12),
      tz: 'GMT'
    }

    ordersStore.$patch({
      orders: {
        '2021-09-01': [testOrder]
      }
    })

    expect(ordersStore.hasDailyOrders).toBe(true)
  });
});
