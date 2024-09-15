import { axiosMedia } from "@axios/axiosMedia";
import { isDev } from "@config";
import { UserDispatchProps } from "user-context";

export const addUserPost = async ({ post }: UserDispatchProps) => {
  try {
    const { data } = await axiosMedia.post(`user/add-post`, post);
    console.log("data :>> ", data);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
