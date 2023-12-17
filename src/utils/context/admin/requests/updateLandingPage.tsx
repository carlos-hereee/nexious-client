import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosMedia } from "@axios/axiosMedia";
import { genericErrorMessages } from "@context/log/helpers/genericErrorMessages";
import { AdminDisptachProps } from "app-admin";

export const updateLandingPage = async (props: AdminDisptachProps) => {
  const { dispatch, values, appId, handleAppAssets } = props;
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosMedia.post(`/app/update-landing-page/${appId}`, values);
    if (data && handleAppAssets) handleAppAssets(data);
  } catch (error) {
    const errorPayload = { error, adminDispatch: dispatch, target: "updateLanding" };
    genericErrorMessages({ ...errorPayload, type: "form-error" });
  }
};
