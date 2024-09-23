// import { useContext } from "react";
// import { AppContext } from "@context/app/AppContext";
import { createTaskBoardForm } from "@data/forms.json";
import UpdateForm from "../UpdateForm";

interface P {
  onSubmit: (values: { [key: string]: string }) => void;
}
const CreateTaskBoard = ({ onSubmit }: P) => {
  // const { createTaskBoard, appId } = useContext(AppContext);
  return (
    <UpdateForm
      initialValues={createTaskBoardForm.initialValues}
      labels={createTaskBoardForm.labels}
      placeholders={createTaskBoardForm.labels}
      onSubmit={onSubmit}
    />
  );
};
export default CreateTaskBoard;
