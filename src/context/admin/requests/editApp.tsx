import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { isDev } from "@app/config";
import { EditAppProps } from "app-forms";
import { ADMIN_ACTIONS } from "@app/utils/types/AdminActions";

export const editApp = async (props: EditAppProps) => {
  const { dispatch, values, appId, handleAppAssets } = props;
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post(`/app/update-app/${appId}`, values);
    handleAppAssets(data);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    isDev && console.log("error building app ", error);
  }
};