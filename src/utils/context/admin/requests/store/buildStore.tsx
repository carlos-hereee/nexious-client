import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosMedia } from "@axios/axiosMedia";
import { genericErrorMessages } from "@context/log/helpers/genericErrorMessages";
import { AdminDisptachProps } from "app-admin";

export const buildStore = async (props: AdminDisptachProps) => {
  const { dispatch, handleAppAssets, values, appId } = props;
  try {
    if (values) {
      dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
      const { data } = await axiosMedia.post(`/store/build-store/${appId}`, values);
      if (data && handleAppAssets) handleAppAssets(data);
    }
  } catch (error) {
    const errorPayload = { error, adminDispatch: dispatch, target: "buildAppFormError" };
    genericErrorMessages({ ...errorPayload, type: "form-error" });
  }
};
