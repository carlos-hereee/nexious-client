import { UserContext } from "@context/user/UserContext";
import { useContext, useEffect, useState } from "react";
import { Button, Dialog } from "nexious-library";
import CreateTaskBoard from "@components/app/forms/app/CreateTaskBoard";
import ViewBoards from "@components/app/ViewBoards";
import { TaskBoardContext } from "@context/taskBoard/TaskBoardContext";

const UserTaskBoard = () => {
  const { boards } = useContext(UserContext);
  const { createTaskBoard, requestStatus, setRequestStatus } = useContext(TaskBoardContext);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (requestStatus === "SUCCESS") {
      setActive("");
      setRequestStatus("IDLE");
    }
  }, [requestStatus]);
  // TODO: User taskboard
  // const [activeBoard, setBoard] = useState<Boards | undefined>();

  // const handleBoardEditClick = (value: Boards) => {
  //   setActive("edit-board");
  //   setBoard(value);
  // };
  // const handleBoardViewClick = (value: Boards) => {
  //   setActive("view-board");
  //   setBoard(value);
  // };
  // const handleRequestClick = (data: { status: string; user: UserData }) => {
  //   console.log("data :>> ", data);
  // };
  // const handleEditSubmit = (values: { [x: string]: string }) => {
  //   console.log("data :>> ", values);
  // };
  return (
    <div className="container">
      <h1 className="heading">Your taskboard</h1>

      <Button label="Create a taskboard" onClick={() => setActive("add-board")} />
      <ViewBoards
        onAddClick={() => setActive("add-board")}
        // inviteLink="/user/task-board"
        // onEditClick={handleBoardEditClick}
        // onViewClick={handleBoardViewClick}
        taskBoards={boards.map((b) => b.boardId)}
      />
      {active && (
        <Dialog onDialogClose={() => setActive("")}>
          {active === "add-board" && <CreateTaskBoard onSubmit={createTaskBoard} />}
          {/* {active === "view-board" && activeBoard && (
            <ViewTaskBoardRequests taskBoard={activeBoard} onClick={handleRequestClick} />
          )}
          {active === "edit-board" && activeBoard && <EditTaskBoard taskBoard={activeBoard} onSubmit={handleEditSubmit} />} */}
        </Dialog>
      )}
    </div>
  );
};
export default UserTaskBoard;
