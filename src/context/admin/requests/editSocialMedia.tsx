import { axiosMedia } from "@app/utils/axios/axiosMedia";
import { ADMIN_ACTIONS } from "@app/utils/types/AdminActions";
import { EditAppProps } from "app-forms";

export const editSocialMedia = async (props: EditAppProps) => {
  const { appId, dispatch, handleAppAssets, values } = props;
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosMedia.post(`app/udpate-socials/${appId}`, values);
    handleAppAssets(data);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {}
};
