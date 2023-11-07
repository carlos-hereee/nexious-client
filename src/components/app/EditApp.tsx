import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { Header, Loading, PaginateForm } from "nexious-library";
import { AdminContext } from "@app/utils/context/admin/AdminContext";
import { AddEntryProps, FormValueProps, InitPaginateFormProps } from "app-forms";
import { ReorderFormValueProps } from "app-forms";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@app/utils/context/auth/AuthContext";
import { formatHeaderValues } from "@app/utils/app/formatHeaderValues";
import { MenuProps } from "app-types";
import { scrollToId } from "@app/utils/app/scrollToElement";
import PreviewPage from "./PreviewPage";

const EditApp = () => {
  const { sectionEntryOrganizer, newsletterForm, calendarForm } = useContext(AdminContext);
  const { landingPageForm, initAppForm, socialMediaForm } = useContext(AdminContext);
  const { languageForm } = useContext(AdminContext);
  const { editAppName, editLandingPage, editNewsletter } = useContext(AdminContext);
  const { editSocialMedia, editCalendar, editLanguage } = useContext(AdminContext);
  const { appName, landing, appId, logo, themeList: themes, locale } = useContext(AppContext);
  const { languageList, newsletter, media, calendar, appList } = useContext(AppContext);
  // const {  } = useContext(AppContext);
  const { theme, setTheme } = useContext(AuthContext);

  const [isLoadingFormState, setLoadingFormState] = useState<boolean>(true);
  const [appValues, setAppValues] = useState<FormValueProps[]>([]);
  const [active, setActive] = useState<string>("");
  const [preview, setPreview] = useState<FormValueProps>({});
  const navigate = useNavigate();

  const organizeValues = (props: ReorderFormValueProps): FormValueProps => {
    const { desiredOrder, hasEntry, values } = props;
    const reorderedObject: FormValueProps = {};
    let canSkip: string[] = [];
    for (let i = 0; i < desiredOrder.length; i++) {
      const key = desiredOrder[i];
      // continue to next iteration of key is skippable
      if (!canSkip.includes(key) && hasEntry) {
        // if entry value found; get the index of the appropriate entry
        const entryIdx = hasEntry.findIndex((entry) => entry.name === key);
        const target = hasEntry[entryIdx]?.skipIfFalse;
        if (entryIdx >= 0 && target) {
          // skip appropriate value
          target && canSkip.push(target);
          // check if original has value
          if (!values[key]) {
            reorderedObject[key] = values[key] === undefined ? false : values[key];
          } else {
            // init target with empty array
            reorderedObject[target] = [];
            // entries should be include
            const form = hasEntry[entryIdx].form;
            let entryValues = Object.keys(form.initialValues).map((val) => {
              // add shared key
              if (values[val]) {
                return { [val]: values[val] };
              } else {
                return { [val]: "" };
              }
            });
            reorderedObject[target].push(...entryValues);
            reorderedObject[key] = values[key];
          }
        }
        // otherwise value is not defined
        else reorderedObject[key] = "";
      } // otherwise value is not defined
      else if (values[key] && values[key].length > 0) {
        reorderedObject[key] = values[key];
      } else if (!canSkip.includes(key)) reorderedObject[key] = "";
    }
    return reorderedObject;
  };
  const handlePreview = (formId: string, values: FormValueProps) => {
    setActive(formId);
    setPreview(values);
  };

  useEffect(() => {
    if (appName) {
      const landingValues = organizeValues({
        values: landing,
        desiredOrder: landingPageForm.desiredOrder || [],
        hasEntry: sectionEntryOrganizer,
      });
      const newsletterValues = organizeValues({
        values: newsletter,
        desiredOrder: newsletterForm.desiredOrder || [],
      });
      const mediaValues = organizeValues({
        values: media,
        desiredOrder: socialMediaForm.desiredOrder || [],
      });
      const calendarValues = organizeValues({
        values: calendar,
        desiredOrder: calendarForm.desiredOrder || [],
      });
      // reset values; avoid redundant data
      setAppValues([]);
      includeEditValues([
        {
          values: {
            appName,
            logo: logo.url || "",
            theme: themes.map((t) => t.value).join(","),
          },
          form: initAppForm,
          formId: "initApp",
          onSubmit: (e: FormValueProps) => editAppName(e, appId),
          onViewPreview: (e: FormValueProps) => handlePreview("initApp", e),
          previewLabel: "See changes",
          withFileUpload: true,
          dataList: { theme: themes, locale: languageList, language: languageList },
          schema: {
            required: ["appName", "logo", "locale"],
            unique: [
              {
                name: "appName",
                list: appList?.map((app) => app.appName && app.appName !== appName) || [],
              },
            ],
          },
        },
        {
          values: landingValues,
          form: landingPageForm,
          formId: "landingPage",
          addEntries: sectionEntryOrganizer,
          withFileUpload: true,
          onSubmit: (e: FormValueProps) => editLandingPage(e, appId),
          onViewPreview: (e: FormValueProps) => handlePreview("landingPage", e),
          previewLabel: "See changes",
          schema: { required: ["title", "tagline"] },
        },
        {
          values: newsletterValues,
          form: newsletterForm,
          formId: "newsletter",
          onSubmit: (e: FormValueProps) => editNewsletter(e, appId),
        },
        {
          values: mediaValues,
          form: socialMediaForm,
          formId: "medias",
          // addEntries: sectionEntryOrganizer,
          onSubmit: (e: FormValueProps) => editSocialMedia(e, appId),
        },
        {
          values: calendarValues,
          form: calendarForm,
          formId: "Calendar",
          // addEntries: sectionEntryOrganizer,
          onSubmit: (e: FormValueProps) => editCalendar(e, appId),
        },
        // add languages in a different page
        {
          values: { locale, language: languageList.map((l) => l.value).join(",") },
          form: languageForm,
          formId: "languages",
          onSubmit: (e: FormValueProps) => editLanguage(e, appId),
        },
      ]);
    }
  }, [appName]);

  useEffect(() => {
    if (active) scrollToId(active);
  }, [active]);

  // console.log("preview :>> ", preview);
  // console.log("active :>> ", active);

  const includeEntries = (entries: AddEntryProps[]) => {
    let payload: { [key: string]: any } = {};
    entries.forEach((entry) => {
      const { form, name, canMultiply, skipIfFalse } = entry;
      const { initialValues, labels, placeholders, types } = form;
      const { removalLabel, additionLabel } = form;
      payload[name] = {
        initialValues,
        labels,
        placeholders,
        types,
        canMultiply,
        removalLabel,
        additionLabel,
        skipIfFalse,
      };
    });
    return payload;
  };
  const includeEditValues = (data: InitPaginateFormProps[]) => {
    data.forEach((formData) => {
      const { values, formId, addEntries, onSubmit, withFileUpload, schema } = formData;
      const { dataList, onViewPreview, previewLabel } = formData;
      const { heading, labels, placeholders, types, fieldHeading } = formData.form;
      const addEntry = addEntries ? includeEntries(addEntries) : undefined;
      // const initialValues = reOrderValues(values)
      const payload = {
        initialValues: values,
        placeholders,
        fieldHeading,
        formId,
        heading,
        labels,
        types,
        addEntry,
        onSubmit,
        withFileUpload,
        dataList,
        previewLabel,
        onViewPreview,
        schema,
      };
      setAppValues((prev) => [...prev, payload]);
    });
    setLoadingFormState(false);
  };
  // console.log("landing", landing);
  // console.log("appValues :>> ", appValues);

  const handleMenu = (menuItem: MenuProps) => {
    const { active } = menuItem;
    if (active?.themeId) setTheme(active.name || theme);
  };
  if (isLoadingFormState) return <Loading message="Loading app data" />;
  return (
    <div className="container">
      <h2 className="heading">Editing app: {appName}</h2>
      <div className="preview-container">
        <PaginateForm
          paginate={appValues}
          theme={theme}
          onCancel={() => navigate("/")}
          onPageClick={() => setActive("")}
          // page={1}
        />
        {active === "initApp" && (
          <Header
            logo={{ url: preview.logo }}
            heading={preview.appName}
            menu={formatHeaderValues({
              language: preview.language || "",
              locale: preview.locale || "",
              theme: preview.theme || "",
            })}
            theme={theme}
            updateMenu={handleMenu}
          />
        )}
        {active === "landingPage" && <PreviewPage preview={preview} />}
      </div>
    </div>
  );
};
export default EditApp;
