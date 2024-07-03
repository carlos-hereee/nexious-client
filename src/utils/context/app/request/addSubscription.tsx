import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
// import { axiosMedia } from "@axios/axiosMedia";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const addSubscription = async ({ dispatch, appId, subscription, updateUser }: AppDispatchProps) => {
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post(`/app/create-subscription/${appId || "platform"}`, subscription);
    if (updateUser) updateUser(data);
    dispatch({ type: APP_ACTIONS.SET_APP_MESSAGE, payload: "SUCCESS" });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    if (isDev) console.log("error :>> ", error);
  }
};
