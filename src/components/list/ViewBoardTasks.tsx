import AddBoardListTask from "@components/app/forms/boardTask/AddBoardListTask";
import LoadData from "@components/app/LoadData";
import ViewTask from "@components/app/ViewTask";
import TaskCard from "@components/card/TaskCard";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { Boards, Task, TaskList } from "app-types";
import { Button, Dialog, Loading } from "nexious-library";
import { useContext, useEffect, useState } from "react";

type Phases = "idle" | "add-task" | "view-task";
interface IViewTasks {
  taskBoard: Boards | string;
  loadFunction?: (id: string) => void;
}
interface IDrag {
  event: React.DragEvent<HTMLDivElement>;
  listId: string;
}
const ViewBoardTasks = ({ loadFunction, taskBoard }: IViewTasks) => {
  const { theme } = useContext(AuthContext);
  const { addBoardListTask, appId, requestStatus, setRequestStatus, removeTaskFromList, setTaskBoard } = useContext(AppContext);
  const [activeList, setList] = useState<TaskList>();
  const [activeTask, setTask] = useState<Task>();
  const [phase, setPhase] = useState<Phases>("idle");

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedCard, setDraggedCard] = useState<Task | null>(null);
  const [draggedListId, setDraggedListId] = useState<string | null>(null);

  const resetDialog = () => {
    setList(undefined);
    setTask(undefined);
  };

  const handleDragEnd = () => {
    setTimeout(() => setIsDragging(false), 0);
    setDraggedCard(null);
    setDraggedListId(null);
  };

  useEffect(() => {
    if (requestStatus === "SUCCESS") {
      resetDialog();
      setRequestStatus("IDLE");
      setPhase("idle");
      handleDragEnd();
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
  const handleTaskRemove = ({ listId, taskId }: { listId: string; taskId: string }) => {
    removeTaskFromList({ appId, listId, taskId, id: taskBoard.boardId });
  };

  const handleDragStart = ({ task, listId }: { task: Task; listId: string }) => {
    setDraggedCard(task);
    setDraggedListId(listId);
    setTimeout(() => setIsDragging(true), 0);
  };

  // Handle drop
  const handleDrop = ({ event, listId }: IDrag) => {
    event.preventDefault();

    // If the dragged card exists and the source list is valid
    if (draggedCard && draggedListId !== null) {
      // Remove the card from the current list
      const currentList = taskBoard.lists.filter((list) => list.listId === draggedListId);
      const updatedCurrentList = currentList[0].tasks.filter((task) => task !== draggedCard);

      // // Add the card to the destination list
      const targetlist = taskBoard.lists.filter((list) => list.listId === listId);
      const updatedTargetList = [...targetlist[0].tasks, draggedCard];
      // // Update the lists
      const updatedList = taskBoard.lists.map((list) => {
        if (list.listId === draggedListId) return { ...list, tasks: updatedCurrentList };
        if (list.listId === listId) return { ...list, tasks: updatedTargetList };
        return list;
      });
      setTaskBoard({ board: { ...taskBoard, lists: updatedList }, appId });
    }
  };
  console.log("taskBoard members:>> ", taskBoard.memberInvitations);

  return (
    <section className="primary-container hide-overflow">
      {taskBoard.name && <h2 className="heading">{taskBoard.name}</h2>}
      {taskBoard.description && <p className="w-full">{taskBoard.description}</p>}

      <div className="board-list-container">
        {taskBoard.lists.map((list) => (
          <div
            key={list.uid}
            className={`board-list min-height-65 highlight${list.order >= 0 ? ` order-${list.order}` : ""}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop({ event, listId: list.listId })}
          >
            {list.name && <h3 className="heading">{list.name}</h3>}
            <Button theme="btn-create-task highlight" label="Add task" onClick={() => handleAddTaskClick(list)} />
            {list.tasks.map((task) =>
              requestStatus === "SUCCESS" && draggedCard && draggedCard.taskId === task.taskId ? (
                <Loading key={task.taskId} />
              ) : (
                <TaskCard
                  key={task.taskId}
                  task={task}
                  isDraggable
                  theme={isDragging && draggedCard && draggedCard.taskId === task.taskId ? "hidden" : undefined}
                  onTaskClick={() => handleViewTaskClick({ task, list })}
                  onTaskRemovalClick={() => handleTaskRemove({ listId: list.listId, taskId: task.taskId })}
                  onDragStart={() => handleDragStart({ task, listId: list.listId })}
                  onDragEnd={() => handleDragEnd()}
                />
              )
            )}
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
