import { Form } from "nexious-library";

interface Props {
  initialValues?: { [x: string]: string };
  labels?: { [x: string]: string };
  types?: { [x: string]: string };
  placeholders?: { [x: string]: string };
  dataList?: { [x: string]: { [x: string]: string }[] };
  onSubmit: (data: { [x: string]: string }) => void;
  submitLabel?: string;
}

const UpdateForm = ({ placeholders, initialValues, onSubmit, labels, types, dataList, submitLabel }: Props) => {
  return (
    <div className="primary-container">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        labels={labels}
        types={types}
        dataList={dataList}
        placeholders={placeholders}
        submitLabel={submitLabel}
      />
    </div>
  );
};
export default UpdateForm;
