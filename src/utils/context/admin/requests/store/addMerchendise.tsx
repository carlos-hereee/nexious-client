import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosError } from "@axios/axiosError";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps, AppAssets } from "app-admin";
import { DataResponse } from "utils/@types/response";

export const addMerchendise = async ({ dispatch, handleAppAssets, values, appId }: AdminDisptachProps) => {
  // require key variable
  if (!values) throw Error("values is required");
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data }: DataResponse<AppAssets> = await axiosMedia.post(`/store/add-merch/${appId}`, values);
    if (data) handleAppAssets(data);
  } catch (error) {
    axiosError({ error, dispatch, target: "addMerch", type: "form-error" });
  }
};
