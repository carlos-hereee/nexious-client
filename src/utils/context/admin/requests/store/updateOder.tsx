import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosAuth } from "@axios/axiosAuth";
import { AdminDisptachProps } from "app-admin";

export const updateOrder = async ({ dispatch, option, appId, from, order, handleAppAssets }: AdminDisptachProps) => {
  // require key variable
  // require key variable
  if (!option) throw Error("option is required");
  if (!appId) throw Error("appId is required");
  if (!order) throw Error("order is required");
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: ADMIN_ACTIONS.SET_FORM_STATUS, payload: "LOADING" });
    const { data } = await axiosAuth.put(`/store/${appId}/order/${option}/from/${from}`, { order });
    handleAppAssets(data);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  }
};
