export const contactUs = async (dispatch, values) => {
  dispatch({ type: "IS_LOADING", payload: true });
  try {
    const data = await axiosAuth.post("/contact-me", values);
    dispatch({ type: "ADD_MESSAGE_TO_LOG", payload: data });
  } catch (e) {
    dispatch({ type: "ADD_MESSAGE_TO_LOG", payload: true });
  }
};
