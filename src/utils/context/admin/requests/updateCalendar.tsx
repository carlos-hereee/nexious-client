import { axiosAuth } from "@axios/axiosAuth";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { AdminDisptachProps } from "app-admin";
// import { AxiosError } from "axios";

export const updateCalendar = async (props: AdminDisptachProps) => {
  const { dispatch, appId, handleAppAssets, values } = props;

  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post(`/app/update-calendar/${appId}`, values);
    if (handleAppAssets) handleAppAssets(data);
    // dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    // console.log("error :>> ", error);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
    // const err = error as AxiosError;
  }
};
