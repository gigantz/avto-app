export const REDIRECT_TO = "REDIRECT_TO";
export function redirectTo(page) {
  return async (dispatch, getState) => {
    return dispatch({
      type: REDIRECT_TO,
      payload: page
    })
  }
}