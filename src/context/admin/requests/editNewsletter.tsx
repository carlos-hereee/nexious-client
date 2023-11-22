import { axiosMedia } from "@app/utils/axios/axiosMedia";
import { ADMIN_ACTIONS } from "@app/utils/types/AdminActions";
import { EditAppProps } from "app-forms";

export const editNewsletter = async (props: EditAppProps) => {
  const { dispatch, appId, handleAppAssets, values } = props;

  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosMedia.put(`/app/update-newsletter/${appId}`, values);
    handleAppAssets(data);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    // console.log("error :>> ", error);
  }
};
