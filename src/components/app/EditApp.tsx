import { useContext, useEffect, useState } from "react";
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
import { InitPaginateFormProps, PreviewValueProps } from "app-forms";
// import { formatCalendar } from "@app/utils/forms/formatCalendar";
import PreviewNewsletter from "./preview/PreviewNewsletter";
import PreviewSocials from "./preview/PreviewSocials";
// import PreviewCalendar from "./preview/PreviewCalendar";
import PreviewAppName from "./preview/PreviewAppName";
import PreviewLanding from "./preview/PreviewLanding";

const EditApp = () => {
  const {
    editSocialMedia,
    editAppName,
    editLandingPage,
    editNewsletter,
    // editCalendar,
    landingForm,
    mediaList,
    initAppForm,
    sectionEntries,
    mediaEntryForm,
    socialMediaForm,
    newsletterForm,
    // calendarForm,
  } = useContext(AdminContext);
  const { theme } = useContext(AuthContext);
  const [formValues, setAppValues] = useState<InitPaginateFormProps[]>([]);
  // initial data if any
  const {
    newsletter,
    media,
    landing,
    logo,
    isLoading,
    appName,
    appList,
    themeList,
    iconList,
    appId,
    // calendar,
  } = useContext(AppContext);
  useContext(AppContext);
  const {
    active,
    isFormLoading,
    previewMedia,
    previewInitApp,
    previewPage,
    previewLetter,
    setActive,
    handlePreview,
    setFormLoading,
  } = useFormOrganizer();
  const navigate = useNavigate();

  // console.log("calendar :>> ", calendar);
  useEffect(() => {
    if (active) scrollToId(active);
  }, [active]);

  // console.log("media :>> ", media);
  useEffect(() => {
    if (!isLoading) {
      setFormLoading(true);
      setAppValues([]);
      setAppValues([
        {
          ...initAppForm,
          initialValues: { appName: appName || "", logo },
          schema: {
            required: ["appName", "logo"],
            unique: [
              {
                name: "appName",
                list: appList
                  ? appList.filter((app) => app.appName && app.appName !== appName)
                  : [],
              },
            ],
          },
          dataList: { theme: themeList },
          onSubmit: (e: any) => editAppName(e, appId),
          onViewPreview: (e: PreviewValueProps) => handlePreview("initApp", e),
          form: initAppForm,
          formId: "initApp",
        },
        {
          ...landingForm,
          onSubmit: (e: any) => editLandingPage(e, appId),
          dataList: { icon: iconList },
          initialValues: formatLandingPage({
            values: landing,
            desiredOrder: landingForm.desiredOrder || [""],
            hasEntry: sectionEntries,
          }),
          onViewPreview: (e: PreviewValueProps) => handlePreview("landingPage", e),
          form: landingForm,
          addEntry: sectionEntries,
          clearSelection: { icon: true },
          formId: "landingPage",
        },
        // languages: {
        //   schema: {},
        //   onViewPreview: (e: PreviewValueProps) => handlePreview("languages", e),
        //   dataList: { language: languageList, locale: languageList },
        // },
        {
          ...socialMediaForm,
          dataList: { media: mediaList },
          onViewPreview: (e: PreviewValueProps) => handlePreview("medias", e),
          onSubmit: (e: PreviewValueProps) => editSocialMedia(e, appId),
          addEntry: { hasMedias: mediaEntryForm },
          form: socialMediaForm,
          formId: "medias",
          initialValues: formatMedia({
            values: media,
            desiredOrder: socialMediaForm.desiredOrder || [],
            hasEntry: { hasMedias: mediaEntryForm },
          }),
        },
        {
          ...newsletterForm,
          onViewPreview: (e: PreviewValueProps) => handlePreview("newsletter", e),
          onSubmit: (e: PreviewValueProps) => editNewsletter(e, appId),
          form: newsletterForm,
          formId: "newsletter",
          initialValues: formatNewsletter({
            values: newsletter,
            desiredOrder: newsletterForm.desiredOrder || [""],
          }),
        },
        // {
        //   ...calendarForm,
        //   // dataList: { theme: calendarThemeList },
        //   initialValues: formatCalendar({ calendar, form: calendarForm }),
        //   form: calendarForm,
        //   onSubmit: (e: PreviewValueProps) => editCalendar(e, appId),
        //   onViewPreview: (e: PreviewValueProps) => handlePreview("calendar", e),
        //   formId: "calendar",
        // },
      ]);
      setFormLoading(false);
    } else setFormLoading(true);
  }, [isLoading]);
  // console.log("isLoading :>> ", isLoading);

  if (isFormLoading) return <Loading message="Loading app data" />;
  // console.log("formValues :>> ", formValues[2].initialValues);
  return (
    <div className="container">
      <h2 className="heading">Editing app: {appName}</h2>
      {formValues && (
        <PaginateForm
          paginate={formValues}
          theme={theme}
          page={1}
          onCancel={() => navigate("/")}
          onPageClick={() => setActive("")}
          onDialogClose={() => setActive("")}
          previewPage={
            active === "initApp" ? (
              <PreviewAppName preview={previewInitApp} />
            ) : active === "newsletter" ? (
              <PreviewNewsletter preview={previewLetter} />
            ) : active === "medias" ? (
              <PreviewSocials preview={previewMedia} />
            ) : (
              active === "landingPage" && <PreviewLanding preview={previewPage} />
            )
          }
        />
      )}
    </div>
  );
};
export default EditApp;
