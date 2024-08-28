import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { MediaDispatchProps } from "media-context";

export const removePost = async ({ postId, appId }: MediaDispatchProps) => {
  try {
    await axiosAuth.delete(`/post/${appId}/${postId}`);
    // TODO: UPDATE POSTS
    // console.log("data :>> ", data);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
