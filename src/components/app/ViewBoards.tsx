import { Boards } from "app-types";
import { Button, CopyButton } from "nexious-library";
import { homeUrl } from "@config";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import LoadData from "./LoadData";

interface BoardsParam {
  onAddClick?: () => void;
  onEditClick?: (b: Boards) => void;
  loadFunction?: () => void;
}
const ViewBoards = ({ onAddClick, loadFunction, onEditClick }: BoardsParam) => {
  const { taskBoards } = useContext(AppContext);
  if (taskBoards.length === 0) {
    return (
      <div className="container">
        <h2 className="heading text-center">Create your first task board</h2>
        <Button label="Create new board" onClick={onAddClick} />
      </div>
    );
  }
  if (typeof taskBoards[0] === "string") return <LoadData loadFunction={loadFunction} />;
  return (
    <div className="container">
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
