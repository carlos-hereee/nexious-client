import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AuthDispatchProps } from "auth-context";

export const toggleLikePost = async ({ postId, updateUser }: AuthDispatchProps) => {
  try {
    const { data } = await axiosAuth.put(`auth/toggle-like-post/${postId}`);
    if (updateUser) updateUser(data.user);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
