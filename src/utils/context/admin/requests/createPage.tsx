import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps } from "app-admin";

export const createPage = async (props: AdminDisptachProps) => {
  const { appId, dispatch, handleAppAssets, values } = props;

  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosMedia.post(`/app/add-page/${appId}`, values);
    if (data) handleAppAssets(data);
  } catch (error) {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  }
};
