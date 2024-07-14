import { axiosAuth } from "@axios/axiosAuth";
import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";

export const fetchPlatformData = async ({ dispatch }: AppDispatchProps) => {
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.get("app/platform-data");
  if (data.appList) dispatch({ type: APP_ACTIONS.SET_APP_LIST, payload: data.appList });
  if (data.platformTiers) dispatch({ type: APP_ACTIONS.SET_PLATFORM_TIERS, payload: data.platformTiers });
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
export const fetchAppUsers = async ({ dispatch, appId }: AppDispatchProps) => {
  // dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.get(`app/${appId}/user-data`);
  if (data) dispatch({ type: APP_ACTIONS.SET_APP_USERS, payload: data });
  // dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
