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

export function hasStorageKey(key: string): boolean {
  if (!storageIsAvailable()) {
    return false;
  }

  const saveData = window.localStorage.getItem(key);

  if (saveData === null) {
    return false;
  }

  return true;
}

export function getFromStorage(key: string): null | string {
  if (!hasStorageKey(key)) {
    return null;
  }

  const saveData = window.localStorage.getItem(key);

  return saveData === null ? null : saveData;
}
