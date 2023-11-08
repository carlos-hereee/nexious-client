import { useContext, useEffect, useState } from "react";
import { includeEntries } from "../forms/includeEntries";
import { integrateFormValues } from "../forms/integrateFormValues";
import { organizeValues } from "../forms/organizeValues";
import { AdminContext } from "@app/context/admin/AdminContext";
import { FormValueProps } from "app-forms";
import { AppContext } from "@app/context/app/AppContext";

export const useFormOrganizer = () => {
  const { sectionEntryOrganizer, newsletterForm, calendarForm } = useContext(AdminContext);
  const { landingForm, initAppForm, socialMediaForm, languageForm } = useContext(AdminContext);
  const [isLoadingFormState, setLoadingFormState] = useState<boolean>(true);
  const [values, setAppValues] = useState<FormValueProps[]>([]);
  const [active, setActive] = useState<string>("");
  const [preview, setPreview] = useState<FormValueProps>({});

  const handlePreview = (formId: string, formValues: FormValueProps) => {
    setActive("");
    setPreview({});
    setActive(formId);
    setPreview(formValues);
  };

  return {
    organizeValues,
    includeEntries,
    integrateFormValues,
    setActive,
    isLoadingFormState,
    values,
    active,
    preview,
    handlePreview,
    setAppValues,
    setLoadingFormState,
  };
};
