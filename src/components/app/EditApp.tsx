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
import { formatInitApp } from "@app/utils/forms/formatInitApp";
import { formatPage } from "@app/utils/forms/formatPage";

const EditApp = () => {
  const { sectionEntries, newsletterForm, calendarForm, mediaEntryForm } = useContext(AdminContext);
  const { landingForm, initAppForm, socialMediaForm, languageForm } = useContext(AdminContext);
  const { editAppName, editLandingPage, editNewsletter } = useContext(AdminContext);
  const { editSocialMedia, editCalendar, editLanguage } = useContext(AdminContext);
  const { theme, setTheme } = useContext(AuthContext);
  // initial data if any
  const { newsletter, media, calendar, landing, logo, locale } = useContext(AppContext);
  const { appName, appId, themeList, languageList } = useContext(AppContext);
  // const { iconList } = useContext(AppContext);
  const {
    active,
    formValues,
    isFormLoading,
    preview,
    organizeValues,
    setActive,
    setFormLoading,
    setAppValues,
  } = useFormOrganizer();
  const navigate = useNavigate();
  useEffect(() => {
    if (active) scrollToId(active);
  }, [active]);
  console.log("calendar :>> ", calendar);
  useEffect(() => {
    if (appName) {
      const LDO = landingForm.desiredOrder || [""];
      const NDO = newsletterForm.desiredOrder || [""];
      const SMO = socialMediaForm.desiredOrder || [""];
      const CFO = calendarForm.desiredOrder || [""];
      const mEntry = { hasMedias: mediaEntryForm };
      const lValues = formatPage({ values: landing, desiredOrder: LDO, hasEntry: sectionEntries });
      const NValues = formatPage({ values: newsletter, desiredOrder: NDO });
      const mediaValues = formatPage({ values: media, desiredOrder: SMO, hasEntry: mEntry });
      const calValues = formatPage({ values: calendar, desiredOrder: CFO });
      const paginateForm = [
        {
          initialValues: formatInitApp(appName, logo.url || "", themeList),
          form: initAppForm,
          onSubmit: (e: FormValueProps) => editAppName(e, appId),
        },
        {
          initialValues: lValues,
          form: landingForm,
          addEntries: sectionEntries,
          onSubmit: (e: FormValueProps) => editLandingPage(e, appId),
        },
        {
          initialValues: NValues,
          form: newsletterForm,
          onSubmit: (e: FormValueProps) => editNewsletter(e, appId),
        },
        {
          initialValues: mediaValues,
          form: socialMediaForm,
          addEntries: { hasMedias: mediaEntryForm },
          onSubmit: (e: FormValueProps) => editSocialMedia(e, appId),
        },
        {
          initialValues: calValues,
          form: calendarForm,
          onSubmit: (e: FormValueProps) => editCalendar(e, appId),
        },
        {
          initialValues: { locale, language: languageList.map((l) => l.value).join(",") },
          form: languageForm,
          onSubmit: (e: FormValueProps) => editLanguage(e, appId),
        },
      ];
      const appData = paginateForm.map((data) => organizeValues(data));
      if (appData) setAppValues(appData);
      setFormLoading(false);
    }
  }, [appName]);
  // console.log("newsletter :>> ", newsletter);
  const logoData = { url: preview?.logo || "", title: preview.appName || "" };
  const menuData = preview.theme && formatHeaderValues({ theme: preview.theme });

  const handleMenu = (menuItem: MenuProps) => {
    const { active } = menuItem;
    if (active?.themeId) setTheme(active.name || theme);
  };

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
        // dataList={{
        //   icon: iconList,
        //   theme: themeList,
        //   language: languageList,
        //   locale: languageList,
        // }}
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
