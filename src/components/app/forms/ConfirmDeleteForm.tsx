import { Form } from "nexious-library";

const ConfirmDeleteForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const handleConfirm = (data: { confirm: string }) => {
    // redundant delete
    if (data.confirm === "CONFIRM") onSubmit();
  };

  return (
    <div className="container text-center">
      <h2 className="heading w-max text-center">Are you sure you want to continue?</h2>
      <p className="w-max">This will delete all progress</p>
      {/* {error && <p className="required w-max">{error}</p>} */}
      <Form
        theme="form-center"
        initialValues={{ confirm: "" }}
        labels={{ confirm: "Type CONFIRM to delete" }}
        schema={{ required: ["confirm"], match: [{ name: "confirm", value: "CONFIRM" }] }}
        onSubmit={(data: { confirm: string }) => handleConfirm(data)}
      />
    </div>
  );
};

export default ConfirmDeleteForm;
