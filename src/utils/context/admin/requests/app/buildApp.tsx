import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosError } from "@axios/axiosError";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps } from "app-admin";

export const buildApp = async ({ dispatch, handleAppAssets, values }: AdminDisptachProps) => {
  // require key variable
  if (!values) throw Error("values is required");
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosMedia.post(`/app/init-app`, values);
    if (data) handleAppAssets(data);
  } catch (error) {
    axiosError({ type: "form-error", error, dispatch, target: "initApp" });
  }
};
