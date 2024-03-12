import { axiosAuth } from "@axios/axiosAuth";
import { axiosError } from "@axios/axiosError";
import { AuthDispatchProps, UserSchema } from "auth-context";
import { DataResponse } from "utils/@types/response";

export const setSubscribe = async ({ dispatch, appId, updateUser }: AuthDispatchProps) => {
  // require key variable
  if (!updateUser) throw Error("updateUser is required");
  try {
    const { data }: DataResponse<UserSchema> = await axiosAuth.post(`/app/subscribe/${appId}`);
    if (data) updateUser(data);
  } catch (error) {
    axiosError({ dispatch, type: "auth", error, target: "subscribe" });
  }
};
