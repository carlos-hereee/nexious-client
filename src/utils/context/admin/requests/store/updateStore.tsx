import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosError } from "@axios/axiosError";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps, AppAssets } from "app-admin";
import { DataResponse } from "utils/@types/response";

export const updateStore = async ({ dispatch, handleAppAssets, setFormStatus, values, appId }: AdminDisptachProps) => {
  // require key variable
  if (!values) throw Error("values is required");
  if (!setFormStatus) throw Error("setFormStatus is required");
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    setFormStatus("LOADING");
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data }: DataResponse<AppAssets> = await axiosMedia.put(`/store/update-store/${appId}`, values);
    if (data) {
      setFormStatus("SUCCESS");
      handleAppAssets(data);
    }
  } catch (error) {
    axiosError({ error, dispatch, target: "updateStore", type: "form-error" });
  }
};
