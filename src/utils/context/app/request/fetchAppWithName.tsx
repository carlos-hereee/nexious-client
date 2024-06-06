import { axiosAuth } from "@axios/axiosAuth";
import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";
import { AxiosError } from "axios";

export const fetchAppWithName = async (props: AppDispatchProps) => {
  const { appName, dispatch, updateAppData, updateActiveAppData } = props;
  // require key variable
  if (!updateAppData) throw Error("updateAppData is required");
  if (!updateActiveAppData) throw Error("updateActiveAppData is required");
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.get(`/app/${appName}`);
    updateAppData(data);
  } catch (error) {
    const err = error as AxiosError;
    dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: `${err.response?.data}` });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }
};
