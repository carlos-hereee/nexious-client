import { ADMIN_ACTIONS } from "@app/utils/@types/actions/AdminActions";
import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { AdminDisptachProps } from "app-admin";

export const getBucket = async (props: AdminDisptachProps) => {
  const { appId, dispatch } = props;
  try {
    const { data } = await axiosAuth.get(`public/bucket/${appId}`);
    console.log("data :>> ", data);
  } catch (error) {
    // isDev && console.log("error", error);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  }
};
