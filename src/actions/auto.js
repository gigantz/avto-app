import axios from 'axios';
import config from 'config';
import { addStorage, getStorage, checkStorage, clearCache, CACHED_AUTO } from 'utils/memory';

// CACHES
export const MARKS = "MARKS";
export const GET_MARKS = "GET_MARKS";
export function getMarks() {
  return async (dispatch, getState) => {
    // const marksCache = await getStorage(MARKS);
    // if(marksCache) {
    //   return dispatch({
    //     type: GET_MARKS,
    //     payload: marksCache,
    //     meta: {
    //       done: true,
    //       cache: true,
    //     }
    //   })
    // }

    dispatch({
      type: GET_MARKS,
      meta: {
        done: false
      }
    });

    try {
      const { data } = await axios.get('/auto/marks');
      sortedData = data.sort((a, b) => a.label !== b.label ? a.label < b.label ? -1 : 1 : 0);
      
      // Adding to cache
      await clearCache(MARKS);
      await addStorage(MARKS, sortedData, 10000000);

      dispatch({
        type: GET_MARKS,
        payload: sortedData,
        meta: {
          done: true
        }
      });
    } catch ({ message }) {
      dispatch({
        type: GET_MARKS,
        meta: {
          done: true,
          error: message || true
        }
      });
    }
  }
}

export const MODELS = "MODELS";
export const GET_MODELS = "GET_MODELS";
export function getModels(markId) {
  return async (dispatch, getState) => {
    await clearCache(MODELS);
    dispatch({
      type: GET_MODELS,
      meta: {
        done: false
      }
    });

    try {
      const { data } = await axios.get(`/auto/models/${markId}`);
      sortedData = data.sort((a, b) => a.label !== b.label ? a.label < b.label ? -1 : 1 : 0);
      
      // Adding to cache

      return dispatch({
        type: GET_MODELS,
        payload: sortedData,
        meta: {
          done: true
        }
      });
    } catch (error) {
      console.log(error)
      dispatch({
        type: GET_MODELS,
        meta: {
          done: true,
          error: error.message || true
        }
      });
    }
  }
}

export const YEARS = "YEARS";
export const GET_YEARS = "GET_YEARS";
export function getYears(modelId) {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_YEARS,
      meta: {
        done: false
      }
    });

    try {
      const { data } = await axios.get(`/auto/years/${modelId}`);
      sortedData = data.sort((a, b) => a.label !== b.label ? a.label < b.label ? -1 : 1 : 0);

      dispatch({
        type: GET_YEARS,
        payload: sortedData,
        meta: {
          done: true
        }
      });
    } catch ({ message }) {
      dispatch({
        type: GET_YEARS,
        meta: {
          done: true,
          error: message || true
        }
      });
    }
  }
}

export const BODIES = "BODIES";
export const GET_BODIES = "GET_BODIES";
export function getBodies(modelId, yearId) {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_BODIES,
      meta: {
        done: false
      }
    });

    try {
      const { data } = await axios.get(`/auto/bodies/${modelId}/${yearId}`);
      sortedData = data.sort((a, b) => a.label !== b.label ? a.label < b.label ? -1 : 1 : 0);

      dispatch({
        type: GET_BODIES,
        payload: sortedData,
        meta: {
          done: true
        }
      });
    } catch ({ message }) {
      dispatch({
        type: GET_BODIES,
        meta: {
          done: true,
          error: message || true
        }
      });
    }
  }
}

export const GENERATIONS = "GENERATIONS";
export const GET_GENERATIONS = "GET_GENERATIONS";
export function getGenerations(modelId, yearId, bodyId) {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_GENERATIONS,
      meta: {
        done: false
      }
    });

    try {
      const { data } = await axios.get(`/auto/generations/${modelId}/${yearId}/${bodyId}`);
      sortedData = data.sort((a, b) => a.label !== b.label ? a.label < b.label ? -1 : 1 : 0);

      dispatch({
        type: GET_GENERATIONS,
        payload: sortedData,
        meta: {
          done: true
        }
      });
    } catch ({ message }) {
      dispatch({
        type: GET_GENERATIONS,
        meta: {
          done: true,
          error: message || true
        }
      });
    }
  }
}

export const TRIMS = "TRIMS";
export const GET_TRIMS = "GET_TRIMS";
export function getTrims(modelId, yearId, bodyId, generationId) {
  return async (dispatch, getState) => {

    dispatch({
      type: GET_TRIMS,
      meta: {
        done: false
      }
    });

    try {
      const { data } = await axios.get(`/auto/trims/${modelId}/${yearId}/${bodyId}/${generationId}`);
      sortedData = data.sort((a, b) => a.label !== b.label ? a.label < b.label ? -1 : 1 : 0);

      dispatch({
        type: GET_TRIMS,
        payload: sortedData,
        meta: {
          done: true
        }
      });
    } catch ({ message }) {
      dispatch({
        type: GET_TRIMS,
        meta: {
          done: true,
          error: message || true
        }
      });
    }
  }
}

export const GET_AUTO = "GET_AUTO";
export const GET_AUTO_ID = "GET_AUTO_ID";
export function getAutoId(modelId, yearId, bodyId, generationId, trimId, getMyCar = true) {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_AUTO_ID,
      meta: {
        done: false
      }
    });

    try {
      const { data } = await axios.get(`/auto/getid/${modelId}/${yearId}/${bodyId}/${generationId}/${trimId}`);

      await clearCache(CACHED_AUTO);
      await addStorage(CACHED_AUTO, data, config.CacheTime.auth);

      dispatch({
        type: GET_AUTO_ID,
        payload: data._id,
        meta: {
          done: true
        }
      });

      if(getMyCar) {
        await axios.put(`/user/update`, { autoId: data._id });

        dispatch({
          type: GET_AUTO,
          payload: data,
          meta: {
            done: true
          }
        });

        global.alertDown.alertWithType('success', 'Avtonuz yeniləndi', 'Qaldı şəkilini yükləmək');
      }
    } catch ({ message }) {
      dispatch({
        type: GET_AUTO_ID,
        meta: {
          done: true,
          error: message || true
        }
      });
    }
  }
}

export const GET_AUTO_BY_ID = "GET_AUTO_BY_ID";
export function getAutoById(autoId) {
  return async dispatch => {

    try {
      const { data } = await axios.get(`/auto/one/${autoId}`);

      await clearCache(CACHED_AUTO);
      await addStorage(CACHED_AUTO, data, config.CacheTime.auth);

      dispatch({
        type: GET_AUTO,
        payload: data,
        meta: {
          done: true
        }
      });

    } catch ({ message }) {
      dispatch({
        type: GET_AUTO_BY_ID,
        meta: {
          done: true,
          error: message || true
        }
      });
    }

  }
}

export const GET_AUTO_CACHED = "GET_AUTO_CACHED";
export function getAutoCached(data) {
  return dispatch => {

    dispatch({
      type: GET_AUTO,
      payload: data,
      meta: {
        done: true
      }
    });

  }
}