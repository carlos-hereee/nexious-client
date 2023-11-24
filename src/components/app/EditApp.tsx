import { useContext, useEffect } from "react";
import { AppContext } from "@context/app/AppContext";
import { Loading, PaginateForm } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { PreviewValueProps } from "app-forms";
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
import Newsletter from "./Newsletter";
import PreviewSocials from "./preview/PreviewSocials";
// import PreviewCalendar from "./preview/PreviewCalendar";
import PreviewHeader from "./preview/PreviewHeader";
import PreviewLanding from "./preview/PreviewLanding";

const EditApp = () => {
  const { sectionEntries, newsletterForm, mediaEntryForm } = useContext(AdminContext);
  const {
    landingForm,
    initAppForm,
    socialMediaForm,
    editAppName,
    editLandingPage,
    editNewsletter,
    editSocialMedia,
    //  languageForm, calendarForm
  } = useContext(AdminContext);
  // const { editSocialMedia } =
  //   useContext(AdminContext);
  // const {  editCalendar, editLanguage } = useContext(AdminContext);
  const {
    theme,
    // setTheme
  } = useContext(AuthContext);

  // initial data if any
  const { newsletter, media, landing, logo, isLoading, appName, appId } = useContext(AppContext);
  const {
    active,
    formValues,
    isFormLoading,
    preview,
    previewInitApp,
    previewPage,
    organizeValues,
    setActive,
    setFormLoading,
    setAppValues,
  } = useFormOrganizer();
  const navigate = useNavigate();

  useEffect(() => {
    if (active) scrollToId(active);
  }, [active]);

  // console.log("calendar :>> ", calendar);
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
        {
          initialValues: { appName: appName || "", logo: logo.url || "" },
          form: initAppForm,
          onSubmit: (e: PreviewValueProps) => editAppName(e, appId),
        },
        {
          initialValues: lValues,
          form: landingForm,
          addEntries: sectionEntries,
          onSubmit: (e: PreviewValueProps) => editLandingPage(e, appId),
        },
        {
          initialValues: NValues,
          form: newsletterForm,
          onSubmit: (e: PreviewValueProps) => editNewsletter(e, appId),
        },
        {
          initialValues: mediaValues,
          form: socialMediaForm,
          addEntries: { hasMedias: mediaEntryForm },
          onSubmit: (e: PreviewValueProps) => editSocialMedia(e, appId),
        },
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

  // console.log("newsletter :>> ", newsletter);
  // const logoData = { url: preview?.logo || "", title: preview?.appName || "" };
  // const menuData = preview.theme && formatHeaderValues({ theme: preview.theme });

  // const handleMenu = (menuItem: MenuProps) => {
  //   const { active } = menuItem;
  //   if (active?.themeId) setTheme(active.name || theme);
  // };

  // console.log("values :>> ", formValues);
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
            <Newsletter data={preview} />
          ) : active === "medias" ? (
            <PreviewSocials data={preview} />
          ) : (
            // ) : active === "calendar" ? (
            //   <PreviewCalendar events={preview} />
            active === "landingPage" && <PreviewLanding preview={previewPage} />
          )
        }
      />
    </div>
  );
};
export default EditApp;
