export const newsletter = async (values) => {
  dispatch({ type: "IS_LOADING", payload: true });
  try {
    const data = await axiosAuth.post("/newsletter", values);
    dispatch({ type: "ADD_MESSAGE_TO_LOG", payload: data });
  } catch (e) {
    dispatch({ type: "ADD_MESSAGE_TO_LOG", payload: true });
  }
};
