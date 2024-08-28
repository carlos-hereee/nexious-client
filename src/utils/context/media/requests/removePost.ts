import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { MediaDispatchProps } from "media-context";

export const removePost = async ({ postId, appId }: MediaDispatchProps) => {
  try {
    const { data } = await axiosAuth.delete(`/post/${appId}/${postId}`);
    console.log("data :>> ", data);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
