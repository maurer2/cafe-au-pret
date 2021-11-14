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

  it('getter hasDailyOrders returns false if entries for dateKey are not found or orders are empty', async () => {
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
        '2020-09-01': [testOrder] as any
      }
    })

    expect(ordersStore.hasDailyOrders).toBe(false)
  });

  it('getter hasDailyOrders returns true if orders for dateKey are available', async () => {
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
        '2021-09-01': [testOrder] as any
      }
    })

    expect(ordersStore.hasDailyOrders).toBe(true)
  });

  it('getter getDailyOrders returns empty array if there are no orders for the day', async () => {
    expect(ordersStore.getDailyOrders).toEqual([])

  });

  it('getter getDailyOrders returns array of orders if there orders for the day', async () => {
    expect(ordersStore.getDailyOrders).toEqual([])

    const testOrder = {
      id: 'test',
      name: 'test',
      dateTime: new Date(2021, 8, 1, 12, 12, 12),
      tz: 'GMT'
    }

    ordersStore.$patch({
      orders: {
        '2021-09-01': [testOrder] as any
      }
    })

    const [firstOrder] = ordersStore.getDailyOrders

    expect(firstOrder).toHaveProperty('id')
    expect(firstOrder).toHaveProperty('name')
    expect(firstOrder).toHaveProperty('dateTime')
    expect(firstOrder).toHaveProperty('tz')
  });

  it('getter getDailyRemainingNumberOfOrders returns maxDailyOrders if orders are empty', async () => {
    expect(ordersStore.hasDailyOrders).toBe(false)
    expect(ordersStore.getDailyRemainingNumberOfOrders).toBe(ordersStore.maxDailyOrders)
  });

  it('getter getDailyRemainingNumberOfOrders returns a number greater than 0 if orders are less than maxDailyOrders', async () => {
    expect(ordersStore.hasDailyOrders).toBe(false)

    const testOrder = {
      id: 'test',
      name: 'test',
      dateTime: new Date(2021, 8, 1, 12, 12, 12),
      tz: 'GMT'
    }

    ordersStore.$patch({
      orders: {
        '2021-09-01': [testOrder, testOrder, testOrder] as any
      }
    })

    expect(ordersStore.getDailyRemainingNumberOfOrders).toBe(2)
  });

  it('getter getDailyRemainingNumberOfOrders returns 0 if orders are equal to  maxDailyOrders', async () => {
    expect(ordersStore.hasDailyOrders).toBe(false)

    const testOrder = {
      id: 'test',
      name: 'test',
      dateTime: new Date(2021, 8, 1, 12, 12, 12),
      tz: 'GMT'
    }

    ordersStore.$patch({
      orders: {
        '2021-09-01': [testOrder, testOrder, testOrder, testOrder, testOrder] as any
      }
    })

    expect(ordersStore.getDailyRemainingNumberOfOrders).toBe(0)
  });

  it('getter getDailyRemainingNumberOfOrders returns 0 if orders are greater than maxDailyOrders', async () => {
    expect(ordersStore.hasDailyOrders).toBe(false)

    const testOrder = {
      id: 'test',
      name: 'test',
      dateTime: new Date(2021, 8, 1, 12, 12, 12),
      tz: 'GMT'
    }

    ordersStore.$patch({
      orders: {
        '2021-09-01': [testOrder, testOrder, testOrder, testOrder, testOrder, testOrder] as any
      }
    })

    expect(ordersStore.getDailyRemainingNumberOfOrders).toBe(0)
  });

  // actions
  it('action ADD_DAILY_ORDER creates entry in orders for current date if not already present', async () => {
    expect(ordersStore.orders['2021-09-01']).toBeUndefined()
    expect(ordersStore.orders['2021-10-01']).toBeUndefined()

    const testOrder = {
      id: 'test',
      name: 'test',
      dateTime: new Date(2021, 8, 1, 12, 12, 12),
      tz: 'GMT'
    }

    ordersStore.ADD_DAILY_ORDER({ dateKey: '2021-09-01', order: testOrder })
    expect(ordersStore.orders['2021-09-01']).toBeDefined()
    expect(ordersStore.orders['2021-10-01']).toBeUndefined()
  });

  it('action ADD_DAILY_ORDER adds order to orders of current date', async () => {
    expect(ordersStore.orders['2021-09-01']).toBeUndefined()

    const testOrder = {
      id: 'test',
      name: 'test',
      dateTime: new Date(2021, 8, 1, 12, 12, 12),
      tz: 'GMT'
    }

    ordersStore.ADD_DAILY_ORDER({ dateKey: '2021-09-01', order: testOrder })
    expect(ordersStore.orders['2021-09-01'].length).toBe(1)

    ordersStore.ADD_DAILY_ORDER({ dateKey: '2021-09-01', order: testOrder })
    expect(ordersStore.orders['2021-09-01'].length).toBe(2)
  });

  it('action ADD_DAILY_ORDER should throw error if date of order and current date mismatch', async () => {
    jest.spyOn(ordersStore, 'ADD_DAILY_ORDER');

    expect(ordersStore.orders['2020-09-01']).toBeUndefined()

    const testOrder = {
      id: 'test',
      name: 'test',
      dateTime: new Date(2020, 8, 1, 12, 12, 12),
      tz: 'GMT'
    }

    await expect(ordersStore.ADD_ORDER(testOrder)).rejects.toThrow()
    expect(ordersStore.orders['2020-09-01']).toBeUndefined()
    expect(ordersStore.ADD_DAILY_ORDER).not.toBeCalled()
  });

  it('action ADD_ORDER adds order to current date if not blocked', async () => {
    jest.spyOn(ordersStore, 'ADD_DAILY_ORDER');

    expect(ordersStore.orders['2021-09-01']).toBeUndefined()

    const testOrder = {
      id: 'test',
      name: 'test',
      dateTime: new Date(2021, 8, 1, 12, 12, 12),
      tz: 'GMT'
    }

    await ordersStore.ADD_ORDER(testOrder)
    expect(ordersStore.orders['2021-09-01']).toBeDefined()
    expect(ordersStore.orders['2021-09-01'].length).toBe(1)
    expect(ordersStore.ADD_DAILY_ORDER).toBeCalled()
  });

  it('action ADD_ORDER adds returns error if blocked', async () => {
    jest.spyOn(ordersStore, 'ADD_DAILY_ORDER');

    expect(dateTimeStore.blockingTimeoutEnd).toBe(null);
    expect(dateTimeStore.isBlocked).toBe(false)

    // set blocking state
    // dateTimeStore.$patch({ currentDateTime: new Date(2021, 8, 1, 12, 12, 12) })
    dateTimeStore.$patch({ blockingTimeoutEnd: new Date(2021, 8, 1, 12, 12, 42) })

    const testOrder = {
      id: 'test',
      name: 'test',
      dateTime: new Date(2021, 8, 1, 12, 12, 12),
      tz: 'GMT'
    }

    await expect(ordersStore.ADD_ORDER(testOrder))
      .rejects
      .toThrow();
    expect(dateTimeStore.isBlocked).toBe(true)
    expect(ordersStore.ADD_DAILY_ORDER).not.toBeCalled()
  });
});
