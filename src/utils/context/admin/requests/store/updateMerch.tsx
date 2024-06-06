import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosAuth } from "@axios/axiosAuth";
import { axiosError } from "@axios/axiosError";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps } from "app-admin";
import { MerchProps } from "store-context";

export const updateMerch = async ({ dispatch, handleAppAssets, values, appId, merchId }: AdminDisptachProps) => {
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  if (!values) throw Error("values is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: ADMIN_ACTIONS.SET_FORM_STATUS, payload: "LOADING" });
    if ((values as MerchProps).merchId) {
      const { data } = await axiosAuth.put(`/store/update-merch/${appId}/stripe`, { merch: values });
      if (data) handleAppAssets(data);
    } else {
      const { data } = await axiosMedia.put(`/store/update-merch/${appId}/merch/${merchId}`, values);
      if (data) handleAppAssets(data);
    }
  } catch (error) {
    axiosError({ error, dispatch, target: "removeMerch", type: "form-error" });
  }
};
