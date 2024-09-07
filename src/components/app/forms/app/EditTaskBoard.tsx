import { Boards } from "app-types";
import { Loading } from "nexious-library";
import { createTaskBoardForm } from "@data/forms.json";
import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import UpdateForm from "../UpdateForm";

interface BoardParam {
  taskBoard?: Boards;
}
const EditTaskBoard = ({ taskBoard }: BoardParam) => {
  const { editTaskBoard, appId } = useContext(AppContext);
  if (!taskBoard) return <Loading />;
  const initialValues = { name: taskBoard.name || "", description: taskBoard.description || "" };
  return (
    <UpdateForm
      initialValues={initialValues}
      labels={createTaskBoardForm.labels}
      placeholders={createTaskBoardForm.labels}
      onSubmit={(values) => editTaskBoard({ appId, values, id: taskBoard.boardId })}
    />
  );
};
export default EditTaskBoard;
