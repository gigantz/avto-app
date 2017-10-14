import axios from 'axios';
import config from 'config';
import { addStorage, getStorage, checkStorage, clearCache } from 'utils/memory';

export const CLEAR_CAR_CACHE = "CLEAR_CAR_CACHE";
export function clearCarCache(key) {
  return async (dispatch, getState) => {

    dispatch({
      type: CLEAR_CAR_CACHE
    })

    try {
      await clearCache(key);
    } catch (error) {
      console.error(error);
    }
  }
}

// CACHES
export const MARKS = "MARKS";

export const GET_MARKS = "GET_MARKS";
export const GET_MARKS_CACHE = "GET_MARKS_CACHE";
export function getMarks() {
  return async (dispatch, getState) => {
    let payload, type;

    dispatch({
      type: GET_MARKS,
      meta: {
        done: false
      }
    })

    try {
      const cache = await getStorage(MARKS);
      if(!cache) {
        const { data } = await axios.get('/auto/marks');
        payload = data.sort((a, b) => a.label !== b.label ? a.label < b.label ? -1 : 1 : 0);
        type = GET_MARKS;
        
        // Adding to cache
        addStorage(MARKS,payload);
      } else {
        payload = cache;
        type = GET_MARKS_CACHE;
      }
      
      return dispatch({
        type,
        payload,
        meta: {
          done: true
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export function getModels() {
  return async (dispatch, getState) => {
    let payload, type;

    dispatch({
      type: GET_MARKS,
      meta: {
        done: false
      }
    })

    try {
      const cache = await getStorage('MARKS');
      if(!cache) {
        const { data } = await axios.get('/auto/marks');
        payload = data;
        type = GET_MARKS;
        
        // Adding to cache
        addStorage('MARKS',data);
      } else {
        payload = cache;
        type = GET_MARKS_CACHE;
      }
      
      return dispatch({
        type,
        payload,
        meta: {
          done: true
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}