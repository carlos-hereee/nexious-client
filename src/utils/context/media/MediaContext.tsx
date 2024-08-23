import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import mediaState from "@data/mediaState.json";
import { ChildProps } from "app-types";
import { CreatePost, IMediaState, Post, PostReply } from "media-context";
import { MEDIA_ACTIONS } from "@actions/MediaActions";
import { AuthContext } from "@context/auth/AuthContext";
import { reducer } from "./MediaReducer";
import { createPost } from "./requests/createPost";
import { fetchPosts } from "./requests/fetchPosts";
import { addMessageReply, addReplyToPost } from "./requests/addReplyToPost";
import { toggleLikePost, toggleLikeMsg } from "./requests/toggleLikePost";
import { editPost } from "./dispatch/editPost";

export const MediaContext = createContext<IMediaState>({} as IMediaState);

export const MediaState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, mediaState);
  const { updateUser } = useContext(AuthContext);

  const updatePost = useCallback((data: PostReply) => editPost({ dispatch, ...data }), []);
  const setLoading = useCallback((loading: boolean) => dispatch({ type: MEDIA_ACTIONS.IS_LOADING, payload: loading }), []);
  const setRequestStatus = useCallback((s: string) => dispatch({ type: MEDIA_ACTIONS.SET_REQUEST_STATUS, payload: s }), []);
  const getPosts = useCallback((appId: string) => fetchPosts({ dispatch, appId }), []);
  const updatePosts = useCallback((posts: Post[]) => dispatch({ type: MEDIA_ACTIONS.SET_POSTS, payload: posts }), []);
  const addPost = useCallback((post: CreatePost) => createPost({ dispatch, ...post }), []);

  // user actions
  const postReply = useCallback((data: PostReply) => addReplyToPost({ dispatch, ...data, updateUser, updatePost }), []);
  const postMessageReply = useCallback((data: PostReply) => addMessageReply({ dispatch, ...data, updateUser, updatePost }), []);
  const updateLikePost = useCallback((postId: string) => toggleLikePost({ dispatch, postId, updateUser }), []);
  const updateLikeMessage = useCallback((data: PostReply) => toggleLikeMsg({ dispatch, ...data, updateUser, updatePost }), []);

  const mediaValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      error: state.error,
      post: state.post,
      posts: state.posts,
      requestStatus: state.requestStatus,
      setLoading,
      setRequestStatus,
      updatePosts,
      addPost,
      getPosts,
      postReply,
      updateLikePost,
      postMessageReply,
      updateLikeMessage,
    };
  }, [state.isLoading, state.error, state.requestStatus, state.posts]);
  return <MediaContext.Provider value={mediaValues}> {children}</MediaContext.Provider>;
};
