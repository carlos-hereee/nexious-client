import { axiosAuth } from "@axios/axiosAuth";
import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";
import { AxiosError } from "axios";
// import { DataResponse } from "utils/@types/response";
// import { AppValues } from "app-forms";

export const upgradeLatest = async (props: AppDispatchProps) => {
  const { appId, dispatch, updateAppData } = props;
  // require key variable
  if (!updateAppData) throw Error("updateAppData is required");
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post(`/app/latest/${appId}`);
    updateAppData(data);
  } catch (error) {
    const err = error as AxiosError;
    dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: `${err.response?.data}` });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }
};
