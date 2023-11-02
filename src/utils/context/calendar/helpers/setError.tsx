export const setError = async (dispatch, error) => {
  dispatch({ type: "IS_LOADING", payload: true });
  dispatch({ type: "SET_ERROR", payload: error });
};
