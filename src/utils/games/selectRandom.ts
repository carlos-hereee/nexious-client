export const selectRandom = <T>(data: T[]) => {
  return data[Math.floor(Math.random() * data.length)];
};
