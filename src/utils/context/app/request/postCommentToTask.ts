import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const postCommentToTask = async ({ appId, values, id, taskId }: AppDispatchProps) => {
  try {
    const { data } = await axiosAuth.post(`app/${appId}/task-board/${id}/task/${taskId}/comment`, values);
    console.log("values :>> ", data);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
