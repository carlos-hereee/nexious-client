declare module "media-context" {
  import { MEDIA_ACTIONS } from "@actions/MediaActions";

  export interface Post {
    uid: string;
    name: string;
    body: string;
    reviews: string;
  }
  export interface MediaState {
    isLoading: boolean;
    error: string;
    post: Post;
    posts: Post[];
  }
  export interface CreatePost {
    post: Post;
    appId: string;
  }
  export interface IMediaState extends MediaState {
    setLoading: (loading: boolean) => void;
    updatePost: (post: Post) => void;
    updatePosts: (post: Post[]) => void;
    addPost: (event: CreatePost) => void;
  }
  export interface MediaDispatchProps {
    dispatch: React.Dispatch<MediaActionProps>;
    appId?: string;
    post?: Post;
    posts?: Post[];
  }
  export type MediaActionProps =
    | { type: MEDIA_ACTIONS.IS_LOADING; payload: boolean }
    | { type: MEDIA_ACTIONS.SET_ERROR; payload: string }
    | { type: MEDIA_ACTIONS.SET_POST; payload: Post }
    | { type: MEDIA_ACTIONS.SET_POSTS; payload: Post[] };
}
