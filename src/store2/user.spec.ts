import { setActivePinia, createPinia } from 'pinia'

import { useUserStore } from './user'

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('has state entries', () => {
    const userStore = useUserStore()

    expect(userStore.userId).toBeDefined()
    expect(userStore.zoomLevel).toBeDefined()

    expect(typeof userStore.userId).toBe('string')
    expect(typeof userStore.zoomLevel).toBe('number')
  })

  it('action INCREASE_ZOOM sets zoom value correctly', async () => {
    const userStore = useUserStore()

    expect(userStore.zoomLevel).toBe(1.0);

    await userStore.INCREASE_ZOOM()
    expect(userStore.zoomLevel).toBe(1.1);

    // eslint-disable-next-line no-restricted-syntax
    for await (const _ of Array.from({ length: 25 })) {
      userStore.INCREASE_ZOOM()
    }
    expect(userStore.zoomLevel).toBe(userStore.zoomLevelMax);
  })

  it('action DECREASE_ZOOM sets zoom value correctly', async () => {
    const userStore = useUserStore()

    expect(userStore.zoomLevel).toBe(1.0);

    await userStore.DECREASE_ZOOM()
    expect(userStore.zoomLevel).toBe(0.9);

    // eslint-disable-next-line no-restricted-syntax
    for await (const _ of Array.from({ length: 25 })) {
      userStore.DECREASE_ZOOM()
    }
    expect(userStore.zoomLevel).toBe(userStore.zoomLevelMin);
  })

  it('action RESET_ZOOM sets zoom value correctly', async () => {
    const userStore = useUserStore()

    expect(userStore.zoomLevel).toBe(1.0);

    await userStore.INCREASE_ZOOM()
    await userStore.INCREASE_ZOOM()
    await userStore.INCREASE_ZOOM()
    expect(userStore.zoomLevel).toBe(1.3);

    userStore.RESET_ZOOM()

    expect(userStore.zoomLevel).toBe(1.0);
  })
})
