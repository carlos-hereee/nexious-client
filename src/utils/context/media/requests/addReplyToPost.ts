import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { MediaDispatchProps } from "media-context";

export const addReplyToPost = async ({ postId, reply, updateUser, updatePost, posts }: MediaDispatchProps) => {
  try {
    const { data } = await axiosAuth.post(`post/post-reply/${postId}`, reply);
    if (updateUser) updateUser(data.user);
    if (updatePost && posts) updatePost({ posts, post: data.post });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
export const addMessageReply = async ({ messageId, reply, updateUser, updatePost, posts }: MediaDispatchProps) => {
  try {
    const { data } = await axiosAuth.post(`post/post-message-reply/${messageId}`, reply);
    if (updateUser) updateUser(data.user);
    if (updatePost && posts) updatePost({ post: data.message, posts });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
