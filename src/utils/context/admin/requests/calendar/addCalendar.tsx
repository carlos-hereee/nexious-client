import { axiosAuth } from "@axios/axiosAuth";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { AdminDisptachProps } from "app-admin";
// import { AxiosError } from "axios";

export const addCalendar = async (props: AdminDisptachProps) => {
  const { dispatch, appId, handleAppAssets, values } = props;
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post(`/calendar/${appId}`, values);
    handleAppAssets(data);
    // dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    // console.log("error :>> ", error);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
    // const err = error as AxiosError;
  }
};
