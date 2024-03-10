import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps } from "app-admin";

export const updatePage = async ({ dispatch, values, appId, handleAppAssets, pageId }: AdminDisptachProps) => {
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
  try {
    const { data } = await axiosMedia.put(`/app/update-page/${appId}/page/${pageId}`, values);
    if (data) handleAppAssets(data);
    // dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
    // isDev && console.log("error building app ", error);
  }
};
