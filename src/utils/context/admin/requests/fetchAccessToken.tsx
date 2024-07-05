import { axiosAuth } from "@axios/axiosAuth";
import { axiosError } from "@axios/axiosError";
import { AdminDisptachProps } from "app-admin";

export const fetchAccessToken = async ({ handleAppAssets, dispatch }: AdminDisptachProps) => {
  // require key variable
  if (!handleAppAssets) throw Error("handleAppAssets is required");
  try {
    const { data } = await axiosAuth.get("/auth/access-token");
    if (data) handleAppAssets(data);
  } catch (error) {
    // console.log("error :>> ", error);
    axiosError({ dispatch, error, type: "accessToken", target: "token" });
  }
};
