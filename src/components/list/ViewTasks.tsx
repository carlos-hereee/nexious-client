import LoadData from "@components/app/LoadData";
import { Boards } from "app-types";

interface IViewTasks {
  taskBoard: Boards | string;
  loadFunction?: (id: string) => void;
}
const ViewTasks = ({ taskBoard, loadFunction }: IViewTasks) => {
  if (typeof taskBoard === "string") return <LoadData id={taskBoard} loadFunction={loadFunction} />;
  if (!taskBoard.boardId) return <h2 className="heading text-center">No task board selected</h2>;
  return <div className="primary-container">ViewTasks</div>;
};
export default ViewTasks;
