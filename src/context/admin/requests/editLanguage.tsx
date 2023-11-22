import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { ADMIN_ACTIONS } from "@app/utils/types/AdminActions";
// import { isDev } from "@app/config";
import { EditAppProps } from "app-forms";

export const editLanguage = async (props: EditAppProps) => {
  const { dispatch, values, appId, handleAppAssets } = props;
  dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.put(`/app/update-language/${appId}`, values);
  if (data) handleAppAssets(data);
  dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
};
