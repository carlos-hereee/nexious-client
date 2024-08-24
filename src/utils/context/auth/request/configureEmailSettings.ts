import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AuthDispatchProps } from "auth-context";

export const configureEmailSettings = async ({ settings, updateUser, active }: AuthDispatchProps) => {
  try {
    const { data } = await axiosAuth.put(`auth/email-settings/${active}`, settings);
    console.log("data :>> ", data);
    if (updateUser) updateUser(data.user);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
