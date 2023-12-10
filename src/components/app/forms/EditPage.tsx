import { useContext, useState, useEffect } from "react";
import { Form, Loading } from "nexious-library";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { PreviewValueProps } from "app-forms";
import { PageProps } from "app-context";
import { formatPage } from "@forms/formatPage";

const EditPage = () => {
  const { pagesForm, sectionEntries, editPage, isLoading } = useContext(AdminContext);
  const { iconList, appId, pages } = useContext(AppContext);
  const [status, setStatus] = useState<"idle" | "pending" | "loading">("idle");
  const [initialValues, setValues] = useState<PageProps>();
  const location = useLocation();
  const navigate = useNavigate();

  const pageData = location.pathname.split("/");
  const pageName = pageData[pageData.length - 1];
  const activePage = pages ? pages.filter((p) => p.name === pageName)[0] : null;

  useEffect(() => {
    if (isLoading) setStatus("loading");
    else setStatus("idle");
  }, [isLoading]);

  useEffect(() => {
    if (status === "idle") {
      if (activePage) {
        const val = formatPage({
          values: activePage,
          hasEntry: sectionEntries,
          desiredOrder: pagesForm.desiredOrder,
        });
        setValues(val);
      }
    }
  }, [status]);

  // console.log("activePage :>> ", activePage);
  // console.log("initialValues :>> ", initialValues);

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
          onCancel={() => navigate("/dashboard")}
          heading="Edit page"
          onSubmit={(values: PreviewValueProps) => editPage(values, appId, activePage?.pageId)}
          submitLabel="Save and continue"
          withFileUpload
          schema={{ required: ["title", "name"] }}
        />
      )}
    </div>
  );
};
export default EditPage;
