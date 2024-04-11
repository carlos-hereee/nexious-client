import { axiosAuth } from "@axios/axiosAuth";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { AdminDisptachProps } from "app-admin";
// import { AxiosError } from "axios";

export const updateCalendar = async ({ dispatch, appId, handleAppAssets, values }: AdminDisptachProps) => {
  // require key variable
  // console.log("values :>> ", values);
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.put(`/calendar/update/${appId}`, values);
    handleAppAssets(data);
    // dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    // console.log("error :>> ", error);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
    // const err = error as AxiosError;
  }
};
