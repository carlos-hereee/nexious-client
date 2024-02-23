import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosError } from "@axios/axiosError";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps, AppAssets } from "app-admin";
import { DataResponse } from "utils/@types/response";

export const updateLandingPage = async ({ dispatch, values, appId, handleAppAssets }: AdminDisptachProps) => {
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data }: DataResponse<AppAssets> = await axiosMedia.post(`/app/update-landing-page/${appId}`, values);
    if (data) handleAppAssets(data);
  } catch (error) {
    axiosError({ error, dispatch, type: "form-error", target: "updateLanding" });
  }
};
