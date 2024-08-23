import { MEDIA_ACTIONS } from "@actions/MediaActions";
import { isDev } from "@config";
import { MediaDispatchProps } from "media-context";

export const editPost = async ({ post, posts, dispatch }: MediaDispatchProps) => {
  try {
    // require key variable
    if (!post) throw Error("post param is required");
    if (!posts) throw Error("posts param is required");
    const updatedPosts = posts.map((p) => {
      if (p.postId === post?.postId) return post;
      return p;
    });
    dispatch({ type: MEDIA_ACTIONS.SET_POSTS, payload: updatedPosts });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
