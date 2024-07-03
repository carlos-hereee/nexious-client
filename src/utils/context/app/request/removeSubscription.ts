import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
// import { axiosMedia } from "@axios/axiosMedia";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const removeSub = async ({ dispatch, appId, id, updateUser }: AppDispatchProps) => {
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.delete(`/app/delete-subscription/${appId || "platform"}/${id}`);
    if (updateUser) updateUser(data.user);
    dispatch({ type: APP_ACTIONS.SET_APP_MESSAGE, payload: "SUCCESS" });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    if (isDev) console.log("error :>> ", error);
  }
};
