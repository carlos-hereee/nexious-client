import { Form } from "nexious-library";

interface Props {
  name: string;
  onConfirm: () => void;
}

const ConfirmRemovals = ({ name, onConfirm }: Props) => {
  const handleConfirm = (data: { confirm: string }) => {
    // redundant delete
    if (data.confirm === "CONFIRM") onConfirm();
  };
  return (
    <div className="primary-container">
      <h2 className="heading text-center">Are you sure you want to delete {name}</h2>
      <p className="text-center">This will delete all progress</p>
      <Form
        initialValues={{ confirm: "" }}
        labels={{ confirm: "Type CONFIRM to delete" }}
        schema={{ required: ["confirm"], match: [{ name: "confirm", value: "CONFIRM" }] }}
        submitLabel="Submit"
        onSubmit={(data: { confirm: string }) => handleConfirm(data)}
      />
    </div>
  );
};
export default ConfirmRemovals;
