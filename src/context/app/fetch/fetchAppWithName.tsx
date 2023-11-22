// import { isDev } from "@app/config";
import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { APP_ACTIONS } from "@app/utils/types/AppActions";
import { GetAppNameReducerProps } from "app-forms";

export const fetchAppWithName = async (props: GetAppNameReducerProps) => {
  const { appName, updateAppData, dispatch } = props;
  // try {
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.get(`/app/${appName}`);
  if (data) updateAppData(data);
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  // } catch (error) {
  //   isDev && console.log("error getting app with app name", error);
  // }
};
