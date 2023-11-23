import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { APP_ACTIONS } from "@app/utils/actions/AppActions";
import { AppDispatchProps } from "app-context";

export const fetchAppWithName = async (props: AppDispatchProps) => {
  const { appName, updateAppData, dispatch } = props;
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.get(`/app/${appName}`);
  if (data && updateAppData) updateAppData(data);
  // dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
