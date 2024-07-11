export const stringToCamalCase = (str: string) => {
  // Using replace method with regEx
  const reg = /(?:^\w|[A-Z]|\b\w)/g;
  // remove whitespace
  const regWhitSpace = /\s+/g;

  return str
    .replace(reg, (word, i) => {
      return i === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(regWhitSpace, "");
};
