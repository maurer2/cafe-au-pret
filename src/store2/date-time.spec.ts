
import { setActivePinia, createPinia } from 'pinia';

import { useDateTimeStore } from './date-time';

describe('useUserStore', () => {
  let dateTimeStore: ReturnType<typeof useDateTimeStore>;
  let dateSpy: any
  const mockDateNow: Readonly<Date> = new Date(2021, 8, 1, 12, 12, 12);

  beforeAll(() => {
    dateSpy = jest
      .spyOn(global, 'Date')
      .mockImplementation(() => mockDateNow as unknown as string)
  })

  beforeEach(() => {
    setActivePinia(createPinia());


    dateTimeStore = useDateTimeStore();
  });

  afterAll(() => {
    jest.clearAllMocks();
  })

  it('has state entries', () => {
    expect(dateTimeStore.currentDateTime).toBeDefined();
    expect(dateTimeStore.blockingDuration).toBeDefined();
    expect(dateTimeStore.blockingTimeoutEnd).toBeDefined();
    expect(dateTimeStore.refreshTimeoutInSeconds).toBeDefined();
    expect(dateTimeStore.dateTimeFormatter).toBeDefined();
  });

  // getters
  it('getter getCurrentDateKey returns correct dateKey', async () => {
    expect(typeof dateTimeStore.getCurrentDateKey).toBe('string');
    expect(dateTimeStore.getCurrentDateKey).toBe('2021-09-01');
  });

  it('getter getCurrentDate returns correct dateKey', async () => {
    expect(typeof dateTimeStore.getCurrentDate).toBe('string');
    expect(dateTimeStore.getCurrentDate).toBe('01/09/2021');
  });

  it('getter getCurrentTime returns correct dateKey', async () => {
    expect(typeof dateTimeStore.getCurrentDate).toBe('string');
    expect(dateTimeStore.getCurrentDate).toBe('01/09/2021');
  });

  it('getter isBlocked returns false if blockingTimeoutEnd is not set', async () => {
    expect(dateTimeStore.blockingTimeoutEnd).toBe(null);

    expect(dateTimeStore.isBlocked).toBe(false);
  });

  it('getter isBlocked returns false if blockingTimeoutEnd is not set', async () => {
    expect(dateTimeStore.blockingTimeoutEnd).toBe(null);

    expect(dateTimeStore.isBlocked).toBe(false);
  });

  it.skip('getter isBlocked returns false if blockingTimeoutEnd is earlier than now + blockingDuration', async () => {
    expect(dateTimeStore.blockingTimeoutEnd).toBe(null);

    const newDate = new Date(mockDateNow.getTime())
    newDate.setSeconds(newDate.getSeconds() + 50);

    dateTimeStore.SET_BLOCKING_TIMEOUT(newDate)

    expect(dateTimeStore.isBlocked).toBe(true);
  });

  it('getter isBlocked returns true if blockingTimeoutEnd is later than now + blockingDuration', async () => {
    expect(dateTimeStore.blockingTimeoutEnd).toBe(null);

    const newDate = new Date(mockDateNow.getTime())
    newDate.setSeconds(newDate.getSeconds() + 100);

    dateTimeStore.SET_BLOCKING_TIMEOUT(newDate)

    expect(dateTimeStore.isBlocked).toBe(false);
  });

  // actions
  it.skip('action SET_CURRENT_DATE sets new date', async () => {
    expect(dateTimeStore.currentDateTime).toBe(mockDateNow);

    const newDate = new Date(mockDateNow)
    newDate.setDate(newDate.getDate() + 1)

    dateTimeStore.SET_CURRENT_DATE(newDate)

    expect(dateTimeStore.currentDateTime).toBe(newDate);
  });

  it('action SET_BLOCKING_TIMEOUT doesn\'t set blocking timeout if called with null', async () => {
    expect(dateTimeStore.blockingTimeoutEnd).toBe(null);

    dateTimeStore.SET_BLOCKING_TIMEOUT(null)
    expect(dateTimeStore.blockingTimeoutEnd).toBe(null);
  });

  it('action SET_BLOCKING_TIMEOUT sets blocking timeout', async () => {
    expect(dateTimeStore.blockingTimeoutEnd).toBe(null);

    const newDate = new Date(mockDateNow.getTime())
    newDate.setDate(newDate.getDate() + 1)

    dateTimeStore.SET_BLOCKING_TIMEOUT(newDate)
    expect(dateTimeStore.blockingTimeoutEnd).toBe(newDate);
  });
});
