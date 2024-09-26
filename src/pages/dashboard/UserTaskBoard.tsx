import { UserContext } from "@context/user/UserContext";
import { useContext, useEffect, useState } from "react";
import { Button, Dialog } from "nexious-library";
import CreateTaskBoard from "@components/app/forms/app/CreateTaskBoard";
import ViewBoards from "@components/app/ViewBoards";
import { TaskBoardContext } from "@context/taskBoard/TaskBoardContext";
import { Boards } from "task-board-context";
import EditTaskBoard from "@components/app/forms/app/EditTaskBoard";
import { useNavigate } from "react-router-dom";

const UserTaskBoard = () => {
  const { boards } = useContext(UserContext);
  const { createTaskBoard, editTaskBoard, requestStatus, setRequestStatus } = useContext(TaskBoardContext);
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const [activeBoard, setBoard] = useState<Boards | undefined>();

  useEffect(() => {
    if (requestStatus === "SUCCESS") {
      setActive("");
      setRequestStatus("IDLE");
    }
  }, [requestStatus]);
  // TODO: User taskboard

  const handleBoardEditClick = (value: Boards) => {
    setActive("edit-board");
    setBoard(value);
  };
  // const handleBoardViewClick = (value: Boards) => {
  //   setActive("view-board");
  //   setBoard(value);
  // };
  // const handleRequestClick = (data: { status: string; user: UserData }) => {
  //   console.log("data :>> ", data);
  // };
  const handleEditSubmit = (values: { [x: string]: string }) => editTaskBoard({ values, id: activeBoard?.boardId });
  return (
    <div className="container">
      <h1 className="heading">Your taskboard</h1>

      <Button label="Create a taskboard" onClick={() => setActive("add-board")} />
      <ViewBoards
        onAddClick={() => setActive("add-board")}
        // inviteLink="/user/task-board"
        onEditClick={handleBoardEditClick}
        onBoardClick={(val: Boards) => navigate(val.boardLink)}
        // onViewClick={(val) => console.log("val :>> ", val)}
        taskBoards={boards.map((b) => b.boardId)}
      />
      {active && (
        <Dialog onDialogClose={() => setActive("")}>
          {active === "add-board" && <CreateTaskBoard onSubmit={createTaskBoard} />}
          {/* {active === "view-board" && activeBoard && (
            <ViewTaskBoardRequests taskBoard={activeBoard} onClick={handleRequestClick} />
          )} */}
          {active === "edit-board" && activeBoard && <EditTaskBoard taskBoard={activeBoard} onSubmit={handleEditSubmit} />}
        </Dialog>
      )}
    </div>
  );
};
export default UserTaskBoard;
