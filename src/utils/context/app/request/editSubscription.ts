import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
// import { axiosMedia } from "@axios/axiosMedia";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const editSubscription = async ({ dispatch, appId, subscription, updateUser, id }: AppDispatchProps) => {
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.put(`/app/update-subscription/${appId || "platform"}/${id}`, subscription);
    //  // TODO: UPDATE SUBSCRIPTION TO LOCAL STATE
    if (updateUser) updateUser(data.user);
    console.log("data :>> ", data);
    dispatch({ type: APP_ACTIONS.SET_APP_MESSAGE, payload: "SUCCESS" });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    if (isDev) console.log("error :>> ", error);
  }
};
