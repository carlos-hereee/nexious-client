import AddBoardListTask from "@components/app/forms/boardTask/AddBoardListTask";
import LoadData from "@components/app/LoadData";
import ViewTask from "@components/app/ViewTask";
import TaskCard from "@components/card/TaskCard";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { Boards, Task, TaskList } from "app-types";
import { Button, Dialog } from "nexious-library";
import { useContext, useEffect, useState } from "react";

type Phases = "idle" | "add-task" | "view-task";
interface IViewTasks {
  taskBoard: Boards | string;
  loadFunction?: (id: string) => void;
}
const ViewBoardTasks = ({ taskBoard, loadFunction }: IViewTasks) => {
  const { theme } = useContext(AuthContext);
  const { addBoardListTask, appId, requestStatus, setRequestStatus, removeTaskFromList } = useContext(AppContext);
  const [activeList, setList] = useState<TaskList>();
  const [activeTask, setTask] = useState<Task>();
  const [phase, setPhase] = useState<Phases>("idle");

  const resetDialog = () => {
    setList(undefined);
    setTask(undefined);
  };

  useEffect(() => {
    if (requestStatus === "SUCCESS") {
      resetDialog();
      setRequestStatus("IDLE");
      setPhase("idle");
    }
  }, [requestStatus]);

  if (typeof taskBoard === "string") return <LoadData id={taskBoard} loadFunction={loadFunction} />;
  if (!taskBoard.boardId) return <h2 className="heading text-center">No task board selected</h2>;

  const handleAddTaskClick = (l: TaskList) => {
    setList(l);
    setPhase("add-task");
  };
  const handleViewTaskClick = ({ task, list }: { task: Task; list: TaskList }) => {
    setList(list);
    setTask(task);
    setPhase("view-task");
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
              <TaskCard
                key={task.taskId || (task as unknown as string)}
                task={task}
                onTaskClick={() => handleViewTaskClick({ task, list })}
                onTaskRemovalClick={() =>
                  removeTaskFromList({
                    appId,
                    listId: list.listId,
                    taskId: task.taskId || (task as unknown as string),
                    id: taskBoard.boardId,
                  })
                }
              />
            ))}
          </div>
        ))}
      </div>
      {activeList && (
        <Dialog theme={`alt-${theme}`} onDialogClose={resetDialog}>
          {phase === "add-task" && (
            <AddBoardListTask
              onSubmit={(values) => addBoardListTask({ values, appId, id: taskBoard.boardId, listId: activeList.listId })}
            />
          )}
        </Dialog>
      )}
      {activeList && activeTask && (
        <Dialog theme={`alt-${theme}`} onDialogClose={resetDialog}>
          {phase === "view-task" && <ViewTask task={activeTask} boardId={taskBoard.boardId} />}
        </Dialog>
      )}
    </section>
  );
};
export default ViewBoardTasks;
