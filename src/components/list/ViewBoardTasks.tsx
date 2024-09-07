import LoadData from "@components/app/LoadData";
import { Boards } from "app-types";
import { Button } from "nexious-library";

interface IViewTasks {
  taskBoard: Boards | string;
  loadFunction?: (id: string) => void;
}
const ViewBoardTasks = ({ taskBoard, loadFunction }: IViewTasks) => {
  if (typeof taskBoard === "string") return <LoadData id={taskBoard} loadFunction={loadFunction} />;
  if (!taskBoard.boardId) return <h2 className="heading text-center">No task board selected</h2>;
  console.log("taskBoard :>> ", taskBoard);
  return (
    <section className="primary-container hide-overflow">
      {taskBoard.name && <h2 className="heading">{taskBoard.name}</h2>}
      {taskBoard.description && <p className="w-full">{taskBoard.description}</p>}
      <div className="board-list-container">
        {taskBoard.lists.map((list) => (
          <div key={list.uid} className={`board-list highlight ${list.order >= 0 ? ` order-${list.order}` : ""}`}>
            {list.name && <h3 className="heading">{list.name}</h3>}
            <Button theme="btn-create-task highlight" label="Add task" />
            {list.tasks.map((task) => (
              <Button key={task.uid} theme="card">
                {task.name && <h4 className="heading"> {task.name}</h4>}
                {task.description && <p className="w-full"> {task.description}</p>}{" "}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
export default ViewBoardTasks;
