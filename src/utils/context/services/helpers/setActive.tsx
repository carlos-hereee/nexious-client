export const setActive = (dispatch, active) => {
  dispatch({ type: "IS_LOADING", payload: true });
  dispatch({ type: "UPDATE_ACTIVE", payload: active });
};
