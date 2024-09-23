import { TASK_ACTIONS } from "@actions/TaskBoardAction";
import { AppActionProps, TaskBoardStateProps } from "task-board-context";

export const reducer = (state: TaskBoardStateProps, action: AppActionProps): TaskBoardStateProps => {
  switch (action.type) {
    case TASK_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};
