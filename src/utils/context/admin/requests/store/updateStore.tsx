import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosError } from "@axios/axiosError";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps, AppAssets } from "app-admin";
import { DataResponse } from "data-response";

export const updateStore = async ({ dispatch, handleAppAssets, values, appId }: AdminDisptachProps) => {
  // require key variable
  if (!values) throw Error("values is required");
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: ADMIN_ACTIONS.SET_FORM_STATUS, payload: "LOADING" });
    const { data }: DataResponse<AppAssets> = await axiosMedia.put(`/store/update-store/${appId}`, values);
    if (data) handleAppAssets(data);
  } catch (error) {
    axiosError({ error, dispatch, target: "updateStore", type: "form-error" });
  }
};
