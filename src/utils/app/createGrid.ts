import { GridData } from "app-context";
import { uniqueId } from "nexious-library";

interface Dimensions {
  length: number;
  width: number;
}

export const createGrid = ({ length, width }: Dimensions) => {
  const gridLength = Array.from({ length: width });
  return gridLength.map((_l, idx) => {
    const data: GridData[] = [];
    for (let i = 0; i < length; i += 1) {
      data.push({ id: uniqueId(), x: idx, y: i, data: "", orientation: "", roomType: "" });
    }
    return data;
  });
};
