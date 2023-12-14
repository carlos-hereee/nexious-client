import { axiosAuth } from "@axios/axiosAuth";
import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";
import { AxiosError } from "axios";

export const fetchAppWithName = async (props: AppDispatchProps) => {
  const { appName, updateAppData, dispatch } = props;
  // const { appName, updateAppData, dispatch, updateActiveAppData } = props;
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.get(`/app/${appName}`);
    if (data && updateAppData) updateAppData(data);
    // if (data && updateActiveAppData) updateActiveAppData(data);
    // dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    const err = error as AxiosError;
    dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: `${err.response?.data}` });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }
};
