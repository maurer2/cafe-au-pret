import { setActivePinia, createPinia } from 'pinia';

import { useUserStore } from './user';

describe('useUserStore', () => {
  let userStore: ReturnType<typeof useUserStore>;

  beforeEach(() => {
    setActivePinia(createPinia());

    userStore = useUserStore();
  });

  it('has state entries', () => {
    expect(userStore.userId).toBeDefined();
    expect(userStore.zoomLevel).toBeDefined();
    expect(userStore.zoomLevelMin).toBeDefined();
    expect(userStore.zoomLevelMax).toBeDefined();
  });

  it('getter getZoomLevelFormatted returns zoom level formatted', async () => {
    expect(typeof userStore.getZoomLevelFormatted).toBe('string');
    expect(userStore.getZoomLevelFormatted).toBe('1.00');
  });

  it('getter hasUserId returns true if userid is set', async () => {
    expect(typeof userStore.hasUserId).toBe('boolean');
    expect(userStore.hasUserId).toBe(false);

    await userStore.SET_USER_ID('12345');
    expect(userStore.hasUserId).toBe(true);

    await userStore.SET_USER_ID('');
    expect(userStore.hasUserId).toBe(false);
  });

  it('action INCREASE_ZOOM sets zoom value correctly', async () => {
    expect(userStore.zoomLevel).toBe(1.0);

    await userStore.INCREASE_ZOOM();
    expect(userStore.zoomLevel).toBe(1.1);

    // eslint-disable-next-line no-restricted-syntax
    for await (const _ of Array.from({ length: 25 })) {
      userStore.INCREASE_ZOOM();
    }
    expect(userStore.zoomLevel).toBe(userStore.zoomLevelMax);
  });

  it('action DECREASE_ZOOM sets zoom value correctly', async () => {
    expect(userStore.zoomLevel).toBe(1.0);

    await userStore.DECREASE_ZOOM();
    expect(userStore.zoomLevel).toBe(0.9);

    // eslint-disable-next-line no-restricted-syntax
    for await (const _ of Array.from({ length: 25 })) {
      userStore.DECREASE_ZOOM();
    }
    expect(userStore.zoomLevel).toBe(userStore.zoomLevelMin);
  });

  it('action RESET_ZOOM sets zoom value correctly', async () => {
    expect(userStore.zoomLevel).toBe(1.0);

    await userStore.INCREASE_ZOOM();
    await userStore.INCREASE_ZOOM();
    await userStore.INCREASE_ZOOM();
    expect(userStore.zoomLevel).toBe(1.3);

    await userStore.RESET_ZOOM();
    expect(userStore.zoomLevel).toBe(1.0);
  });

  it('action SET_USER_ID sets user id correctly', async () => {
    expect(userStore.userId).toBe(null);
    const testUser = '12345ABCD';

    await userStore.SET_USER_ID(testUser);
    expect(userStore.userId).toBe(testUser);
  });
});
