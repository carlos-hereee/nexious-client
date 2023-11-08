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
  // const { sectionEntryOrganizer, newsletterForm, calendarForm } = useContext(AdminContext);
  // const { landingForm, initAppForm, socialMediaForm, languageForm } = useContext(AdminContext);
  // initial data if any
  const { languageList, newsletter, media, calendar, appList } = useContext(AppContext);
  const { landing, appId, logo, themeList, locale, appName } = useContext(AppContext);
  const [isFormLoading, setFormLoading] = useState<boolean>(true);
  const [values, setAppValues] = useState<FormValueProps[]>([]);
  const [active, setActive] = useState<string>(start || "");
  const [preview, setPreview] = useState<FormValueProps>({});

  const handlePreview = (formId: string, formValues: FormValueProps) => {
    setActive("");
    setPreview({});
    setActive(formId);
    setPreview(formValues);
  };

  const integrateData = {
    initApp: {
      initialValues: formatInitApp(appName, logo.url || "", themeList),
      schema: formatInitAppSchema({ formId: "initApp", appList, target: appName }),
      dataList: { theme: themeList },
      onViewPreview: (e: FormValueProps) => handlePreview("initApp", e),
    },
  };

  const organizeValues = (props: InitValueProps) => {
    const { form, onSubmit } = props;
    const { formId } = props.form;
    if (formId === "initApp") {
      const { initialValues, schema, dataList, onViewPreview } = integrateData[formId];
      const payload = { ...form, formId, initialValues, schema, dataList };
      setAppValues([]);
      setAppValues((prev) => [...prev, { ...payload, onViewPreview, onSubmit }]);
      setFormLoading(false);
    }
  };
  return {
    includeEntries,
    integrateFormValues,
    setActive,
    organizeValues,
    isFormLoading,
    values,
    active,
    preview,
    handlePreview,
    setAppValues,
    setFormLoading,
  };
};
