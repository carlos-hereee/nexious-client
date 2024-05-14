import { axiosAuth } from "@axios/axiosAuth";
import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";
import { AxiosError } from "axios";
import { DataResponse } from "utils/@types/response";
import { AppValues } from "app-forms";

export const fetchAppWithName = async (props: AppDispatchProps) => {
  const { appName, dispatch, updateAppData, updateActiveAppData } = props;
  // require key variable
  if (!updateAppData) throw Error("updateAppData is required");
  if (!updateActiveAppData) throw Error("updateActiveAppData is required");
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data }: DataResponse<AppValues> = await axiosAuth.get(`/app/${appName}`);
    console.log("data :>> ", data);
    updateAppData(data);
  } catch (error) {
    const err = error as AxiosError;
    dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: `${err.response?.data}` });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }
};
