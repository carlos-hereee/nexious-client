export const filterUserValues = (user: { [key: string]: string }) => {
  const desiredData = ["userId", "username", "email", "langaugeId"];
  const userData: { [key: string]: string } = {};
  Object.keys(user).forEach((key) => {
    if (desiredData.includes(key)) userData[key] = user[key];
  });
  return userData;
};
