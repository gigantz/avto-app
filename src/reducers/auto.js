import im from 'immutable';
import {
  GET_MARKS,
  GET_MODELS,
  GET_YEARS,
  GET_BODIES,
  GET_GENERATIONS,
  GET_TRIMS,
  GET_AUTO_ID,
} from 'actions/auto';
import {
  LOGOUT
} from 'actions/auth';

const initialState = {
  marks: [],
  models: [],
  years: [],
  bodies: [],
  generations: [],
  trims: [],
  autoId: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_MARKS:
      if(action.meta && !action.meta.done) {
        return {
          ...state,
          loading: true
        };
      }
      return {
        ...state,
        marks: action.payload,
        loading: false,
      }
    case GET_MODELS:
      if(action.meta && !action.meta.done) {
        return {
          ...state,
          loading: true
        };
      }
      return {
        ...state,
        models: action.payload,
        loading: false,
      }
    case GET_YEARS:
      if(action.meta && !action.meta.done) {
        return {
          ...state,
          loading: true
        };
      }
      return {
        ...state,
        years: action.payload,
        loading: false,
      }
    case GET_BODIES:
      if(action.meta && !action.meta.done) {
        return {
          ...state,
          loading: true
        };
      }
      return {
        ...state,
        bodies: action.payload,
        loading: false,
      }
    case GET_GENERATIONS:
      if(action.meta && !action.meta.done) {
        return {
          ...state,
          loading: true
        };
      }
      return {
        ...state,
        generations: action.payload,
        loading: false,
      }
    case GET_TRIMS:
      if(action.meta && !action.meta.done) {
        return {
          ...state,
          loading: true
        };
      }
      return {
        ...state,
        trims: action.payload,
        loading: false,
      }
    case GET_AUTO_ID:
      if(action.meta && !action.meta.done) {
        return {
          ...state,
          loading: true
        };
      }
      return {
        ...state,
        autoId: action.payload,
        loading: false,
      }
    case LOGOUT:
      return initialState;
    default:
      return state;    
  }
}