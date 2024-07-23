import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { AppDispatchProps } from "app-context";

export const postCalEvent = async ({ dispatch, event, appId, updateAppData }: AppDispatchProps) => {
  // require key variable
  if (!event) throw Error("event param is required");
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post(`/calendar/${appId}/add-event`, event);
    if (updateAppData) updateAppData(data);
  } catch (error) {
    // const message = error.response.data;
    // dispatch({ type: "SET_ERROR", payload: message });
  }
};
