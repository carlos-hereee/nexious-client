import { MEDIA_ACTIONS } from "@actions/MediaActions";
import { axiosAuth } from "@axios/axiosAuth";
import { MediaDispatchProps } from "media-context";

export const fetchPosts = async ({ dispatch, appId }: MediaDispatchProps) => {
  try {
    const { data } = await axiosAuth.get(`/post/${appId}`);
    dispatch({ type: MEDIA_ACTIONS.SET_POSTS, payload: data });
  } catch (error) {
    dispatch({ type: MEDIA_ACTIONS.SET_ERROR, payload: "uanble to create post" });
  }
};
