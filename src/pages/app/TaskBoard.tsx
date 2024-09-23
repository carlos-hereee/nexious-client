import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import ViewBoardTasks from "@components/list/ViewBoardTasks";
import { TaskBoardContext } from "@context/taskBoard/TaskBoardContext";

const TaskBoard = () => {
  const { pathname } = useLocation();
  // const navigate = useNavigate();
  const { appId, taskBoard } = useContext(AppContext);
  const { getBoardWithBoardId } = useContext(TaskBoardContext);
  const boardId = pathname.split("/")[3];

  // useEffect(() => {
  //   if (!boardId) navigate(appLink);
  //   if (appId) {
  //     if ((typeof taskBoard === "string" && boardId) || !taskBoard.boardId) getBoardWithBoardId({ id: boardId, appId });
  //   }
  // }, [pathname]);

  // if (typeof taskBoard === "string") return <Loading />;
  return <ViewBoardTasks taskBoard={taskBoard} loadFunction={() => getBoardWithBoardId({ id: boardId, appId })} />;
};
export default TaskBoard;
