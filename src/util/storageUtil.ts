/* eslint-disable import/prefer-default-export */
export function storageIsAvailable(): boolean {
  const testKey = 'meow';

  try {
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);

    return true;
  } catch (e) {
    return false;
  }
}

export function saveToStorage(payload: string): void {
  const key = 'test';

  try {
    JSON.parse(payload);
  } catch (error) {
    console.log(error);
  }

  window.localStorage.setItem(key, payload);
}
