import { ChildProps } from "app-types";
import { createContext, useCallback, useMemo, useReducer } from "react";
import { Boards, TaskBoardSchema, TaskBoardValues } from "task-board-context";
import { TASK_ACTIONS } from "@actions/TaskBoardAction";
import taskBoard from "@data/taskBoardState.json";
import { reducer } from "./TaskBoardReducer";
import { buildTaskBoard } from "./request/buildTaskBoard";
import { buildBoardListTask } from "./request/buildBoardListTask";
import { getAllAppTaskBoards, getTaskBoardWithBoardId, getTaskBoardWithId } from "./request/getTaskBoardWithId";
import { updateTaskBoard } from "./request/updateTaskBoard";
import { deleteTaskFromList } from "./request/deleteTaskFromList";
import { postCommentToTask } from "./request/postCommentToTask";
import { replyToTaskComment } from "./request/replyToTaskComment";
import { updateBoardListTask } from "./request/updateBoardListTask";
import { updateTaskBoardInivite } from "./request/updateTaskBoardInivite";
import { assignToTask } from "./request/assignToTask";

export const TaskBoardContext = createContext<TaskBoardSchema>({} as TaskBoardSchema);
export const TaskBoardState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, { ...taskBoard, requestStatus: "IDLE" });
  // const { updateUser } = useContext(AuthContext);

  const setRequestStatus = useCallback((data: string) => dispatch({ type: TASK_ACTIONS.SET_REQUEST_STATUS, payload: data }), []);
  // const createTaskBoard = useCallback((data: TaskBoardValues) => buildTaskBoard({ dispatch, ...data, updateAppData }), []);
  const createTaskBoard = useCallback((data: TaskBoardValues) => buildTaskBoard({ dispatch, ...data }), []);
  // const addBoardListTask = useCallback((data: TaskBoardValues) => buildBoardListTask({ dispatch, ...data, updateAppData }), []);
  const addBoardListTask = useCallback((data: TaskBoardValues) => buildBoardListTask({ dispatch, ...data }), []);
  const editTaskBoard = useCallback((data: TaskBoardValues) => updateTaskBoard({ dispatch, ...data }), []);
  const getTaskBoard = useCallback((data: TaskBoardValues) => getTaskBoardWithId({ dispatch, ...data }), []);
  const removeTaskFromList = useCallback((data: TaskBoardValues) => deleteTaskFromList({ dispatch, ...data }), []);
  const getBoardWithBoardId = useCallback((data: TaskBoardValues) => getTaskBoardWithBoardId({ dispatch, ...data }), []);
  const getAllTaskBoard = useCallback((data: TaskBoardValues) => getAllAppTaskBoards({ dispatch, ...data }), []);
  const addCommentTask = useCallback((data: TaskBoardValues) => postCommentToTask({ dispatch, ...data }), []);
  const replyToComment = useCallback((data: TaskBoardValues) => replyToTaskComment({ dispatch, ...data }), []);
  const setTaskBoard = useCallback((data: TaskBoardValues) => updateBoardListTask({ dispatch, ...data }), []);
  const setActiveBoard = useCallback((data: Boards) => dispatch({ type: TASK_ACTIONS.SET_TASK_BOARD, payload: data }), []);
  const taskBoardInvitation = useCallback((data: TaskBoardValues) => updateTaskBoardInivite({ dispatch, ...data }), []);
  const assignMemberToTask = useCallback((data: TaskBoardValues) => assignToTask({ dispatch, ...data }), []);

  const taskBoardValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      requestStatus: state.requestStatus,
      taskBoard: state.taskBoard,
      createTaskBoard,
      getTaskBoard,
      getAllTaskBoard,
      editTaskBoard,
      getBoardWithBoardId,
      addBoardListTask,
      addCommentTask,
      removeTaskFromList,
      replyToComment,
      setTaskBoard,
      setActiveBoard,
      taskBoardInvitation,
      assignMemberToTask,
      setRequestStatus,
    };
  }, [state.isLoading, state.taskBoard, state.requestStatus]);
  return <TaskBoardContext.Provider value={taskBoardValues}>{children}</TaskBoardContext.Provider>;
};
