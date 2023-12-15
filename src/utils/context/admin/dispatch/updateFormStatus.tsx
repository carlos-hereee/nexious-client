import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { AdminDisptachProps } from "app-admin";

export const updateFormStatus = async (props: AdminDisptachProps) => {
  const { dispatch, status } = props;
  if (status) dispatch({ type: ADMIN_ACTIONS.SET_FORM_STATUS, payload: status });
};
