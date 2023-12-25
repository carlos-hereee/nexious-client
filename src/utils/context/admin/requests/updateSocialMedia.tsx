import { axiosMedia } from "@axios/axiosMedia";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { AdminDisptachProps } from "app-admin";

export const updateSocialMedia = async (props: AdminDisptachProps) => {
  const { appId, dispatch, handleAppAssets, values } = props;
  // try {
  dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosMedia.post(`app/update-medias/${appId}`, values);
  if (handleAppAssets) handleAppAssets(data);
  dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  // } catch (error) {}
};
