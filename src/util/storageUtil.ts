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

export function saveToStorage(key: string, saveData: string): void {
  try {
    JSON.parse(saveData);
  } catch (error) {
    console.log(error);
  }

  window.localStorage.setItem(key, saveData);
}

export function getFromStorage(key: string, dateKey: string): boolean | string {
  if (!storageIsAvailable()) {
    return false;
  }

  const saveData = window.localStorage.getItem(key);

  if (saveData === null) {
    return false;
  }

  return saveData;
}
