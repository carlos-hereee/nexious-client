import { MEDIA_ACTIONS } from "@actions/MediaActions";
import { axiosAuth } from "@axios/axiosAuth";
import { MediaDispatchProps } from "media-context";

export const createPost = async ({ dispatch, post, appId }: MediaDispatchProps) => {
  try {
    await axiosAuth.post(`/post/create/${appId}`, post);
    dispatch({ type: MEDIA_ACTIONS.SET_REQUEST_STATUS, payload: "SUCCESS" });
  } catch (error) {
    dispatch({ type: MEDIA_ACTIONS.SET_ERROR, payload: "uanble to create post" });
  }
};
