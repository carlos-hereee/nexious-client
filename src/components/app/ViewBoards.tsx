import { Button, CopyButton } from "nexious-library";
import { homeUrl, serverUrl } from "@config";
import { Boards } from "task-board-context";
import LoadData from "./LoadData";

interface BoardsParam {
  taskBoards: Boards[];
  inviteLink?: string;
  onAddClick?: () => void;
  onViewClick?: (b: Boards) => void;
  onEditClick?: (b: Boards) => void;
  loadFunction?: () => void;
}
const ViewBoards = ({ onAddClick, loadFunction, onEditClick, onViewClick, taskBoards, inviteLink }: BoardsParam) => {
  if (taskBoards.length === 0) {
    return (
      <div className="container">
        <h2 className="heading">Create your first task board</h2>
        <Button label="Create new board" onClick={onAddClick} />
      </div>
    );
  }
  if (typeof taskBoards[0] === "string") return <LoadData loadFunction={loadFunction} />;
  return (
    <div className="flex-wrap">
      {taskBoards.map((board) => (
        <div key={board.uid} className="btn-board-task highlight">
          <h4 className="heading">{board.name || "no name"}</h4>
          {board.description && <p>{board.description}</p>}
          <div className="flex">
            <p>Task board url</p>
            <CopyButton data={`${homeUrl}${board.boardLink}`} label="" />
          </div>
          {inviteLink && (
            <div className="flex">
              <p>Invite link</p>
              <CopyButton data={`${serverUrl}${inviteLink}/${board.boardId}/invite`} />
            </div>
          )}
          {onViewClick && (
            <Button
              label="Inviation requests"
              ping={
                (board.memberInvitations && board.memberInvitations.filter((m) => m.invitationStatus === "pending").length) ||
                undefined
              }
              onClick={() => onViewClick(board)}
            />
          )}
          {onEditClick && <Button label="Edit board" onClick={() => onEditClick(board)} />}
        </div>
      ))}
    </div>
  );
};
export default ViewBoards;
