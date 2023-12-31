// import { isDev } from "@app/config";
import { axiosAuth } from "@axios/axiosAuth";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { AdminDisptachProps } from "app-admin";

export const removeApp = async (props: AdminDisptachProps) => {
  const { appId, dispatch, handleAppAssets } = props;
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.delete(`/app/delete-app/${appId}`);
    if (handleAppAssets) handleAppAssets(data);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    // isDev && console.log("error", error);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  }
};
