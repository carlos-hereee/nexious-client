import { axiosMedia } from "@app/utils/axios/axiosMedia";
import { ADMIN_ACTIONS } from "@app/utils/actions/AdminActions";
import { AdminDisptachProps } from "app-admin";

export const updateNewsletter = async (props: AdminDisptachProps) => {
  const { dispatch, appId, handleAppAssets, values } = props;
  dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosMedia.post(`/app/update-newsletter/${appId}`, values);
  handleAppAssets(data);
  dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
};
