import { uniqueNamesGenerator, Config, adjectives, colors, animals } from "unique-names-generator";
import { uniqueId } from "nexious-library";
import { generateFromString } from "generate-avatar";

const customConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: "-",
  length: 2,
};

export const randomName: string = uniqueNamesGenerator({ dictionaries: [adjectives, colors] });
export const genarateName = () => uniqueNamesGenerator(customConfig);
export const generateUserDummyData = () => {
  const name = genarateName();
  return { uid: uniqueId(), name, level: "1", avatar: `data:image/svg+xml;utf8,${generateFromString(name)}` };
};
