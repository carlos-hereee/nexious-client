// import { isDev } from "@app/config";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps } from "app-admin";

export const updateLandingPage = async (props: AdminDisptachProps) => {
  const { dispatch, values, appId, handleAppAssets } = props;
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    // console.log("values :>> ", values);
    const { data } = await axiosMedia.post(`/app/update-landing-page/${appId}`, values);
    if (data && handleAppAssets) handleAppAssets(data);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    // isDev && console.log("error building app ", error);
  }
};
