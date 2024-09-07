import LoadData from "@components/app/LoadData";
import { Boards } from "app-types";

interface IViewTasks {
  taskBoard: Boards | string;
  loadFunction?: (id: string) => void;
}
const ViewBoardTasks = ({ taskBoard, loadFunction }: IViewTasks) => {
  if (typeof taskBoard === "string") return <LoadData id={taskBoard} loadFunction={loadFunction} />;
  if (!taskBoard.boardId) return <h2 className="heading text-center">No task board selected</h2>;
  return (
    <div className="primary-container">
      {taskBoard.name && <h2 className="heading">{taskBoard.name}</h2>}
      {taskBoard.description && <p className="w-full">{taskBoard.description}</p>}
      {taskBoard.boardLink && <p className="w-full">{taskBoard.boardLink}</p>}
      {taskBoard.lists.map((list) => (
        <div key={list.uid}>
          {list.name && <h3 className="heading">{list.name}</h3>}
          {list.tasks.map((task) => (
            <div key={task.uid} className="card">
              {task.name && <h4 className="heading"> {task.name}</h4>}
              {task.description && <p className="w-full"> {task.description}</p>}{" "}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default ViewBoardTasks;
