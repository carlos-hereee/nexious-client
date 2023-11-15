import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { isDev } from "@app/config";
import { DispatchFormValueProp } from "reducer-dispatch-props";
import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";

export const forgotPassword = async (props: DispatchFormValueProp) => {
  const { dispatch, values } = props;
  try {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post("/auth/forgot-password", values);
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    isDev && console.log("forgot password error ", error);
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: "" });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
