import { Boards } from "app-types";
import { Button, CopyButton } from "nexious-library";
import { homeUrl, serverUrl } from "@config";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import LoadData from "./LoadData";

interface BoardsParam {
  onAddClick?: () => void;
  onViewClick?: (b: Boards) => void;
  onEditClick?: (b: Boards) => void;
  loadFunction?: () => void;
}
const ViewBoards = ({ onAddClick, loadFunction, onEditClick, onViewClick }: BoardsParam) => {
  const { taskBoards, appId } = useContext(AppContext);
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
          <div className="flex">
            <p>Task board url</p>
            <CopyButton data={`${homeUrl}${board.boardLink}`} label="" />
          </div>
          <div className="flex">
            <p>Inviation link</p>
            <CopyButton data={`${serverUrl}/app/${appId}/task-board/${board.boardId}/invite`} />
          </div>
          <Button
            label="Inviation requests"
            ping={
              (board.memberInvitations && board.memberInvitations.filter((m) => m.invitationStatus === "pending").length) ||
              undefined
            }
            onClick={() => onViewClick && onViewClick(board)}
          />
          <Button label="Edit board" onClick={() => onEditClick && onEditClick(board)} />
        </div>
      ))}
    </div>
  );
};
export default ViewBoards;
