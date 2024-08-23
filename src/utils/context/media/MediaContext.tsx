import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import mediaState from "@data/mediaState.json";
import { ChildProps } from "app-types";
import { CreatePost, IMediaState, Post, PostReply } from "media-context";
import { MEDIA_ACTIONS } from "@actions/MediaActions";
import { AuthContext } from "@context/auth/AuthContext";
import { reducer } from "./MediaReducer";
import { createPost } from "./requests/createPost";
import { fetchPosts } from "./requests/fetchPosts";
import { addReplyToPost } from "./requests/addReplyToPost";
import { toggleLikePost } from "./requests/toggleLikePost";

export const MediaContext = createContext<IMediaState>({} as IMediaState);

export const MediaState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, mediaState);
  const { updateUser } = useContext(AuthContext);

  const setLoading = useCallback((loading: boolean) => dispatch({ type: MEDIA_ACTIONS.IS_LOADING, payload: loading }), []);
  const setRequestStatus = useCallback((s: string) => dispatch({ type: MEDIA_ACTIONS.SET_REQUEST_STATUS, payload: s }), []);
  const getPosts = useCallback((appId: string) => fetchPosts({ dispatch, appId }), []);
  const updatePost = useCallback((post: Post) => dispatch({ type: MEDIA_ACTIONS.SET_POST, payload: post }), []);
  const updatePosts = useCallback((posts: Post[]) => dispatch({ type: MEDIA_ACTIONS.SET_POSTS, payload: posts }), []);
  const addPost = useCallback((post: CreatePost) => createPost({ dispatch, ...post }), []);

  // user actions
  const postReply = useCallback((data: PostReply) => addReplyToPost({ dispatch, ...data, updateUser }), []);
  const updateLikePost = useCallback((postId: string) => toggleLikePost({ dispatch, postId, updateUser }), []);

  const mediaValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      error: state.error,
      post: state.post,
      posts: state.posts,
      requestStatus: state.requestStatus,
      setLoading,
      setRequestStatus,
      updatePost,
      updatePosts,
      addPost,
      getPosts,
      postReply,
      updateLikePost,
    };
  }, [state.isLoading, state.error, state.requestStatus, state.posts]);
  return <MediaContext.Provider value={mediaValues}> {children}</MediaContext.Provider>;
};
