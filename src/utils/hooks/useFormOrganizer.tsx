import { useContext, useState } from "react";
import { InitAppProps, InitPaginateFormProps, InitValueProps, PreviewValueProps } from "app-forms";
import { AppContext } from "@app/context/app/AppContext";
import { AdminContext } from "@app/context/admin/AdminContext";
import { KeyStringProp, NewsletterProps, OrganizeFormProps } from "app-types";
import { PageProps } from "app-context";

export const useFormOrganizer = () => {
  const { appList, themeList, appName, iconList, appId } = useContext(AppContext);
  const {
    editSocialMedia,
    editAppName,
    // editLandingPage,
    editNewsletter,
    landingForm,
    mediaList,
    initAppForm,
    sectionEntries,
    mediaEntryForm,
    socialMediaForm,
    newsletterForm,
  } = useContext(AdminContext);
  const [isFormLoading, setFormLoading] = useState<boolean>(true);
  const [formValues, setAppValues] = useState<InitPaginateFormProps[]>([]);
  const [active, setActive] = useState<string>("");
  const [preview, setPreview] = useState<KeyStringProp>();
  const [previewInitApp, setPreviewInitApp] = useState<InitAppProps>({ appName: "", logo: "" });
  const [previewLetter, setPreviewNewsletter] = useState<NewsletterProps>();
  const [previewPage, setPreviewPage] = useState<PageProps>();

  const handlePreview = (formId: string, values: PreviewValueProps) => {
    setActive(formId);
    setPreview(undefined);
    if (formId === "initApp") setPreviewInitApp(values as InitAppProps);
    else if (formId === "newsletter") setPreviewNewsletter(values as NewsletterProps);
    else if (formId === "landingPage") setPreviewPage(values as PageProps);
    else setPreview(values as KeyStringProp);
  };

  const integrateData: OrganizeFormProps = {
    initApp: {
      schema: {
        required: ["appName", "logo"],
        unique: [
          {
            name: "appName",
            list: appList ? appList.filter((app) => app.appName && app.appName !== appName) : [],
          },
        ],
      },
      dataList: { theme: themeList },
      onSubmit: (e: PreviewValueProps) => editAppName(e, appId),
      onViewPreview: (e: PreviewValueProps) => handlePreview("initApp", e),
      form: initAppForm,
    },
    landingPage: {
      onSubmit: (e: PreviewValueProps) => console.log(e, appId),
      // onSubmit: (e: PreviewValueProps) => editLandingPage(e, appId),
      dataList: { icon: iconList },
      onViewPreview: (e: PreviewValueProps) => handlePreview("landingPage", e),
      form: landingForm,
      addEntries: sectionEntries,
    },
    // languages: {
    //   schema: {},
    //   onViewPreview: (e: PreviewValueProps) => handlePreview("languages", e),
    //   dataList: { language: languageList, locale: languageList },
    // },
    medias: {
      dataList: { media: mediaList },
      onViewPreview: (e: PreviewValueProps) => handlePreview("medias", e),
      onSubmit: (e: PreviewValueProps) => editSocialMedia(e, appId),
      addEntries: { hasMedias: mediaEntryForm },
      form: socialMediaForm,
    },
    newsletter: {
      onViewPreview: (e: PreviewValueProps) => handlePreview("newsletter", e),
      onSubmit: (e: PreviewValueProps) => editNewsletter(e, appId),
      form: newsletterForm,
    },
    // calendar: {
    //   schema: {},
    //   dataList: { theme: calendarThemeList },
    //   onViewPreview: (e: PreviewValueProps) => handlePreview("calendar", e),
    // },
  };

  const organizeValues = (props: InitValueProps) => {
    const { initialValues, formId } = props;
    const { schema, dataList, onViewPreview, onSubmit, addEntries, form } = integrateData[formId];
    return {
      ...form,
      formId,
      initialValues,
      schema,
      dataList,
      addEntry: addEntries,
      form,
      onViewPreview,
      onSubmit,
    };
  };
  return {
    setActive,
    organizeValues,
    isFormLoading,
    formValues,
    active,
    preview,
    handlePreview,
    setAppValues,
    setFormLoading,
    previewLetter,
    previewInitApp,
    previewPage,
  };
};
