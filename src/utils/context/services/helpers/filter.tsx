export const filter = async (dispatch, services, filter) => {
  dispatch({ type: "IS_LOADING", payload: true });
  if (filter === "all") {
    return dispatch({ type: "LOAD_SERVICES", payload: services });
  }
  const data = services.filter((s) => s.subtitle === filter);
  dispatch({ type: "UPDATE_SERVICES", payload: data });
};
