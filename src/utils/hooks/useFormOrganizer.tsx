import { useState } from "react";
import { InitAppProps, PreviewValueProps } from "app-forms";
// import { AppContext } from "@app/context/app/AppContext";
// import { AdminContext } from "@app/context/admin/AdminContext";
import { KeyStringProp, NewsletterProps } from "app-types";
import { PageProps } from "app-context";
// import { formatLandingPage } from "../forms/formatLandingPage";
// import { formatNewsletter } from "../forms/formatNewsletter";
// import { formatMedia } from "../forms/formatMedia";

export const useFormOrganizer = () => {
  // const {} = useContext(AdminContext);
  const [isFormLoading, setFormLoading] = useState<boolean>(true);
  // const [formValues, setAppValues] = useState<InitPaginateFormProps[]>([]);
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

  return {
    setActive,
    // organizeValues,
    isFormLoading,
    // formValues,
    active,
    preview,
    handlePreview,
    // setAppValues,
    setFormLoading,
    previewLetter,
    previewInitApp,
    previewPage,
  };
};
