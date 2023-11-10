import { FormValueProps, ReorderFormValueProps } from "app-forms";

export const formatPage = (props: ReorderFormValueProps): FormValueProps => {
  const { desiredOrder, hasEntry, values } = props;
  const reorderedObject: FormValueProps[] = [];
  let canSkip: string[] = [];
  for (let i = 0; i < desiredOrder.length; i++) {
    const key = desiredOrder[i];
    if (hasEntry) {
      const target = hasEntry[key]?.skipIfFalse;
      if (target) {
        canSkip.push(target);
        // check if original has value
        if (!values[key]) reorderedObject.push(values[key] === undefined ? false : values[key]);
        // entries should be include
        else {
          const form = hasEntry[key].form;
          let entryValues = values[target].map((val: FormValueProps) => {
            const keys = Object.keys(val);
            const keyValues = keys.filter((k) => Object.keys(form.initialValues).includes(k));
            return keyValues.map((k) => ({ [k]: val[k] }));
          });
          reorderedObject.push({ [key]: values[key] });
          reorderedObject.push({ [target]: entryValues });
        }
      } else if (!canSkip.includes(key)) reorderedObject.push({ [key]: values[key] || "" });
    }
    // otherwise value is not defined
    else reorderedObject.push({ [key]: values[key] || "" });
  }
  return Object.assign({}, ...reorderedObject);
};
