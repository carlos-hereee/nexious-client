import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ViewBoardTasks from "@components/list/ViewBoardTasks";
import { TaskBoardContext } from "@context/taskBoard/TaskBoardContext";

const TaskBoard = () => {
  const { pathname } = useLocation();
  // const navigate = useNavigate();
  const { appId, taskBoard } = useContext(AppContext);
  const { getBoardWithBoardId, setActiveBoard } = useContext(TaskBoardContext);
  const boardId = pathname.split("/")[3];

  useEffect(() => {
    if (taskBoard) setActiveBoard(taskBoard);
  }, []);

  return <ViewBoardTasks loadFunction={() => getBoardWithBoardId({ id: boardId, appId })} appId={appId} />;
};
export default TaskBoard;
