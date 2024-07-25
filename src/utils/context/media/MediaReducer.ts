import { MEDIA_ACTIONS } from "@actions/MediaActions";
import { MediaActionProps, MediaState } from "media-context";

export const reducer = (state: MediaState, action: MediaActionProps): MediaState => {
  switch (action.type) {
    case MEDIA_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};
