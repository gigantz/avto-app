import AppNavigator from '../router';
import { NavigationActions } from 'react-navigation';

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init());
const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export default navReducer;