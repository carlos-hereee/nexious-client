import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { AUTH_ACTIONS } from "@app/utils/actions/AuthActions";
import { AuthDispatchProps } from "auth-context";

export const fetchRefreshToken = async (props: AuthDispatchProps) => {
  const { dispatch } = props;
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
  try {
    const { data } = await axiosAuth.post("/auth/refresh-token");
    if (data) {
      dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data });
    } else {
      dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: "" });
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    }
  } catch (error) {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    // console.log("data :>> ", data);
  }
};
