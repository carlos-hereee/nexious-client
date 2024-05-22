import { useContext } from "react";
import { Form } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { PageProps } from "app-types";
import { formatInitialValues } from "@formatters/formatInitialFormValues";
// import { formatPage } from "@formatters/formatPage";

const EditPage = () => {
  const { pagesForm, sectionEntries, editPage } = useContext(AdminContext);
  const { iconList, appId, activePage } = useContext(AppContext);
  // const [status, setStatus] = useState<"idle" | "pending" | "loading">("pending");
  // require key variable
  // const [initialValues, setValues] = useState<PageProps>();

  const initialValues = formatInitialValues({ desiredOrder: pagesForm.desiredOrder, page: activePage });
  // useEffect(() => {
  //   if (status === "pending") {
  //     setValues(data);
  //     setStatus("idle");
  //   }
  // }, [status]);

  console.log("initialValues :>> ", initialValues);

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
          onSubmit={(values: PageProps) => editPage({ values, appId, pageId: activePage.pageId || "" })}
          submitLabel="Save and continue"
          withFileUpload
          schema={{ required: ["title", "name"] }}
        />
      )}
    </div>
  );
};
export default EditPage;
