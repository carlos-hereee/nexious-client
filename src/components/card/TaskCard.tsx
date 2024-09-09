import { Task } from "app-types";
import { Button, ButtonCancel, Loading } from "nexious-library";

interface P {
  task: Task;
  isDraggable?: boolean;
  theme?: string;
  // ref?: React.RefObject<HTMLButtonElement>;
  onTaskClick?: () => void;
  onTaskRemovalClick?: () => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
}
const TaskCard = (props: P) => {
  const { theme, task, isDraggable, onTaskClick, onTaskRemovalClick, onDragStart, onDragEnd } = props;
  return (
    <div className={theme || "task-card-container"} draggable={isDraggable} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {typeof task === "string" ? (
        <Loading />
      ) : (
        <Button
          theme="btn-task-card highlight"
          onClick={onTaskClick}
          draggable={isDraggable}
          // ref={ref}
          // onDragStart={onDragStart}
          // onDragEnd={onDragEnd}
        >
          {task.name && <h4 className="heading"> {task.name}</h4>}
          {task.description && <p> {task.description}</p>}
        </Button>
      )}
      {onTaskRemovalClick && (
        <ButtonCancel label="X" hideIcon theme="btn-task-card-remove highlight" onClick={onTaskRemovalClick} />
      )}
    </div>
  );
};
export default TaskCard;
