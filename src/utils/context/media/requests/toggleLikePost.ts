import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { MediaDispatchProps } from "media-context";

export const toggleLikePost = async ({ postId, updateUser }: MediaDispatchProps) => {
  try {
    const { data } = await axiosAuth.put(`post/toggle-like-post/${postId}`);
    if (updateUser) updateUser(data.user);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};

export const toggleLikeMsg = async ({ messageId, updateUser }: MediaDispatchProps) => {
  try {
    const { data } = await axiosAuth.put(`post/toggle-like-message/${messageId}`);
    if (updateUser) updateUser(data.user);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
