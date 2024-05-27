import { axiosAuth } from "@axios/axiosAuth";
import { AdminDisptachProps } from "app-admin";

export const getStripeAccount = async ({ appId, handleAppAssets }: AdminDisptachProps) => {
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    const { data } = await axiosAuth.get(`/store/stripe-account/${appId}`);
    if (data) handleAppAssets(data);
  } catch (error) {
    console.log("error :>> ", error);
  }
};
