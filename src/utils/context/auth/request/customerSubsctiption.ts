import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AuthDispatchProps } from "auth-context";

export const customerSubscription = async ({ plan }: AuthDispatchProps) => {
  try {
    const { data } = await axiosAuth.post("/auth/upgrade-account", plan);
    window.location.href = data;
  } catch (error) {
    if (isDev) console.log("error :>> ", error);
  }
};
