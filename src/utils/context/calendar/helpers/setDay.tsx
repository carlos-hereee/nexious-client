export const setDay = async (dispatch, event) => {
  dispatch({ type: "IS_LOADING", payload: true });
  dispatch({ type: "UPDATE_SELECTED_DAY", payload: event });
};
