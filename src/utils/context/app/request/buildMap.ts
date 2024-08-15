import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { AppDispatchProps } from "app-context";

export const buildMap = async ({ dispatch, map, appId, dimensions, updateAppData }: AppDispatchProps) => {
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post(`/app/${appId}/build-map`, { map, dimensions });
    if (updateAppData) updateAppData(data);
  } catch (error) {
    console.log("error :>> ", error);
  }
};
