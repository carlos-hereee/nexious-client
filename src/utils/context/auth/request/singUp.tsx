import { axiosAuth } from "@axios/axiosAuth";
import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";
import { axiosError } from "@axios/axiosError";
import { DataResponse } from "utils/@types/response";

export const singUp = async ({ dispatch, credentials }: AuthDispatchProps) => {
  try {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    const { data }: DataResponse = await axiosAuth.post("/auth/register", credentials);
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data });
  } catch (error) {
    axiosError({ dispatch, error, type: "auth", target: "login" });
  }
};
