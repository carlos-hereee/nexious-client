import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps } from "app-admin";
import { PreviewPageProps } from "app-types";
import { AxiosError } from "axios";

export const buildStore = async (props: AdminDisptachProps) => {
  const { dispatch, handleAppAssets, values } = props;
  try {
    const val = values as PreviewPageProps;
    if (values) {
      dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
      const { data } = await axiosMedia.post(`/store/build-store`, val);
      if (data) handleAppAssets(data);
    }
  } catch (error) {
    const err = error as AxiosError;
    console.log("error :>> ", err);
    // dispatch({
    //   type: ADMIN_ACTIONS.SET_FORM_ERRORS,
    //   payload: { initAppFormError: `${err.response?.data}` },
    // });
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  }
};
