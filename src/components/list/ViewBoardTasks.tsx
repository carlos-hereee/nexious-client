import AddBoardListTask from "@components/app/forms/boardTask/AddBoardListTask";
import LoadData from "@components/app/LoadData";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { Boards, TaskList } from "app-types";
import { Button, Dialog } from "nexious-library";
import { useContext, useEffect, useState } from "react";

type Phases = "idle" | "add-task";
interface IViewTasks {
  taskBoard: Boards | string;
  loadFunction?: (id: string) => void;
}
const ViewBoardTasks = ({ taskBoard, loadFunction }: IViewTasks) => {
  const { theme } = useContext(AuthContext);
  const { addBoardListTask, appId, requestStatus, setRequestStatus } = useContext(AppContext);
  const [activeList, setList] = useState<TaskList>();
  const [phase, setPhase] = useState<Phases>("idle");

  useEffect(() => {
    if (requestStatus === "SUCCESS") {
      setList(undefined);
      setRequestStatus("IDLE");
      setPhase("idle");
    }
  }, [requestStatus]);
  if (typeof taskBoard === "string") return <LoadData id={taskBoard} loadFunction={loadFunction} />;
  if (!taskBoard.boardId) return <h2 className="heading text-center">No task board selected</h2>;
  console.log("taskBoard :>> ", taskBoard);

  const handleAddTaskClick = (l: TaskList) => {
    setList(l);
    setPhase("add-task");
  };
  return (
    <section className="primary-container hide-overflow">
      {taskBoard.name && <h2 className="heading">{taskBoard.name}</h2>}
      {taskBoard.description && <p className="w-full">{taskBoard.description}</p>}
      <div className="board-list-container">
        {taskBoard.lists.map((list) => (
          <div key={list.uid} className={`board-list highlight ${list.order >= 0 ? ` order-${list.order}` : ""}`}>
            {list.name && <h3 className="heading">{list.name}</h3>}
            <Button theme="btn-create-task highlight" label="Add task" onClick={() => handleAddTaskClick(list)} />
            {list.tasks.map((task) => (
              <Button key={task.uid} theme="card">
                {task.name && <h4 className="heading"> {task.name}</h4>}
                {task.description && <p> {task.description}</p>}{" "}
              </Button>
            ))}
          </div>
        ))}
      </div>
      {activeList && (
        <Dialog theme={`alt-${theme}`} onDialogClose={() => setList(undefined)}>
          {phase === "add-task" && (
            <AddBoardListTask
              onSubmit={(values) => addBoardListTask({ values, appId, id: taskBoard.boardId, listId: activeList.listId })}
            />
          )}
        </Dialog>
      )}
    </section>
  );
};
export default ViewBoardTasks;
