import { axiosAuth } from "@axios/axiosAuth";
import { AuthDispatchProps } from "auth-context";

export const upgradeTier = async ({ user }: AuthDispatchProps) => {
  try {
    const { data } = await axiosAuth.post("/auth/upgrade-account", user);
    // redirect to checkout
    window.location.href = data;
  } catch (error) {
    console.log("error updating user data :>> ", error);
  }
};
