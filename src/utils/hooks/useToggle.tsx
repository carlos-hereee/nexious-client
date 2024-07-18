import { useState } from "react";

export const useToggle = () => {
  const [toggle, setToggle] = useState(false);

  const updateToggle = () => setToggle(!toggle);

  return { toggle, updateToggle };
};
