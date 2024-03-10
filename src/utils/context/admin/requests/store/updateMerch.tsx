import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosError } from "@axios/axiosError";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps, AppAssets } from "app-admin";
import { DataResponse } from "utils/@types/response";

export const updateMerch = async ({ dispatch, handleAppAssets, values, appId, merchId }: AdminDisptachProps) => {
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  if (!values) throw Error("values is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data }: DataResponse<AppAssets> = await axiosMedia.put(`/store/update-merch/${appId}/${merchId}`, values);
    if (data) handleAppAssets(data);
  } catch (error) {
    axiosError({ error, dispatch, target: "removeMerch", type: "form-error" });
  }
};
