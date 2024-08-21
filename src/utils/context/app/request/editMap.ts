import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { AppDispatchProps } from "app-context";

export const editMap = async ({ dispatch, appId, updateAppData, iMap }: AppDispatchProps) => {
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.put(`/app/${appId}/update-map`, iMap);
    if (updateAppData) updateAppData(data);
  } catch (error) {
    console.log("error :>> ", error);
  }
};
