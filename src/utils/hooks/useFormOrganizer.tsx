import { useContext, useState } from "react";
import { InitAppProps, InitPaginateFormProps, InitValueProps, PreviewValueProps } from "app-forms";
import { AppContext } from "@app/context/app/AppContext";
import { AdminContext } from "@app/context/admin/AdminContext";
import { KeyStringProp, NewsletterProps, OrganizeFormProps } from "app-types";
import { PageProps } from "app-context";

export const useFormOrganizer = () => {
  const { appList, themeList, appName, iconList } = useContext(AppContext);
  // const { calendarThemeList, languageList } = useContext(AdminContext);
  const { mediaList } = useContext(AdminContext);
  const [isFormLoading, setFormLoading] = useState<boolean>(true);
  const [formValues, setAppValues] = useState<InitPaginateFormProps[]>([]);
  const [active, setActive] = useState<string>("");
  const [preview, setPreview] = useState<KeyStringProp>();
  const [previewInitApp, setPreviewInitApp] = useState<InitAppProps>({ appName: "", logo: "" });
  const [previewLetter, setPreviewNewsletter] = useState<NewsletterProps>();
  const [previewPage, setPreviewPage] = useState<PageProps>();
  // const [previewNewsletter, setPreviewNewsletter] = useState<NewsletterProps>();

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
      onViewPreview: (e: PreviewValueProps) => handlePreview("initApp", e),
    },
    landingPage: {
      schema: { required: ["title"] },
      dataList: { icon: iconList },
      onViewPreview: (e: PreviewValueProps) => handlePreview("landingPage", e),
    },
    // languages: {
    //   schema: {},
    //   onViewPreview: (e: PreviewValueProps) => handlePreview("languages", e),
    //   dataList: { language: languageList, locale: languageList },
    // },
    medias: {
      dataList: { media: mediaList },
      onViewPreview: (e: PreviewValueProps) => handlePreview("medias", e),
    },
    newsletter: {
      onViewPreview: (e: PreviewValueProps) => handlePreview("newsletter", e),
    },
    // calendar: {
    //   schema: {},
    //   dataList: { theme: calendarThemeList },
    //   onViewPreview: (e: PreviewValueProps) => handlePreview("calendar", e),
    // },
  };

  const organizeValues = (props: InitValueProps) => {
    const { form, onSubmit, initialValues, addEntries } = props;
    const { formId } = props.form;
    const { schema, dataList, onViewPreview } = integrateData[formId];
    const payload = { ...form, formId, initialValues, schema, dataList, addEntry: addEntries };
    return { ...payload, form, onViewPreview, onSubmit };
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
