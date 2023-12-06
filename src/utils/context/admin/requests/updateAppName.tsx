import { axiosMedia } from "@axios/axiosMedia";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { AdminDisptachProps } from "app-admin";

export const updateAppName = async (props: AdminDisptachProps) => {
  const { dispatch, values, appId, handleAppAssets } = props;
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosMedia.post(`/app/update-app-name/${appId}`, values);
    if (data) handleAppAssets(data);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    // isDev && console.log("error building app ", error);
    // dispatch({ type: "SET_APP_ID", payload: "" });
    // dispatch({ type: "IS_LOADING", payload: false });
  }
};
