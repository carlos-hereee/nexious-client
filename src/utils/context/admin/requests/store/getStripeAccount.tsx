import { axiosAuth } from "@axios/axiosAuth";
import { AdminDisptachProps } from "app-admin";

export const getStripeAccount = async (props: AdminDisptachProps) => {
  const { accountId, updateStripeConfig } = props;
  try {
    const { data } = await axiosAuth.get(`/store/account/${accountId}`);
    // console.log("data :>> ", data);
    if (data && updateStripeConfig) updateStripeConfig(data);
  } catch (error) {
    console.log("error :>> ", error);
  }
};
