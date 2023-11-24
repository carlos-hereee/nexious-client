import { useContext, useEffect } from "react";
import { AppContext } from "@context/app/AppContext";
import { Loading, PaginateForm } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
// import { formatHeaderValues } from "@app/utils/forms/formatHeaderValues";
// import { MenuProps } from "app-types";
import { scrollToId } from "@app/utils/app/scrollToElement";
import { useFormOrganizer } from "@app/utils/hooks/useFormOrganizer";
// import { formatPage } from "@app/utils/forms/formatPage";
import { formatLandingPage } from "@app/utils/forms/formatLandingPage";
import { formatNewsletter } from "@app/utils/forms/formatNewsletter";
import { formatMedia } from "@app/utils/forms/formatMedia";
// import PreviewPage from "./preview/PreviewPage";
import PreviewNewsletter from "./preview/PreviewNewsletter";
import PreviewSocials from "./preview/PreviewSocials";
// import PreviewCalendar from "./preview/PreviewCalendar";
import PreviewHeader from "./preview/PreviewHeader";
import PreviewLanding from "./preview/PreviewLanding";

const EditApp = () => {
  const { sectionEntries, newsletterForm, mediaEntryForm } = useContext(AdminContext);
  const { landingForm, socialMediaForm } = useContext(AdminContext);
  const { theme } = useContext(AuthContext);

  // initial data if any
  const { newsletter, media, landing, logo, isLoading, appName } = useContext(AppContext);
  const {
    active,
    formValues,
    isFormLoading,
    preview,
    previewInitApp,
    previewPage,
    previewLetter,
    organizeValues,
    setActive,
    setFormLoading,
    setAppValues,
  } = useFormOrganizer();
  const navigate = useNavigate();

  useEffect(() => {
    if (active) scrollToId(active);
  }, [active]);

  // console.log("landing :>> ", landing);
  useEffect(() => {
    if (!isLoading) {
      const LDO = landingForm.desiredOrder || [""];
      const NDO = newsletterForm.desiredOrder || [""];
      const SMO = socialMediaForm.desiredOrder || [""];
      // // const CFO = calendarForm.desiredOrder || [""];
      const mEntry = { hasMedias: mediaEntryForm };
      const lEntry = { values: landing, desiredOrder: LDO, hasEntry: sectionEntries };
      const lValues = formatLandingPage(lEntry);
      const NValues = formatNewsletter({ values: newsletter, desiredOrder: NDO });
      const mediaValues = formatMedia({ values: media, desiredOrder: SMO, hasEntry: mEntry });
      // const calValues = formatPage({ values: calendar, desiredOrder: CFO });
      const paginateForm = [
        { initialValues: { appName: appName || "", logo: logo.url || "" }, formId: "initApp" },
        { initialValues: lValues, formId: "landingPage" },
        { initialValues: NValues, formId: "newsletter" },
        { initialValues: mediaValues, formId: "medias" },
        // {
        //   initialValues: calValues,
        //   form: calendarForm,
        //   onSubmit: (e: FormValueProps) => editCalendar(e, appId),
        // },
        // {
        //   initialValues: { locale, language: languageList.map((l) => l.value).join(",") },
        //   form: languageForm,
        //   onSubmit: (e: FormValueProps) => editLanguage(e, appId),
        // },
      ];
      const appData = paginateForm.map((data) => organizeValues(data));
      if (appData) setAppValues(appData);
      setFormLoading(false);
    }
  }, [isLoading]);

  if (isFormLoading) return <Loading message="Loading app data" />;
  return (
    <div className="container">
      <h2 className="heading">Editing app: {appName}</h2>
      <PaginateForm
        paginate={formValues}
        theme={theme}
        onCancel={() => navigate("/")}
        onPageClick={() => setActive("")}
        previewPage={
          active === "initApp" ? (
            <PreviewHeader preview={previewInitApp} />
          ) : active === "newsletter" ? (
            <PreviewNewsletter preview={previewLetter} />
          ) : active === "medias" ? (
            <PreviewSocials data={preview} />
          ) : (
            active === "landingPage" && <PreviewLanding preview={previewPage} />
          )
        }
      />
    </div>
  );
};
export default EditApp;
