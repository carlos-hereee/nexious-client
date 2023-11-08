export const updateEvents = async (dispatch, events) => {
  dispatch({ type: "IS_LOADING", payload: true });
  dispatch({ type: "UPDATE_EVENTS", payload: events });
};
