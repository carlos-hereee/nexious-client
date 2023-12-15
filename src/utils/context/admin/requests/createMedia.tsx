import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosAuth } from "@axios/axiosAuth";
import { AdminDisptachProps } from "app-admin";

export const createMedia = async (props: AdminDisptachProps) => {
  const { appId, dispatch, handleAppAssets, values } = props;

  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post(`/app/add-media/${appId}`, values);
    if (data && handleAppAssets) handleAppAssets(data);
  } catch (error) {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  }
};
