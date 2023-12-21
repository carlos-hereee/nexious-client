import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosAuth } from "@axios/axiosAuth";
import { genericErrorMessages } from "@context/log/helpers/genericErrorMessages";
import { AdminDisptachProps } from "app-admin";

export const removeStore = async (props: AdminDisptachProps) => {
  const { dispatch, handleAppAssets, appId } = props;
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.delete(`/store/remove-store/${appId}`);
    if (data && handleAppAssets) handleAppAssets(data);
  } catch (error) {
    const errorPayload = { error, adminDispatch: dispatch, target: "buildAppFormError" };
    genericErrorMessages({ ...errorPayload, type: "form-error" });
  }
};
