import { useContext, useEffect } from "react";
import { AppContext } from "@context/app/AppContext";
import { Header, Loading, PaginateForm } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { FormValueProps } from "app-forms";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { formatHeaderValues } from "@app/utils/forms/formatHeaderValues";
import { MenuProps } from "app-types";
import { scrollToId } from "@app/utils/app/scrollToElement";
import PreviewPage from "./PreviewPage";
import { useFormOrganizer } from "@app/utils/hooks/useFormOrganizer";

const EditApp = () => {
  const { appName, appId } = useContext(AppContext);
  const { sectionEntryOrganizer, newsletterForm, calendarForm } = useContext(AdminContext);
  const { landingForm, initAppForm, socialMediaForm, languageForm } = useContext(AdminContext);
  const { editAppName, editLandingPage, editNewsletter } = useContext(AdminContext);
  const { editSocialMedia, editCalendar, editLanguage } = useContext(AdminContext);
  const { theme, setTheme } = useContext(AuthContext);
  // initial data if any
  // const { languageList, newsletter, media, calendar, appList } = useContext(AppContext);
  // const { landing, appId, logo, themeList, locale } = useContext(AppContext);
  const { active, values, isFormLoading, preview, organizeValues, setActive } =
    useFormOrganizer();
  const navigate = useNavigate();

  useEffect(() => {
    if (active) scrollToId(active);
  }, [active]);
  useEffect(() => {
    if (appName) {
      organizeValues({ form: initAppForm, onSubmit: handleInitSubmit });
    }
  }, [appName]);

  const handleInitSubmit = (e: FormValueProps) => editAppName(e, appId);
  // const handleViewPreview = (e: FormValueProps) => handlePreview()

  // useEffect(() => {
  //   // const landingValues = organizeValues({
  //   //   values: landing,
  //   //   desiredOrder: landingForm.desiredOrder || [],
  //   //   hasEntry: sectionEntryOrganizer,
  //   // });
  //   // const newsletterValues = organizeValues({
  //   //   values: newsletter,
  //   //   desiredOrder: newsletterForm.desiredOrder || [],
  //   // });
  //   // const mediaValues = organizeValues({
  //   //   values: media,
  //   //   desiredOrder: socialMediaForm.desiredOrder || [],
  //   // });
  //   // const calendarValues = organizeValues({
  //   //   values: calendar,
  //   //   desiredOrder: calendarForm.desiredOrder || [],
  //   // });

  //   // integrateFormValues([
  //   //   {
  //   //     values: {
  //   //       appName,
  //   //       logo: logo.url || "",
  //   //       theme: themeList.map((t) => t.value).join(","),
  //   //     },
  //   //     form: initAppForm,
  //   //     formId: "initApp",
  //   //     onSubmit: (e: FormValueProps) => editAppName(e, appId),
  //   //     onViewPreview: (e: FormValueProps) => handlePreview("initApp", e),
  //   //     previewLabel: "See changes",
  //   //     withFileUpload: true,
  //   //     dataList: { theme: themeList },
  //   //     schema: {
  //   //       required: ["appName", "logo", "locale"],
  //   //       unique: [
  //   //         {
  //   //           name: "appName",
  //   //           list: appList?.map((app) => app.appName && app.appName !== appName) || [],
  //   //         },
  //   //       ],
  //   //     },
  //   //   },
  //   //   // {
  //   //   //   values: landingValues,
  //   //   //   form: landingForm,
  //   //   //   formId: "landingPage",
  //   //   //   addEntries: sectionEntryOrganizer,
  //   //   //   withFileUpload: true,
  //   //   //   onSubmit: (e: FormValueProps) => editLandingPage(e, appId),
  //   //   //   onViewPreview: (e: FormValueProps) => handlePreview("landingPage", e),
  //   //   //   previewLabel: "See changes",
  //   //   //   schema: { required: ["title", "tagline"] },
  //   //   // },
  //   //   // {
  //   //   //   values: newsletterValues,
  //   //   //   form: newsletterForm,
  //   //   //   formId: "newsletter",
  //   //   //   onSubmit: (e: FormValueProps) => editNewsletter(e, appId),
  //   //   // },
  //   //   // {
  //   //   //   values: mediaValues,
  //   //   //   form: socialMediaForm,
  //   //   //   formId: "medias",
  //   //   //   // addEntries: sectionEntryOrganizer,
  //   //   //   onSubmit: (e: FormValueProps) => editSocialMedia(e, appId),
  //   //   // },
  //   //   // {
  //   //   //   values: calendarValues,
  //   //   //   form: calendarForm,
  //   //   //   formId: "Calendar",
  //   //   //   // addEntries: sectionEntryOrganizer,
  //   //   //   onSubmit: (e: FormValueProps) => editCalendar(e, appId),
  //   //   // },
  //   //   // // add languages in a different page
  //   //   // {
  //   //   //   values: { locale, language: languageList.map((l) => l.value).join(",") },
  //   //   //   form: languageForm,
  //   //   //   formId: "languages",
  //   //   //   onSubmit: (e: FormValueProps) => editLanguage(e, appId),
  //   //   // },
  //   // ]);
  //   // setFormLoading(false);
  // }, []);

  const logoData = { url: preview?.logo || "", title: preview.appName || "" };
  const menuData = preview.theme && formatHeaderValues({ theme: preview.theme });

  const handleMenu = (menuItem: MenuProps) => {
    const { active } = menuItem;
    if (active?.themeId) setTheme(active.name || theme);
  };

  console.log("values :>> ", values);
  if (isFormLoading) return <Loading message="Loading app data" />;
  return (
    <div className="container">
      <h2 className="heading">Editing app: {appName}</h2>
      <PaginateForm
        paginate={values}
        theme={theme}
        onCancel={() => navigate("/")}
        onPageClick={() => setActive("")}
        previewPage={
          active === "initApp" ? (
            <Header logo={logoData} menu={menuData} theme={theme} updateMenu={handleMenu} />
          ) : (
            active === "landingPage" && <PreviewPage preview={preview} theme="landing-page" />
          )
        }
      />
    </div>
  );
};
export default EditApp;
