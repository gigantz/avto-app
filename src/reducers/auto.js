import im from 'immutable';
import {
  GET_MARKS,
  GET_MARKS_CACHE,
} from 'actions/auto';

const initialState = im.fromJS({
  marks: [],
  models: [],
  years: [],
  generation: [],
  trims: [],
});

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_MARKS:
      if(!action.meta.done) {
        return state.set('loading', true);
      }
      return state
        .set('marks', action.payload)
        .remove('loading');
    case GET_MARKS_CACHE:
      if(!action.meta.done) {
        return state.set('loading', true);
      }
      return state
        .set('marks', action.payload)
        .remove('loading');
    default:
      return state;    
  }
}