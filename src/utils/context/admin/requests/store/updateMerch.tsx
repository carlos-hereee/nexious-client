import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosMedia } from "@axios/axiosMedia";
import { genericErrorMessages } from "@context/log/helpers/genericErrorMessages";
import { AdminDisptachProps } from "app-admin";

export const updateMerch = async (props: AdminDisptachProps) => {
  const { dispatch, handleAppAssets, values, appId, merchId } = props;
  try {
    if (values) {
      dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
      const { data } = await axiosMedia.put(`/store/update-merch/${appId}/${merchId}`, values);
      if (data && handleAppAssets) handleAppAssets(data);
    }
  } catch (error) {
    const errorPayload = { error, adminDispatch: dispatch, target: "editMerchFormError" };
    genericErrorMessages({ ...errorPayload, type: "form-error" });
  }
};
