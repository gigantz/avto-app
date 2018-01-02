
export const WS_LOGS = "WS_LOGS";
export const WS_NOTIFICATIONS = "WS_NOTIFICATIONS";
export const WS_USER_UPDATES = "WS_USER_UPDATES";
export const WS_REALTIME = "WS_REALTIME";

export default (action) => {
  console.log(action);
  return dispatch => {
    if(!action) return false;
    const { type, payload } = action;

    return dispatch({
      type,
      payload,
      meta: action.meta || undefined
    });
  }
};