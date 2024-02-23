import { axiosAuth } from "@axios/axiosAuth";
import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";
import { axiosError } from "@axios/axiosError";

export const setForgotPassword = async ({ dispatch, credentials }: AuthDispatchProps) => {
  // require key variable
  if (!credentials) throw Error("credentials is required");
  try {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post("/auth/forgot-password", credentials);
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    axiosError({ target: "forgotPassword", dispatch, type: "auth", error });
  }
};
