import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { createTaskBoardForm } from "@data/forms.json";
import UpdateForm from "../UpdateForm";

const CreateTaskBoard = () => {
  const { createTaskBoard, appId } = useContext(AppContext);
  return (
    <UpdateForm
      initialValues={createTaskBoardForm.initialValues}
      labels={createTaskBoardForm.labels}
      placeholders={createTaskBoardForm.labels}
      onSubmit={(values) => createTaskBoard({ values, appId })}
    />
  );
};
export default CreateTaskBoard;
