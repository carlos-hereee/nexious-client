import { ADMIN_ACTIONS } from "@app/utils/actions/AdminActions";
import { axiosMedia } from "@app/utils/axios/axiosMedia";
import { AdminDisptachProps } from "app-admin";
import { InitAppProps } from "app-forms";

export const buildApp = async (props: AdminDisptachProps) => {
  const { dispatch, handleAppAssets, values } = props;
  // try {
  const val = values as InitAppProps;
  if (values) {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosMedia.post(`/app/init-app/${val.appName}`, val);
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
