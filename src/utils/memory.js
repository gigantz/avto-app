import { AsyncStorage } from 'react-native';

export const CACHED_USER = "CACHED_USER";

export async function addStorage(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

export function getStoragePromise(key) {
  return AsyncStorage.getItem(key);
}

export async function getStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value){
      return JSON.parse(value);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function checkStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value){
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function clearCache(key){
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
}