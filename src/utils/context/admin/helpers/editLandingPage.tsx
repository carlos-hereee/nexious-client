import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { isDev } from "@app/config";
import { EditAppProps } from "app-forms";

export const editLandingPage = async (props: EditAppProps) => {
  const { dispatch, values, appId, handleAppAssets } = props;
  try {
    dispatch({ type: "IS_LOADING", payload: true });
    const { data } = await axiosAuth.post(`/app/update-landing-page/${appId}`, values);
    data && handleAppAssets(data);
    dispatch({ type: "IS_LOADING", payload: false });
  } catch (error) {
    isDev && console.log("error building app ", error);
  }
};
