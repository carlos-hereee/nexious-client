import { AdminContext } from "@app/context/admin/AdminContext";
import { Form } from "nexious-library";
import { useContext } from "react";

const AddPage = () => {
  const { pagesForm, addPage } = useContext(AdminContext);

  return (
    <div className="flex-d-column">
      <h1>Add page content</h1>
      <Form
        initialValues={pagesForm.initialValues}
        labels={pagesForm.labels}
        placeholders={pagesForm.placeholders}
        types={pagesForm.types}
        submit={addPage}
        submitLabel="Save and continue"
        useMedia
        schema={{ required: ["title", "name"] }}
      />
    </div>
  );
};
export default AddPage;
