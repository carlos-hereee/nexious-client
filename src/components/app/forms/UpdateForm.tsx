import { Form } from "nexious-library";

interface Props {
  initialValues?: { [x: string]: string };
  labels?: { [x: string]: string };
  types?: { [x: string]: string };
  dataList?: { [x: string]: { [x: string]: string }[] };
  onSubmit: (data: { [x: string]: string }) => void;
}

const UpdateForm = ({ initialValues, onSubmit, labels, types, dataList }: Props) => {
  return (
    <div className="primary-container">
      <Form onSubmit={onSubmit} initialValues={initialValues} labels={labels} types={types} dataList={dataList} />
    </div>
  );
};
export default UpdateForm;
