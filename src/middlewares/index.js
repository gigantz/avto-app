import { NavigationActions } from 'react-navigation';

export const transitionTo = store => next => action => {
  if(action && action.pathto) {
    const navigateAction = NavigationActions.navigate({
      routeName: action.pathto || 'Error',
    })
    return next(navigateAction);
  }

  return next(action)
}

export default transitionTo;