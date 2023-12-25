import { axiosMedia } from "@axios/axiosMedia";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { AdminDisptachProps } from "app-admin";
import { genericErrorMessages } from "@context/log/helpers/genericErrorMessages";

export const updateAppDetails = async (props: AdminDisptachProps) => {
  const { dispatch, values, appId, handleAppAssets } = props;
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosMedia.put(`/app/update-app-details/${appId}`, values);
    if (data && handleAppAssets) handleAppAssets(data);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    const errorPayload = { error, adminDispatch: dispatch, target: "updateAppDetailsFormError" };
    genericErrorMessages({ ...errorPayload, type: "form-error" });
  }
};
