import { axiosAuth } from "@axios/axiosAuth";
import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";
// import { AxiosError } from "axios";

export const fetchRefreshToken = async (props: AuthDispatchProps) => {
  const { dispatch } = props;
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
  try {
    const { data } = await axiosAuth.post("/auth/refresh-token");
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data });
    // dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    // if (data) {
    // } else {
    //   dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: "" });
    // }
  } catch (error) {
    // const err = error as AxiosError;
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    // console.log("data :>> ", data);
  }
};
