import { isDev } from "@app/config";
import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { ADMIN_ACTIONS } from "@app/utils/types/AdminActions";
import { DeleteAppProps } from "app-forms";

export const deleteApp = async (props: DeleteAppProps) => {
  const { appId, updateUser, updateAppData, dispatch, updateAppList } = props;
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.delete("/app/delete-app/" + appId);
    data.user && updateUser(data.user);
    updateAppData({ values: {} });
    data.appList && updateAppList(data.appList);

    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    isDev && console.log("error", error);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  }
};
