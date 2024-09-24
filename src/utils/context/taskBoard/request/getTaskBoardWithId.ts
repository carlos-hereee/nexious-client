import { TASK_ACTIONS } from "@actions/TaskBoardAction";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

export const getTaskBoardWithId = async ({ appId, dispatch }: TaskBoardDispatch) => {
  try {
    const route = appId ? `/task-board/app/${appId}` : "/task-board";
    const { data } = await axiosAuth.get(route);
    dispatch({ type: TASK_ACTIONS.SET_TASK_BOARD, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};

export const getTaskBoardWithBoardId = async ({ appId, dispatch, id }: TaskBoardDispatch) => {
  try {
    const route = appId ? `/task-board/app/${appId}` : `/task-board/${id}`;
    const { data } = await axiosAuth.get(route);
    dispatch({ type: TASK_ACTIONS.SET_TASK_BOARD, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
export const getAllAppTaskBoards = async ({ appId, dispatch }: TaskBoardDispatch) => {
  try {
    const route = appId ? `/task-board/all/app/${appId}` : "/task-board/all";
    const { data } = await axiosAuth.get(route);
    dispatch({ type: TASK_ACTIONS.SET_TASK_BOARD, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
