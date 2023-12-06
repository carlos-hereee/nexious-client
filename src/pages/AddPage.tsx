import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { PreviewValueProps } from "app-forms";
import { Form } from "nexious-library";
import { useContext } from "react";

const AddPage = () => {
  const { pagesForm, addPage, sectionEntries } = useContext(AdminContext);
  const { iconList, appId } = useContext(AppContext);

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
        onSubmit={(values: PreviewValueProps) => addPage(values, appId)}
        submitLabel="Save and continue"
        withFileUpload
        schema={{ required: ["title", "name"] }}
      />
    </div>
  );
};
export default AddPage;
