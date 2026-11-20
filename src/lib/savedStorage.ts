import AsyncStorage from '@react-native-async-storage/async-storage';

export const SAVED_KEY = 'saved-event-ids';

export async function loadSavedIds(): Promise<number[]> {
  const text = await AsyncStorage.getItem(SAVED_KEY);
  
  if (text === null) {
    return [];
  }

  try {
    const ids = JSON.parse(text);
    if (Array.isArray(ids)) {
      return ids;
    }
  } catch (error) {
    console.error('Error parsing saved IDs:', error);
  }

  return [];
}

export async function storeSavedIds(ids: number[]): Promise<void> {
   await AsyncStorage.setItem(
    SAVED_KEY,
    JSON.stringify(ids)
  );
}