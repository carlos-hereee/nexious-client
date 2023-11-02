import { isDev } from "@app/config";
import { EditAppProps } from "app-forms";
import { axiosMedia } from "@app/utils/axios/axiosMedia";

export const editAppName = async (props: EditAppProps) => {
  const { dispatch, values, appId, updateAppData } = props;
  try {
    dispatch({ type: "IS_LOADING", payload: true });
    const { data } = await axiosMedia.post(`/app/update-app-name/${appId}`, values);
    data && updateAppData(data);
    dispatch({ type: "IS_LOADING", payload: false });
  } catch (error) {
    isDev && console.log("error building app ", error);
    // dispatch({ type: "SET_APP_ID", payload: "" });
    // dispatch({ type: "IS_LOADING", payload: false });
  }
};
