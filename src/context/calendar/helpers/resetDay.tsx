export const resetDay = async (dispatch, events) => {
  dispatch({ type: "IS_LOADING", payload: true });
  dispatch({ type: "RESET_EVENTS", payload: events });
};
