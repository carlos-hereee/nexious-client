import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosError } from "@axios/axiosError";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps, AppAssets } from "app-admin";
import { DataResponse } from "data-response";

export const buildStore = async ({ dispatch, handleAppAssets, values, appId }: AdminDisptachProps) => {
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  if (!values) throw Error("values is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: ADMIN_ACTIONS.SET_FORM_STATUS, payload: "LOADING" });
    const { data }: DataResponse<AppAssets> = await axiosMedia.post(`/store/build-store/${appId}`, values);
    if (data) handleAppAssets(data);
  } catch (error) {
    axiosError({ error, type: "form-error", dispatch, target: "buildStore" });
  }
};
