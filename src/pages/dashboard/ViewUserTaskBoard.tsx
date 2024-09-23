import ViewBoardTasks from "@components/list/ViewBoardTasks";
import { UserContext } from "@context/user/UserContext";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageNotFound } from "nexious-library";

const ViewUserTaskBoard = () => {
  const { pathname } = useLocation();
  const { boards } = useContext(UserContext);
  const boardId = pathname.split("/")[3];
  const target = boards.filter((b) => b.boardId.boardId === boardId)[0];
  const navigate = useNavigate();

  if (!target) return <PageNotFound to="/dashboard/task-board" handleClick={() => navigate("/dashboard/task-board")} />;

  return <ViewBoardTasks taskBoard={target.boardId} />;
};
export default ViewUserTaskBoard;
