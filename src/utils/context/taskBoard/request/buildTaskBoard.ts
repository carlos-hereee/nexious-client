import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

// export const buildTaskBoard = async ({ appId, values, updateAppData }: TaskBoardDispatch) => {
export const buildTaskBoard = async ({ appId, values }: TaskBoardDispatch) => {
  try {
    const { data } = await axiosAuth.post(`/app/${appId}/task-board/build`, values);
    console.log("data :>> ", data);
    // if (updateAppData) updateAppData(data);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
