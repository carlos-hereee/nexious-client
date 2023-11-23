import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { ADMIN_ACTIONS } from "@app/utils/actions/AdminActions";
import { AdminDisptachProps } from "app-admin";

export const editApp = async (props: AdminDisptachProps) => {
  const { dispatch, values, appId, handleAppAssets } = props;
  // try {
  dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.put(`/app/update-app/${appId}`, values);
  if (data) handleAppAssets(data);
  // dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  // } catch (error) {
  //   isDev && console.log("error building app ", error);
  // }
};
