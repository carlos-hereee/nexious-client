import { Form } from "nexious-library";

interface Props {
  initialValues?: { [x: string]: string };
  onSubmit: (data: { [x: string]: string }) => void;
}

const UpdateHero = ({ initialValues, onSubmit }: Props) => {
  return (
    <div className="primary-container">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        labels={{ hero: "Choose Image" }}
        withFileUpload
        types={{ hero: "file" }}
      />
    </div>
  );
};
export default UpdateHero;
