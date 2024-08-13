import { axiosMedia } from "@axios/axiosMedia";
import { AuthDispatchProps } from "auth-context";

export const editAvatar = async ({ updateUser, data: d }: AuthDispatchProps) => {
  const { data } = await axiosMedia.post("/auth/avatar", d);
  if (updateUser) updateUser(data.user);
};
