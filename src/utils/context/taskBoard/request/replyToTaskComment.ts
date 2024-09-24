import { TASK_ACTIONS } from "@actions/TaskBoardAction";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

export const replyToTaskComment = async ({ dispatch, messageId, reply, id }: TaskBoardDispatch) => {
  try {
    const { data } = await axiosAuth.post(`task-board/${id}/task/comment/${messageId}`, reply);
    dispatch({ type: TASK_ACTIONS.SET_TASK_BOARD, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
