import { Form } from "nexious-library";

interface Props {
  name: string;
  onConfirm: () => void;
  onReturn?: () => void;
}

const ConfirmRemovals = ({ name, onConfirm, onReturn }: Props) => {
  const handleConfirm = (data: { confirm: string }) => {
    // redundant delete
    if (data.confirm === "CONFIRM") onConfirm();
  };
  return (
    <>
      <h2 className="heading">Are you sure you want to delete {name}</h2>
      <p className="text-center">This will delete all progress</p>
      <Form
        initialValues={{ confirm: "" }}
        labels={{ confirm: "Type CONFIRM to delete" }}
        schema={{ required: ["confirm"], match: [{ name: "confirm", value: "CONFIRM" }] }}
        onSubmit={(data: { confirm: string }) => handleConfirm(data)}
        onCancel={() => onReturn && onReturn()}
      />
    </>
  );
};
export default ConfirmRemovals;
