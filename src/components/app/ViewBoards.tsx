import { Boards } from "app-types";

interface BoardsParam {
  taskBoards: Boards[];
  onAddClick?: () => void;
}
const ViewBoards = ({ taskBoards }: BoardsParam) => {
  console.log("taskBoards  :>> ", taskBoards);
  return <div className="primary-container">ViewBoards</div>;
};
export default ViewBoards;
