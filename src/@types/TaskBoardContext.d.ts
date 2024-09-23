declare module "task-board-context" {
  import { TASK_ACTIONS } from "@actions/TaskBoardAction";

  export interface UserData {
    name: string;
    avatar: string;
    role: string;
    invitationStatus: string;
    userId: string;
  }
  export interface Task {
    uid: string;
    taskId: string;
    name: string;
    description: string;
    dueDate: string;
    dueTime: string;
    comments: string[];
    pinnedComment: string[];
    createdBy: UserData;
    assignedTo: UserData[];
  }
  export interface TaskList {
    listId: string;
    uid: string;
    name: string;
    description: string;
    order: number;
    tasks: Task[];
  }
  export interface Boards {
    boardId: string;
    uid: string;
    ownerId: string;
    name: string;
    description: string;
    boardLink: string;
    lists: TaskList[];
    members: UserData[];
    memberInvitations: UserData[];
  }
  export interface TaskBoardValues {
    appId?: string;
    values?: { [key: string]: string };
    reply?: { star?: number; data: string };
    id?: string;
    listId?: string;
    taskId?: string;
    messageId?: string;
    status?: string;
    user?: UserData;
    userId?: string;
    board?: Boards;
  }
  export interface TaskBoardStateProps {
    isLoading: boolean;
  }
  // task board context schema
  export interface TaskBoardSchema extends TaskBoardStateProps {
    createTaskBoard: (props: TaskBoardValues) => void;
    editTaskBoard: (props: TaskBoardValues) => void;
    getTaskBoard: (props: TaskBoardValues) => void;
    getBoardWithBoardId: (props: TaskBoardValues) => void;
    getAllTaskBoard: (props: TaskBoardValues) => void;
    removeTaskFromList: (props: TaskBoardValues) => void;
    addBoardListTask: (props: TaskBoardValues) => void;
    addCommentTask: (props: TaskBoardValues) => void;
    replyToComment: (props: TaskBoardValues) => void;
    setActiveBoard: (props: Boards) => void;
    setTaskBoard: (props: TaskBoardValues) => void;
    taskBoardInvitation: (props: TaskBoardValues) => void;
    assignMemberToTask: (props: TaskBoardValues) => void;
  }
  export interface TaskBoardDispatch {
    dispatch: React.Dispatch<TaskBoardActionProps>;
    values?: { [x: string]: string };
    id?: string;
    appId?: string;
    taskId?: string;
    userId?: string;
    status?: string;
    user?: UserData;
    messageId?: string;
    board?: Boards;
    reply?: { star?: number; data: string };
    listId?: string;
  }
  export type AppActionProps =
    | { type: TASK_ACTIONS.IS_LOADING; payload: boolean }
    | { type: TASK_ACTIONS.SET_TASKS; payload: Boards };
}
