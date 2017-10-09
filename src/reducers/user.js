import im from 'immutable';

const initialState = im.fromJS({
  firstname: null,
  lastname: null,
  locale: 'az'
});

export default function fetchUser(state = initialState, action) {
  return state;
}