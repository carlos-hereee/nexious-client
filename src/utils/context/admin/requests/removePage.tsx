import { axiosAuth } from "@axios/axiosAuth";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { AdminDisptachProps, AppAssets } from "app-admin";
import { DataResponse } from "utils/@types/response";

export const removePage = async ({ appId, dispatch, handleAppAssets, pageId }: AdminDisptachProps) => {
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data }: DataResponse<AppAssets> = await axiosAuth.delete(`/app/delete-page/${appId}/page/${pageId}`);
    if (data) handleAppAssets(data);
    // dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    // isDev && console.log("error", error);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  }
};
