import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { Form } from "nexious-library";
import { useContext } from "react";

const AddPage = () => {
  const { pagesForm, addPage, sectionEntries } = useContext(AdminContext);
  const { iconList } = useContext(AppContext);

  return (
    <div className="flex-d-column">
      <h1>Add page content</h1>
      <Form
        initialValues={pagesForm.initialValues}
        labels={pagesForm.labels}
        placeholders={pagesForm.placeholders}
        types={pagesForm.types}
        addEntry={sectionEntries}
        dataList={{ icon: iconList }}
        clearSelection={{ icon: true }}
        submit={addPage}
        submitLabel="Save and continue"
        useMedia
        schema={{ required: ["title", "name"] }}
      />
    </div>
  );
};
export default AddPage;
