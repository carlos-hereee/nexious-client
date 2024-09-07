import { createBoardTaskListForm } from "@data/forms.json";
import UpdateForm from "../UpdateForm";

interface BoardList {
  onSubmit: (values: { [x: string]: string }) => void;
}

const AddBoardListTask = ({ onSubmit }: BoardList) => {
  return (
    <UpdateForm
      initialValues={createBoardTaskListForm.initialValues}
      labels={createBoardTaskListForm.labels}
      placeholders={createBoardTaskListForm.placeholders}
      onSubmit={onSubmit}
    />
  );
};
export default AddBoardListTask;
