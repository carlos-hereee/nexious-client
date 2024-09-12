import { Loading } from "nexious-library";
import { createTaskBoardForm } from "@data/forms.json";
import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import UpdateForm from "../UpdateForm";

const EditTaskBoard = () => {
  const { editTaskBoard, appId, taskBoard } = useContext(AppContext);

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
