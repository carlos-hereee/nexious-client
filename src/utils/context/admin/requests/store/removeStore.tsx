import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosAuth } from "@axios/axiosAuth";
import { axiosError } from "@axios/axiosError";
import { AdminDisptachProps, AppAssets } from "app-admin";
import { DataResponse } from "data-response";

export const removeStore = async ({ dispatch, handleAppAssets, appId }: AdminDisptachProps) => {
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: ADMIN_ACTIONS.SET_FORM_STATUS, payload: "LOADING" });
    const { data }: DataResponse<AppAssets> = await axiosAuth.delete(`/store/remove-store/${appId}`);
    if (data) handleAppAssets(data);
  } catch (error) {
    axiosError({ error, dispatch, target: "removeMerch", type: "form-error" });
  }
};
