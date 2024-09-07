import { Task } from "app-types";
import { Hero } from "nexious-library";
import ViewComments from "./ViewComments";

interface VTask {
  task: Task;
}
const ViewTask = ({ task }: VTask) => {
  return (
    <div className="split-container">
      <div className="container">
        <div className="highlight task-body">
          {task.name && <h4 className="heading"> {task.name}</h4>}
          {task.description && <p className="w-full"> {task.description}</p>}
        </div>
        <ViewComments
          comments={task.comments}
          reply={(val) => console.log("val :>> ", val)}
          onMessageReply={(val) => console.log("val :>> ", val)}
        />
      </div>
      <div className="container">
        <div>
          <h3 className="heading">Assigned to:</h3>
          {task.assignedTo ? (
            <div className="user-avatar-container">
              <Hero hero={{ url: task.createdBy.avatar, alt: "user-avatar" }} theme="avatar-sm" />
              <p>Created by: {task.createdBy.name}</p>
            </div>
          ) : (
            <p>No assignees</p>
          )}
        </div>
        <div>
          <h3 className="heading">Created by:</h3>
          <div className="user-avatar-container">
            <Hero hero={{ url: task.createdBy.avatar, alt: "user-avatar" }} theme="avatar-sm" />
            <strong> {task.createdBy.name}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewTask;
