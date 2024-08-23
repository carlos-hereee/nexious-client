import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { MediaDispatchProps } from "media-context";

export const addReplyToPost = async ({ postId, reply, updateUser, updatePost }: MediaDispatchProps) => {
  try {
    const { data } = await axiosAuth.post(`post/post-reply/${postId}`, reply);
    if (updateUser) updateUser(data.user);
    if (updatePost) updatePost(data.post);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
export const addMessageReply = async ({ messageId, reply, updateUser, updatePost }: MediaDispatchProps) => {
  try {
    const { data } = await axiosAuth.post(`post/post-message-reply/${messageId}`, reply);
    console.log("data :>> ", data);
    if (updateUser) updateUser(data.user);
    if (updatePost) updatePost(data.message);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
