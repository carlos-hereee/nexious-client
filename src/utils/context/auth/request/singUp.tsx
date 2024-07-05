import { axiosAuth } from "@axios/axiosAuth";
import { A_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";
import { axiosError } from "@axios/axiosError";

export const singUp = async ({ dispatch, credentials }: AuthDispatchProps) => {
  try {
    dispatch({ type: A_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post("/auth/register", credentials);
    dispatch({ type: A_ACTIONS.SET_ACCESS_TOKEN, payload: data });
  } catch (error) {
    axiosError({ dispatch, error, type: "auth", target: "login" });
  }
};
