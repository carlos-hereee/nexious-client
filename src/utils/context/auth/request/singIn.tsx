import { axiosAuth } from "@axios/axiosAuth";
import { A_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";
import { axiosError } from "@axios/axiosError";

export const singIn = async ({ login, dispatch }: AuthDispatchProps) => {
  // require key variable
  if (!login) throw Error("login is required");
  try {
    dispatch({ type: A_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post("/auth/login", login);
    dispatch({ type: A_ACTIONS.SET_ACCESS_TOKEN, payload: data });
    dispatch({ type: A_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    axiosError({ dispatch, error, type: "auth", target: "login" });
  }
};
