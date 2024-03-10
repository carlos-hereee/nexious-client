import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { Loading, PaginateForm } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
// import { formatHeaderValues } from "@forms/formatHeaderValues";
// import { MenuProps } from "app-types";
import { scrollToId } from "@app/scrollToElement";
import { useFormOrganizer } from "@hooks/useFormOrganizer";
import { formatPage } from "@formatters/formatPage";
import { formatNewsletter } from "@formatters/formatNewsletter";
import { formatMedia } from "@formatters/formatMedia";
import { InitPaginateFormProps, AppValues } from "app-forms";
// import { formatCalendar } from "@forms/formatCalendar";
import { uniqueApplist } from "@formatters/uniqeList";
import PreviewNewsletter from "../preview/PreviewNewsletter";
import PreviewSocials from "../preview/PreviewSocials";
// import PreviewCalendar from "./preview/PreviewCalendar";
import PreviewAppName from "../preview/PreviewAppName";
import PreviewLanding from "../preview/PreviewLanding";

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
  const { theme, accessToken } = useContext(AuthContext);
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
            unique: [{ name: "appName", list: uniqueApplist(appList) }],
          },
          dataList: { theme: themeList },
          onSubmit: (e: any) => editAppName(e, appId),
          onViewPreview: (e: AppValues) => handlePreview("initApp", e),
          form: initAppForm,
          formId: "initApp",
        },
        {
          ...landingForm,
          onSubmit: (e: any) => editLandingPage(e, appId),
          dataList: { icon: iconList },
          initialValues: formatPage({
            values: landing,
            desiredOrder: landingForm.desiredOrder || [""],
            hasEntry: sectionEntries,
          }),
          onViewPreview: (e: AppValues) => handlePreview("landingPage", e),
          form: landingForm,
          addEntry: sectionEntries,
          clearSelection: { icon: true },
          formId: "landingPage",
        },
        {
          ...socialMediaForm,
          dataList: { media: mediaList },
          onViewPreview: (e: AppValues) => handlePreview("medias", e),
          onSubmit: (e: AppValues) => editSocialMedia(e, appId),
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
          onViewPreview: (e: AppValues) => handlePreview("newsletter", e),
          onSubmit: (e: AppValues) => editNewsletter(e, appId),
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
        //   onSubmit: (e: AppValues) => editCalendar(e, appId),
        //   onViewPreview: (e: AppValues) => handlePreview("calendar", e),
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
          onCancel={() => navigate(accessToken ? "/dashboard" : "/")}
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
