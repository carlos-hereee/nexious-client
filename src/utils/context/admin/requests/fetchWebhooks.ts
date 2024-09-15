import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { axiosAuth } from "@axios/axiosAuth";
import { AdminDisptachProps } from "app-admin";

export const fetchWebhooks = async ({ dispatch }: AdminDisptachProps) => {
  const { data } = await axiosAuth.get("/stripe/webhook");
  dispatch({ type: ADMIN_ACTIONS.SET_WEBHOOKS, payload: data });
};
