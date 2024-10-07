import { GridData } from "app-context";
import { uniqueId } from "nexious-library";

interface Dimensions {
  length: number;
  width: number;
  config?: (cell: GridData) => GridData;
}

interface IColumn {
  row: number;
  col: number;
  config?: (cell: GridData) => GridData;
}
const createRow = ({ row, col, config }: IColumn) => {
  return Array.from({ length: row }).map((_rows, y) => {
    const current: GridData = { id: uniqueId(), y, x: col, data: "", roomType: "" };
    if (config) return config(current);
    return current;
  });
};
export const createGrid = ({ length, width }: Dimensions) => {
  const gridLength = Array.from({ length: width });
  return gridLength.map((_l, idx) => {
    const data: GridData[] = [];
    for (let i = 0; i < length; i += 1) {
      data.push({ id: uniqueId(), x: i, y: idx, data: "", orientation: "", roomType: "" });
    }
    return data;
  });
};
export const createGameGrid = ({ length, width, config }: Dimensions) => {
  // init columns
  return Array.from({ length })
    .map((_col, x) => createRow({ row: width, col: x, config }))
    .reduce((prev, current) => [...prev, ...current]);
};
