import { axiosMedia } from "@app/utils/axios/axiosMedia";
import { ADMIN_ACTIONS } from "@app/utils/actions/AdminActions";
import { AdminDisptachProps } from "app-admin";

export const updateSocialMedia = async (props: AdminDisptachProps) => {
  const { appId, dispatch, handleAppAssets, values } = props;
  // try {
  dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosMedia.post(`app/update-medias/${appId}`, values);
  handleAppAssets(data);
  dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  // } catch (error) {}
};
