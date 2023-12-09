import { AUTH_ACTIONS } from "@actions/AuthActions";
import { axiosAuth } from "@axios/axiosAuth";
import { AuthReducerProps } from "auth-context";
import { AxiosError } from "axios";

export const setUnsubscribe = async (props: AuthReducerProps) => {
  const { dispatch, appId, updateUser } = props;
  try {
    const { data } = await axiosAuth.post(`/app/unsubscribe/${appId}`);
    if (data && updateUser) updateUser(data);
  } catch (error) {
    const err = error as AxiosError;
    if (err.code === "ERR_NETWORK") {
      dispatch({ type: AUTH_ACTIONS.SET_STRANDED, payload: true });
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    } else {
      // console.log("err :>> ", err);
      dispatch({ type: AUTH_ACTIONS.SIGN_IN_ERROR, payload: `${err.response?.data}` });
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    }
  }
};
