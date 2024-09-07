import { Boards } from "app-types";
import { Button, CopyButton } from "nexious-library";
import { homeUrl } from "@config";
import LoadData from "./LoadData";

interface BoardsParam {
  taskBoards: Boards[];
  onAddClick?: () => void;
  onEditClick?: (b: Boards) => void;
  loadFunction?: () => void;
}
const ViewBoards = ({ taskBoards, onAddClick, loadFunction, onEditClick }: BoardsParam) => {
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
          {board.description && <p>{board.description}</p>}
          <CopyButton data={`${homeUrl}${board.boardLink}`} />
          <Button label="Edit board" onClick={() => onEditClick && onEditClick(board)} />
        </div>
      ))}
    </div>
  );
};
export default ViewBoards;
