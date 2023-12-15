import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosMedia } from "@axios/axiosMedia";
import { genericErrorMessages } from "@context/log/helpers/genericErrorMessages";
import { AdminDisptachProps } from "app-admin";

export const updateStore = async (props: AdminDisptachProps) => {
  const { dispatch, handleAppAssets, setFormStatus, values, appId } = props;
  try {
    if (setFormStatus) setFormStatus("LOADING");
    if (values) {
      dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
      const { data } = await axiosMedia.put(`/store/update-store/${appId}`, values);
      if (data && handleAppAssets) {
        if (setFormStatus) setFormStatus("SUCCESS");
        handleAppAssets(data);
      }
    }
  } catch (error) {
    const errorPayload = { error, adminDispatch: dispatch, target: "updateStoreFormError" };
    genericErrorMessages({ ...errorPayload, type: "form-error" });
  }
};
