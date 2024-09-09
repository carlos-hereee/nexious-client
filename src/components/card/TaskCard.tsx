import { Task } from "app-types";
import { Button, ButtonCancel, Loading } from "nexious-library";

interface P {
  task: Task;
  onTaskClick?: () => void;
  onTaskRemovalClick?: () => void;
}
const TaskCard = ({ task, onTaskClick, onTaskRemovalClick }: P) => {
  return (
    <div className="task-card-container">
      {typeof task === "string" ? (
        <Loading />
      ) : (
        <Button theme="btn-task-card highlight" onClick={onTaskClick}>
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
