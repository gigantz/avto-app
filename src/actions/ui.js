export const TABS_TRIGGER = "TABS_TRIGGER";
export const REDIRECT_TO = "Navigation/NAVIGATE";

export function redirectTo(page) {
  return async (dispatch, getState) => {
    return dispatch({
      type: REDIRECT_TO,
      payload: page
    })
  }
}