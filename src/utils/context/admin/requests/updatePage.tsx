// import { isDev } from "@app/config";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps } from "app-admin";

export const updatePage = async (props: AdminDisptachProps) => {
  const { dispatch, values, appId, handleAppAssets, name } = props;
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    // console.log("values :>> ", values);
    const { data } = await axiosMedia.post(`/app/update-page/${appId}/page/${name}`, values);
    if (data) handleAppAssets(data);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
    // isDev && console.log("error building app ", error);
  }
};
