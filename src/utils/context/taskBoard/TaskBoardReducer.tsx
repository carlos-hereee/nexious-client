import { TASK_ACTIONS } from "@actions/TaskBoardAction";
import { AppActionProps, TaskBoardStateProps } from "task-board-context";

export const reducer = (state: TaskBoardStateProps, action: AppActionProps): TaskBoardStateProps => {
  switch (action.type) {
    case TASK_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case TASK_ACTIONS.SET_REQUEST_STATUS:
      return { ...state, requestStatus: action.payload };
    case TASK_ACTIONS.SET_TASK_BOARD:
      return { ...state, taskBoard: action.payload };
    case TASK_ACTIONS.SET_TASK_BOARDS:
      return { ...state, taskBoards: action.payload };

    default:
      return state;
  }
};
