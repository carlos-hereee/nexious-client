import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosAuth } from "@axios/axiosAuth";
import { axiosError } from "@axios/axiosError";
import { AdminDisptachProps } from "app-admin";

export const removeMerch = async ({ dispatch, handleAppAssets, appId, merchId }: AdminDisptachProps) => {
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.delete(`/store/remove-merch/${appId}/${merchId}`);
    if (data) handleAppAssets(data);
  } catch (error) {
    axiosError({ error, dispatch, target: "removeMerch", type: "form-error" });
  }
};
