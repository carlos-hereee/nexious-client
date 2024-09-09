import { Task } from "app-types";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import TaskCard from "@components/card/TaskCard";
import AvatarCard from "@components/card/AvatarCard";
import ViewComments from "./ViewComments";

interface VTask {
  task: Task;
  boardId: string;
}
const ViewTask = ({ task, boardId }: VTask) => {
  const { addCommentTask, appId } = useContext(AppContext);
  console.log("task :>> ", task);
  return (
    <div className="split-container">
      <div className="container">
        <TaskCard task={task} />
        <ViewComments
          comments={task.comments}
          reply={(values) => addCommentTask({ values, appId, id: boardId, taskId: task.taskId })}
          onMessageReply={(val) => console.log("val :>> ", val)}
        />
      </div>
      <div className="container">
        <div>
          <h4 className="heading">Assigned to:</h4>
          {task.assignedTo ? <AvatarCard user={task.createdBy} /> : <p>No assignees</p>}
        </div>
        <div>
          <h4 className="heading">Created by:</h4>
          <AvatarCard user={task.createdBy} />
        </div>
      </div>
    </div>
  );
};
export default ViewTask;
