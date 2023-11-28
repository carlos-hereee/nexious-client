import { useState } from "react";
import { InitAppProps, PreviewValueProps } from "app-forms";
import { KeyStringProp, MediaProps, NewsletterProps } from "app-types";
import { PageProps } from "app-context";

export const useFormOrganizer = () => {
  const [isFormLoading, setFormLoading] = useState<boolean>(true);
  const [active, setActive] = useState<string>("");
  const [preview, setPreview] = useState<KeyStringProp>();
  const [previewInitApp, setPreviewInitApp] = useState<InitAppProps>({ appName: "", logo: "" });
  const [previewLetter, setPreviewNewsletter] = useState<NewsletterProps>();
  const [previewPage, setPreviewPage] = useState<PageProps>();
  const [previewMedia, setPreviewMedia] = useState<MediaProps>();

  const handlePreview = (formId: string, values: PreviewValueProps) => {
    setActive(formId);
    if (formId === "initApp") setPreviewInitApp(values as InitAppProps);
    else if (formId === "newsletter") setPreviewNewsletter(values as NewsletterProps);
    else if (formId === "landingPage") setPreviewPage(values as PageProps);
    else if (formId === "medias") setPreviewMedia(values as MediaProps);
    else setPreview(values as KeyStringProp);
  };

  return {
    setActive,
    isFormLoading,
    active,
    preview,
    handlePreview,
    setFormLoading,
    previewLetter,
    previewInitApp,
    previewPage,
    previewMedia,
  };
};
