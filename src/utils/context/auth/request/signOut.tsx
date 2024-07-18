import { A_ACTIONS } from "@actions/AuthActions";
import { axiosAuth } from "@axios/axiosAuth";
import { AuthDispatchProps } from "auth-context";
import data from "@data/data.json";
import { axiosError } from "@axios/axiosError";

export const signOut = async ({ dispatch }: AuthDispatchProps) => {
  try {
    dispatch({ type: A_ACTIONS.IS_LOADING, payload: true });
    await axiosAuth.delete("/auth/logout");
    // reset user and access token
    dispatch({ type: A_ACTIONS.SET_USER_DATA, payload: data.resetUserData });
    dispatch({ type: A_ACTIONS.SET_ACCESS_TOKEN, payload: "" });
    dispatch({ type: A_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    axiosError({ dispatch, error, type: "auth", target: "logout" });
  }
};
