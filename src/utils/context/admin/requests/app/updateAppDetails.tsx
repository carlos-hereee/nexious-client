import { axiosMedia } from "@axios/axiosMedia";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { AdminDisptachProps } from "app-admin";
import { axiosError } from "@axios/axiosError";

export const updateAppDetails = async ({ dispatch, values, appId, handleAppAssets }: AdminDisptachProps) => {
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosMedia.put(`/app/update-app-details/${appId}`, values);
    if (data) handleAppAssets(data);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    axiosError({ error, dispatch, target: "updateAppDetails", type: "form-error" });
  }
};
