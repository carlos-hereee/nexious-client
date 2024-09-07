import { Boards } from "app-types";
import { Button, CopyButton } from "nexious-library";
import { homeUrl } from "@config";
import LoadData from "./LoadData";

interface BoardsParam {
  taskBoards: Boards[];
  onAddClick?: () => void;
  loadFunction?: () => void;
}
const ViewBoards = ({ taskBoards, onAddClick, loadFunction }: BoardsParam) => {
  console.log("taskBoards  :>> ", taskBoards);
  if (taskBoards.length === 0) {
    return (
      <div className="primary-container">
        <h2 className="heading text-center">Create your first task board</h2>
        <Button label="Create new board" onClick={onAddClick} />
      </div>
    );
  }
  if (typeof taskBoards[0] === "string") return <LoadData loadFunction={loadFunction} />;
  return (
    <div className="primary-container">
      <h2 className="heading">Task Boards</h2>
      {taskBoards.map((board) => (
        <div key={board.uid} className="btn-board-task highlight">
          <h4 className="heading">{board.name || "no name"}</h4>
          {board.description && <p className="w-full">{board.description}</p>}
          <CopyButton data={`${homeUrl}${board.boardLink}`} />
        </div>
      ))}
    </div>
  );
};
export default ViewBoards;
