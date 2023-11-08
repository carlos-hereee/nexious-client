import { FormValueProps, ReorderFormValueProps } from "app-forms";

export const formatPage = (props: ReorderFormValueProps): FormValueProps => {
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
