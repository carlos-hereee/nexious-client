import { axiosAuth } from "@axios/axiosAuth";
import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";
import { AxiosError } from "axios";
import { AppProps } from "app-types";
import { DataResponse } from "utils/@types/response";

export const fetchPage = async ({ dispatch, pageId, updateAppData }: AppDispatchProps) => {
  // require key variable
  // require key variable
  if (!updateAppData) throw Error("updateAppData is required");
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data }: DataResponse<AppProps> = await axiosAuth.get(`/app/page/${pageId}`);
    updateAppData(data);
  } catch (error) {
    const err = error as AxiosError;
    dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: `${err.response?.data}` });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }
};
