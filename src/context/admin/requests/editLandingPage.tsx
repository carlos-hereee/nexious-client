import { isDev } from "@app/config";
import { EditAppProps } from "app-forms";
import { axiosMedia } from "@app/utils/axios/axiosMedia";

export const editLandingPage = async (props: EditAppProps) => {
  const { dispatch, values, appId, handleAppAssets } = props;
  try {
    dispatch({ type: "IS_LOADING", payload: true });
    const { data } = await axiosMedia.post(`/app/update-landing-page/${appId}`, values);
    data && handleAppAssets(data);
    dispatch({ type: "IS_LOADING", payload: false });
  } catch (error) {
    isDev && console.log("error building app ", error);
  }
};
