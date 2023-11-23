// import { FormValueProps, ReorderFormValueProps } from "app-forms";

// export const formatPage = (props: ReorderFormValueProps): FormValueProps => {
//   const { desiredOrder, hasEntry, values } = props;
//   const reorderedObject: FormValueProps[] = [];
//   const canSkip: string[] = [];
//   for (let i = 0; i < desiredOrder.length; i += 1) {
//     const key = desiredOrder[i];
//     if (key === "hero") {
//       reorderedObject.push({ [key]: values[key].hero || "" });
//     } else if (hasEntry) {
//       const target = hasEntry[key].groupName;
//       if (target) {
//         canSkip.push(target);
//         // check if original has value
//         if (!values[key] && typeof values[key] === "boolean") {
//           reorderedObject.push({ [key]: false });
//           // reorderedObject.push(values[key] === undefined ? { [key]: false } : values[key]);
//         } else {
//           const form = hasEntry[key];
//           const entryValues = values[target].map((val: FormValueProps) => {
//             const sharedKey = val.sharedKey || val.heroId;
//             return Object.assign(
//               {},
//               ...Object.keys(form.initialValues).map((k) => {
//                 if (k === "sectionHero") return { [k]: val.hero, sharedKey };
//                 return { [k]: val[k], sharedKey };
//               })
//             );
//           });
//           reorderedObject.push({ [key]: values[key] });
//           reorderedObject.push({ [target]: entryValues });
//         }
//       } else if (!canSkip.includes(key)) reorderedObject.push({ [key]: values[key] || "" });
//     } else reorderedObject.push({ [key]: values[key] || "" });
//   }
//   return Object.assign({}, ...reorderedObject);
// };
