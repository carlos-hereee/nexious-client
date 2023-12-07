import { useContext } from "react";
import { Form } from "nexious-library";
import { useLocation } from "react-router-dom";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { PreviewValueProps } from "app-forms";
// import { AuthContext } from "@context/auth/AuthContext";

const EditPage = () => {
  const { pagesForm, sectionEntries, editPage } = useContext(AdminContext);
  const { iconList, appId } = useContext(AppContext);
  // const { theme } = useContext(AuthContext);

  // const navigate = useNavigate();
  const location = useLocation();

  // const pageName = location.search
  console.log("location :>> ", location);

  // useEffect(() => {
  //   if (ownedApps.length > 0) {
  //     if (!formErrors.initAppFormError)
  //   }
  // }, [ownedApps]);
  // useNavigate()
  // console.log("formErrors :>> ", formErrors);

  // console.log("appList :>> ", appList);
  return (
    <div className="container">
      <Form
        initialValues={pagesForm.initialValues}
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
    </div>
  );
};
export default EditPage;
