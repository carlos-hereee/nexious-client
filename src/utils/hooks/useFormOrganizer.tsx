import { useContext, useEffect, useState } from "react";
import { includeEntries } from "../forms/includeEntries";
import { integrateFormValues } from "../forms/integrateFormValues";
// import { organizeValues } from "../forms/organizeValues";
import { AdminContext } from "@app/context/admin/AdminContext";
import { FormProps, FormValueProps, InitValueProps } from "app-forms";
import { AppContext } from "@app/context/app/AppContext";
import { formatInitApp } from "../forms/formatInitApp";
import { formatInitAppSchema } from "../forms/formatInitAppSchema";

export const useFormOrganizer = (start?: string) => {
  // const { sectionEntries, newsletterForm, calendarForm } = useContext(AdminContext);
  // const { landingForm, initAppForm, socialMediaForm, languageForm } = useContext(AdminContext);
  // initial data if any
  const { languageList, newsletter, media, calendar, appList } = useContext(AppContext);
  const { landing, appId, logo, themeList, locale, appName } = useContext(AppContext);
  const [isFormLoading, setFormLoading] = useState<boolean>(true);
  const [formValues, setAppValues] = useState<FormValueProps[]>([]);
  const [active, setActive] = useState<string>(start || "");
  const [preview, setPreview] = useState<FormValueProps>({});

  const handlePreview = (formId: string, formValues: FormValueProps) => {
    setActive("");
    setPreview({});
    setActive(formId);
    setPreview(formValues);
  };

  const integrateData: { [key: string]: any } = {
    initApp: {
      schema: formatInitAppSchema({ formId: "initApp", appList, target: appName }),
      dataList: { theme: themeList },
      onViewPreview: (e: FormValueProps) => handlePreview("initApp", e),
    },
    landingPage: {
      schema: { required: ["title"] },
      onViewPreview: (e: FormValueProps) => handlePreview("landingPage", e),
    },
  };

  const organizeValues = (props: InitValueProps) => {
    const { form, onSubmit, initialValues, addEntries } = props;
    const { formId } = props.form;
    const { schema, dataList, onViewPreview } = integrateData[formId];
    const payload = { ...form, formId, initialValues, schema, dataList, addEntries };
    return { ...payload, onViewPreview, onSubmit };
  };
  return {
    includeEntries,
    integrateFormValues,
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
