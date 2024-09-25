import ViewBoardTasks from "@components/list/ViewBoardTasks";
import { UserContext } from "@context/user/UserContext";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { PageNotFound } from "nexious-library";
import { TaskBoardContext } from "@context/taskBoard/TaskBoardContext";

const ViewUserTaskBoard = () => {
  const { pathname } = useLocation();
  const { boards } = useContext(UserContext);
  const { getBoardWithBoardId } = useContext(TaskBoardContext);
  const boardId = pathname.split("/")[3];
  const target = boards.filter((b) => b.boardId.boardId === boardId)[0];
  // const navigate = useNavigate();

  useEffect(() => {
    if (target) getBoardWithBoardId({ id: target.boardId.boardId });
  }, [target]);
  // if (!target) return <PageNotFound to="/dashboard/task-board" handleClick={() => navigate("/dashboard/task-board")} />;

  return <ViewBoardTasks />;
};
export default ViewUserTaskBoard;
