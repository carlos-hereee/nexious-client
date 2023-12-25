import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosMedia } from "@axios/axiosMedia";
import { genericErrorMessages } from "@context/log/helpers/genericErrorMessages";
import { AdminDisptachProps } from "app-admin";

export const buildApp = async (props: AdminDisptachProps) => {
  const { dispatch, handleAppAssets, values } = props;
  try {
    if (values) {
      dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
      const { data } = await axiosMedia.post(`/app/init-app`, values);
      if (data && handleAppAssets) handleAppAssets(data);
    }
  } catch (error) {
    const errorPayload = { error, adminDispatch: dispatch, target: "initAppFormError" };
    genericErrorMessages({ ...errorPayload, type: "form-error" });
  }
};
