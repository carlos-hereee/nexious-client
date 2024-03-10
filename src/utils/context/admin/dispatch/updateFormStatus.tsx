import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { AdminDisptachProps } from "app-admin";

export const updateFormStatus = async ({ dispatch, status }: AdminDisptachProps) => {
  // require key variable
  if (!status) throw Error("status is required");
  dispatch({ type: ADMIN_ACTIONS.SET_FORM_STATUS, payload: status });
};
