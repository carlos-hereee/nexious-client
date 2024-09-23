import { Loading } from "nexious-library";
import { createTaskBoardForm } from "@data/forms.json";
import { Boards } from "task-board-context";
import UpdateForm from "../UpdateForm";

interface B {
  taskBoard: Boards;
  onSubmit: (values: { [x: string]: string }) => void;
}
const EditTaskBoard = ({ taskBoard, onSubmit }: B) => {
  if (!taskBoard) return <Loading />;
  const initialValues = { name: taskBoard.name || "", description: taskBoard.description || "" };
  return (
    <UpdateForm
      initialValues={initialValues}
      labels={createTaskBoardForm.labels}
      placeholders={createTaskBoardForm.labels}
      onSubmit={onSubmit}
    />
  );
};
export default EditTaskBoard;
