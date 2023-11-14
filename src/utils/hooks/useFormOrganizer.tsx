import { useContext, useState } from "react";
// import { includeEntries } from "../forms/includeEntries";
import { FormValueProps, InitValueProps } from "app-forms";
import { AppContext } from "@app/context/app/AppContext";
import { formatInitAppSchema } from "../forms/formatInitAppSchema";

export const useFormOrganizer = () => {
  const { appList, themeList, appName, languageList, iconList } = useContext(AppContext);
  const [isFormLoading, setFormLoading] = useState<boolean>(true);
  const [formValues, setAppValues] = useState<FormValueProps[]>([]);
  const [active, setActive] = useState<string>("");
  const [preview, setPreview] = useState<FormValueProps>({});

  const handlePreview = (formId: string, formValues: FormValueProps) => {
    setActive("");
    setPreview({});
    setActive(formId);
    setPreview(formValues);
  };

  const integrateData: { [key: string]: any | undefined } = {
    initApp: {
      schema: formatInitAppSchema({ formId: "initApp", appList, target: appName }),
      dataList: { theme: themeList },
      onViewPreview: (e: FormValueProps) => handlePreview("initApp", e),
    },
    landingPage: {
      schema: { required: ["title"] },
      dataList: { icon: iconList },
      onViewPreview: (e: FormValueProps) => handlePreview("landingPage", e),
    },
    languages: {
      schema: {},
      onViewPreview: (e: FormValueProps) => handlePreview("languages", e),
      dataList: { language: languageList, locale: languageList },
    },
    medias: {
      schema: {},
      onViewPreview: (e: FormValueProps) => handlePreview("medias", e),
    },
    newsletter: {
      schema: {},
      onViewPreview: (e: FormValueProps) => handlePreview("newsletter", e),
    },
    calendar: {
      schema: {},
      onViewPreview: (e: FormValueProps) => handlePreview("calendar", e),
    },
  };

  const organizeValues = (props: InitValueProps) => {
    const { form, onSubmit, initialValues, addEntries } = props;
    const { formId } = props.form;
    const { schema, dataList, onViewPreview } = integrateData[formId];
    // const addEntry = addEntries ? includeEntries(addEntries) : undefined;
    const payload = { ...form, formId, initialValues, schema, dataList, addEntry: addEntries };
    return { ...payload, onViewPreview, onSubmit };
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
  };
};
