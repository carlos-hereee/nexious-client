import { FormValueProps, ReorderFormValueProps } from "app-forms";

export const formatPage = (props: ReorderFormValueProps): FormValueProps => {
  const { desiredOrder, hasEntry, values } = props;
  const reorderedObject: FormValueProps[] = [];
  let canSkip: string[] = [];
  for (let i = 0; i < desiredOrder.length; i++) {
    const key = desiredOrder[i];
    if (key === "hero") {
      reorderedObject.push({ [key]: values[key]?.hero || "" });
    } else if (hasEntry) {
      const target = hasEntry[key]?.groupName;
      if (target) {
        canSkip.push(target);
        // check if original has value
        if (!values[key]) reorderedObject.push(values[key] === undefined ? false : values[key]);
        // entries should be include
        else {
          const form = hasEntry[key];
          let entryValues = values[target].map((val: FormValueProps) => {
            const sharedKey = val.heroId || val._id;
            return Object.assign(
              {},
              ...Object.keys(form.initialValues).map((k) => {
                if (k === "sectionHero") return { [k]: val.hero, sharedKey };
                else return { [k]: val[k], sharedKey };
              })
            );
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
