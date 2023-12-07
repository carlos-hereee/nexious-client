import { useContext, useState, useEffect } from "react";
import { Form, Loading } from "nexious-library";
import { useLocation } from "react-router-dom";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { PreviewValueProps } from "app-forms";
import { PageProps } from "app-context";
import { formatPage } from "@forms/formatPage";
// import { AuthContext } from "@context/auth/AuthContext";

const EditPage = () => {
  const { pagesForm, sectionEntries, editPage, isLoading } = useContext(AdminContext);
  const { iconList, appId, pages } = useContext(AppContext);
  // const { theme } = useContext(AuthContext);
  const [status, setStatus] = useState<"idle" | "pending" | "loading">("idle");
  const [initialValues, setValues] = useState<PageProps>();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) setStatus("loading");
    else setStatus("idle");
  }, [isLoading]);

  useEffect(() => {
    if (status === "idle") {
      const pageData = location.pathname.split("/");
      const pageName = pageData[pageData.length - 1];
      if (pages) {
        const activePage = pages.filter((p) => p.name === pageName)[0];
        console.log("activePage :>> ", activePage);
        const val = formatPage({
          values: activePage,
          hasEntry: sectionEntries,
          desiredOrder: pagesForm.desiredOrder || [""],
        });
        console.log("val :>> ", val);
        setValues(val);
      }
    }
  }, [status]);

  if (status === "pending") return <Loading message="sending request.." />;
  if (status === "loading") return <Loading message="loading app assets.." />;
  return (
    <div className="container">
      {initialValues && (
        <Form
          initialValues={initialValues}
          labels={pagesForm.labels}
          placeholders={pagesForm.placeholders}
          types={pagesForm.types}
          addEntry={sectionEntries}
          dataList={{ icon: iconList }}
          clearSelection={{ icon: true }}
          onSubmit={(values: PreviewValueProps) => editPage(values, appId)}
          submitLabel="Save and continue"
          withFileUpload
          schema={{ required: ["title", "name"] }}
        />
      )}
    </div>
  );
};
export default EditPage;
