import { USER_ACTIONS } from "@actions/UserActions";
import { axiosMedia } from "@axios/axiosMedia";
import { isDev } from "@config";
import { UserDispatchProps } from "user-context";

export const addUserPost = async ({ post, updateUser, dispatch }: UserDispatchProps) => {
  try {
    const { data } = await axiosMedia.post(`user/add-post`, post);
    if (updateUser) updateUser(data.user);
    dispatch({ type: USER_ACTIONS.SET_STATUS, payload: "SUCCESS" });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
