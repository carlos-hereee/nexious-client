import { axiosAuth } from "@axios/axiosAuth";
import { AuthDispatchProps } from "auth-context";
import { A_ACTIONS } from "@actions/AuthActions";
import { axiosError } from "@axios/axiosError";

export const setChangePassword = async ({ credentials, dispatch }: AuthDispatchProps) => {
  if (!credentials) throw Error("credentials param is required");
  try {
    // require key variable
    const { data } = await axiosAuth.post(`/auth/change-password/${credentials?.username}`, credentials);
    dispatch({ type: A_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: A_ACTIONS.SET_ACCESS_TOKEN, payload: data });
    dispatch({ type: A_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    axiosError({ error, type: "auth", dispatch, target: "forgotPassword" });
  }
};
