// import { isDev } from "@app/config";
import { EditAppProps } from "app-forms";
import { axiosMedia } from "@app/utils/axios/axiosMedia";
import { ADMIN_ACTIONS } from "@app/utils/types/AdminActions";

export const editAppName = async (props: EditAppProps) => {
  const { dispatch, values, appId, handleAppAssets } = props;
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosMedia.put(`/app/update-app-name/${appId}`, values);
    if (data) handleAppAssets(data);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    // isDev && console.log("error building app ", error);
    // dispatch({ type: "SET_APP_ID", payload: "" });
    // dispatch({ type: "IS_LOADING", payload: false });
  }
};
