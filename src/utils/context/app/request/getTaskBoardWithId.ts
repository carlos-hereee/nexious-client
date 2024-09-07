import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const getTaskBoardWithId = async ({ appId, dispatch }: AppDispatchProps) => {
  try {
    const { data } = await axiosAuth.get(`/app/${appId}/task-board`);
    dispatch({ type: APP_ACTIONS.SET_APP_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};

export const getTaskBoardWithBoardId = async ({ appId, dispatch, id }: AppDispatchProps) => {
  try {
    const { data } = await axiosAuth.get(`/app/${appId}/task-board/${id}`);
    dispatch({ type: APP_ACTIONS.SET_APP_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
export const getAllAppTaskBoards = async ({ appId, dispatch }: AppDispatchProps) => {
  try {
    const { data } = await axiosAuth.get(`/app/${appId}/task-board/all`);
    dispatch({ type: APP_ACTIONS.SET_APP_BOARD_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
