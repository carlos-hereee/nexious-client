import { isDev } from "@config";
import { MediaDispatchProps } from "media-context";

export const editPost = async ({ post, posts }: MediaDispatchProps) => {
  try {
    console.log("post :>> ", post);
    console.log("posts :>> ", posts);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
