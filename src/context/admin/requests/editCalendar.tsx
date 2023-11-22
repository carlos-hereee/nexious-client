import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { ADMIN_ACTIONS } from "@app/utils/types/AdminActions";
import { EditAppProps } from "app-forms";

export const editCalendar = async (props: EditAppProps) => {
  const { dispatch, appId, handleAppAssets, values } = props;

  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.put(`/app/update-calendar/${appId}`, values);
    handleAppAssets(data);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    console.log("error :>> ", error);
  }
};
