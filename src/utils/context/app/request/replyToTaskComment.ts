import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const replyToTaskComment = async ({ dispatch, appId, messageId, reply, id }: AppDispatchProps) => {
  try {
    const { data } = await axiosAuth.post(`app/${appId}/task-board/${id}/task/comment/${messageId}`, reply);
    dispatch({ type: APP_ACTIONS.SET_APP_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
