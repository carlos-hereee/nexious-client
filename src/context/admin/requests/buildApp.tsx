import { ADMIN_ACTIONS } from "@app/utils/actions/AdminActions";
import { axiosMedia } from "@app/utils/axios/axiosMedia";
import { AdminDisptachProps } from "app-admin";

export const buildApp = async (props: AdminDisptachProps) => {
  const { dispatch, handleAppAssets, initApp } = props;
  // try {
  if (initApp) {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosMedia.post(`/app/init-app/${initApp.appName}`, initApp);
    if (data) handleAppAssets(data);
  }
  // } catch (error: any) {
  //   const response = error.response;
  //   isDev && console.log("error building app ", response);
  //   dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  //   dispatch({
  //     type: ADMIN_ACTIONS.SET_FORM_ERRORS,
  //     payload: { initAppFormError: response.data },
  //   });
  // }
};
