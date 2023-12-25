import { axiosAuth } from "@axios/axiosAuth";
import { AdminDisptachProps } from "app-admin";

export const updateStripeAccount = async (props: AdminDisptachProps) => {
  const { accountId, updateStripeConfig, config } = props;
  try {
    const { data } = await axiosAuth.put(`/store/account/${accountId}`, config);
    // console.log("data :>> ", data);
    if (data && updateStripeConfig) updateStripeConfig(data);
  } catch (error) {
    console.log("error :>> ", error);
  }
};
