import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AdminDisptachProps } from "app-admin";

export const getStripeAccount = async ({ appId, handleAppAssets }: AdminDisptachProps) => {
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    const { data } = await axiosAuth.get(`/store/stripe-account/${appId}`);
    if (data) handleAppAssets(data);
  } catch (error) {
    if (isDev) console.log("error :>> ", error);
  }
};
