import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { MediaDispatchProps } from "media-context";

export const addReplyToPost = async ({ postId, reply, updateUser }: MediaDispatchProps) => {
  try {
    const { data } = await axiosAuth.post(`post/post-reply/${postId}`, reply);
    console.log("data :>> ", data);
    if (updateUser) updateUser(data.user);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
