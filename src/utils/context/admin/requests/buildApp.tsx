import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosMedia } from "@axios/axiosMedia";
import { AdminDisptachProps } from "app-admin";
import { InitAppProps } from "app-forms";
import { AxiosError } from "axios";

export const buildApp = async (props: AdminDisptachProps) => {
  const { dispatch, handleAppAssets, values } = props;
  try {
    const val = values as InitAppProps;
    if (values) {
      dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
      const { data } = await axiosMedia.post(`/app/init-app`, val);
      if (data) handleAppAssets(data);
    }
  } catch (error) {
    const err = error as AxiosError;
    dispatch({
      type: ADMIN_ACTIONS.SET_FORM_ERRORS,
      payload: { initAppFormError: `${err.response?.data}` },
    });
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  }
};
