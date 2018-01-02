import { AsyncStorage } from 'react-native';
import CacheStore from 'react-native-cache-store';

export const CACHED_USER = "CACHED_USER";
export const CACHED_AUTO = "CACHED_AUTO";

export async function addStorage(key, value, time) {
  try {
    await CacheStore.set(key, JSON.stringify(value), time || 4000);
  } catch (error) {
    console.error(error);
  }
}

export function getStoragePromise(key) {
  return CacheStore.get(key);
}

export async function getStorage(key) {
  try {
    const value = await CacheStore.get(key);
    if (value){
      return JSON.parse(value);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function clearCache(key){
  try {
    await CacheStore.remove(key);
  } catch (error) {
    console.error(error);
  }
}