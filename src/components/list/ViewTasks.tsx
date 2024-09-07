import { TaskProps } from "app-context";

interface IViewTasks {
  tasks: TaskProps[];
}
const ViewTasks = ({ tasks }: IViewTasks) => {
  console.log("tasks :>> ", tasks);
  return <div className="primary-container">ViewTasks</div>;
};
export default ViewTasks;
