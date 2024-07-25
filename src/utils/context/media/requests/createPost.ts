import { MEDIA_ACTIONS } from "@actions/MediaActions";
import { axiosAuth } from "@axios/axiosAuth";
import { MediaDispatchProps } from "media-context";

export const createPost = async ({ dispatch, post, appId }: MediaDispatchProps) => {
  try {
    console.log("post :>> ", post);
    const { data } = await axiosAuth.post(`/post/create/${appId}`, post);
    console.log("data :>> ", data);
  } catch (error) {
    dispatch({ type: MEDIA_ACTIONS.SET_ERROR, payload: "uanble to create post" });
  }
};
