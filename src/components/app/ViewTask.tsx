import { useContext } from "react";
import TaskCard from "@components/card/TaskCard";
import { TaskBoardContext } from "@context/taskBoard/TaskBoardContext";
import { Task } from "task-board-context";
import AvatarCard from "@components/card/AvatarCard";
import { IconButton, Select } from "nexious-library";
import ViewComments from "./ViewComments";

interface VTask {
  task: Task;
  boardId: string;
}
const ViewTask = ({ task, boardId }: VTask) => {
  const { addCommentTask, replyToComment, assignMemberToTask, taskBoard } = useContext(TaskBoardContext);

  return (
    <div className="split-container">
      <div className="container">
        <TaskCard task={task} />
        <ViewComments
          comments={task.comments}
          reply={(values) => addCommentTask({ values, id: boardId, taskId: task.taskId })}
          onMessageReply={(messageId, reply) => replyToComment({ messageId, reply, taskId: task.taskId, id: boardId })}
        />
      </div>
      <div className="container">
        <div className="container">
          <h4 className="heading">Assigned to task:</h4>
          {task.assignedTo.length > 0 ? (
            task.assignedTo.map((u) => (
              <div className="flex-g" key={u.userId}>
                <IconButton
                  theme="btn-min required highlight"
                  icon={{ icon: "close" }}
                  onClick={() => assignMemberToTask({ id: boardId, taskId: task.taskId, userId: u.userId, status: "remove" })}
                />
                <AvatarCard user={u} />
              </div>
            ))
          ) : (
            <p>No assignees</p>
          )}
          <p>Assign members</p>
          {taskBoard.members.length >= 0 ? (
            <Select
              list={taskBoard.members
                .filter((m) => !task.assignedTo.some((u) => u.userId === m.userId))
                .map((m) => ({ uid: m.userId, value: m.userId, label: m.name }))}
              onChange={(userId: string) =>
                assignMemberToTask({ id: taskBoard.boardId, taskId: task.taskId, userId, status: "assign" })
              }
            />
          ) : (
            <p>No eligible members</p>
          )}
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
