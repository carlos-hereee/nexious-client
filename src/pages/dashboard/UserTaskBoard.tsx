import { UserContext } from "@context/user/UserContext";
import { useContext, useState } from "react";
import { Button, Dialog } from "nexious-library";
import CreateTaskBoard from "@components/app/forms/app/CreateTaskBoard";
import ViewBoards from "@components/app/ViewBoards";
import { Boards } from "app-types";

const UserTaskBoard = () => {
  const { boards, createTaskBoard } = useContext(UserContext);
  const [active, setActive] = useState("");

  const handleBoardEditClick = (value: Boards) => {
    console.log("value :>> ", value);
    // updatePhase("phase-edit-task-event");
    // setActiveBoard(value);
  };
  const handleBoardViewClick = (value: Boards) => {
    console.log("value :>> ", value);
    // updatePhase("phase-view-event");
    // setActiveBoard(value);
  };
  return (
    <div className="container">
      <h1 className="heading">Your taskboard</h1>

      <Button label="Create a taskboard" onClick={() => setActive("add-board")} />
      <ViewBoards
        onAddClick={() => setActive("add-board")}
        inviteLink="/user/task-board"
        onEditClick={handleBoardEditClick}
        onViewClick={handleBoardViewClick}
        taskBoards={boards.map((b) => b.boardId)}
      />
      {active && (
        <Dialog onDialogClose={() => setActive("")}>
          {active === "add-board" && <CreateTaskBoard onSubmit={createTaskBoard} />}
        </Dialog>
      )}
    </div>
  );
};
export default UserTaskBoard;
