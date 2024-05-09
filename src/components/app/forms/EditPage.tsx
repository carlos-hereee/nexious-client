import { useContext, useEffect, useState } from "react";
import { Form } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { PageProps } from "app-types";
import { formatPage } from "@formatters/formatPage";

const EditPage = () => {
  const { pagesForm, sectionEntries, editPage } = useContext(AdminContext);
  const { iconList, appId, page } = useContext(AppContext);
  const [status, setStatus] = useState<"idle" | "pending" | "loading">("pending");
  // require key variable
  const [initialValues, setValues] = useState<PageProps>();

  useEffect(() => {
    if (status === "pending") {
      const data = formatPage({ desiredOrder: pagesForm.desiredOrder, hasEntry: sectionEntries, values: page });
      setValues(data);
      setStatus("idle");
    }
  }, [status]);

  return (
    <div className="primary-container">
      {initialValues && (
        <Form
          initialValues={initialValues}
          labels={pagesForm.labels}
          placeholders={pagesForm.placeholders}
          types={pagesForm.types}
          addEntry={sectionEntries}
          dataList={{ icon: iconList }}
          clearSelection={{ icon: true }}
          heading="Edit page"
          onSubmit={(values: PageProps) => editPage({ values, appId, pageId: page.pageId || "" })}
          submitLabel="Save and continue"
          withFileUpload
          schema={{ required: ["title", "name"] }}
        />
      )}
    </div>
  );
};
export default EditPage;
