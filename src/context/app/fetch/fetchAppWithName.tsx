import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { APP_ACTIONS } from "@app/utils/actions/AppActions";
import { AppDispatchProps } from "app-context";
import { AxiosError } from "axios";

export const fetchAppWithName = async (props: AppDispatchProps) => {
  const { appName, updateAppData, dispatch } = props;
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.get(`/app/${appName}`);
    if (data && updateAppData) updateAppData(data);
    // dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    const err = error as AxiosError;
    dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: `${err.response?.data}` });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }
};
