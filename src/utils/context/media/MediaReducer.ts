import { MEDIA_ACTIONS } from "@actions/MediaActions";
import { MediaActionProps, MediaState } from "media-context";

export const reducer = (state: MediaState, action: MediaActionProps): MediaState => {
  switch (action.type) {
    case MEDIA_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case MEDIA_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case MEDIA_ACTIONS.SET_POST:
      return { ...state, post: action.payload };
    case MEDIA_ACTIONS.SET_POSTS:
      return { ...state, posts: action.payload };

    default:
      return state;
  }
};
