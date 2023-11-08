import { SchemaProps } from "app-types";

export const formatInitAppSchema = (props: SchemaProps) => {
  const { formId, appList, target } = props;
  if (formId === "initApp") {
    return {
      required: ["appName", "logo"],
      unique: [
        {
          name: "appName",
          list: appList ? appList.map((app) => app.appName && app.appName !== target) : [],
        },
      ],
    };
  }
};
