import { isDev } from "@app/config";
import { BuildAppProps } from "app-forms";
import { ADMIN_ACTIONS } from "@app/utils/types/AdminActions";
import { axiosMedia } from "@app/utils/axios/axiosMedia";

export const initApp = async (props: BuildAppProps) => {
  const { dispatch, updateUser, updateAppData, values } = props;
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosMedia.post("/app/init-app/" + values.appName, values);
    data.user && updateUser(data.user);
    data.app && updateAppData(data.app);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error: any) {
    const response = error.response;
    isDev && console.log("error building app ", response);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
    dispatch({ type: ADMIN_ACTIONS.SET_FORM_ERRORS, payload: { initAppFormError: response.data } });
  }
};
