import { GridData } from "app-context";

interface ILegalMove {
  current: GridData;
  map: GridData[][];
}
interface ICell {
  x: number;
  y: number;
}
interface IAddMove {
  current: ICell;
  length: number;
  direction: "up" | "down";
  legalMoves: ICell[];
}
export const isCellMatch = (cell1: ICell, cell2: ICell) => {
  return cell1.x === cell2.x && cell1.y === cell2.y;
};
const addPawnMoves = ({ current, legalMoves, length, direction }: IAddMove) => {
  const target = current.y + length;
  console.log("duration :>> ", target);
  if (direction === "down") {
    for (let i = target; i < current.y; i += 1) {
      legalMoves.push({ x: current.x, y: i });
    }
  }
  // if (direction === "up") {
  //   for (let i = target; i < current.y; i += 1) {
  //     legalMoves.push({ x: current.x, y: i });
  //   }
  // }
};

export const findChessLegalMove = ({ current, map }: ILegalMove) => {
  const legalMoves: ICell[] = [];
  // white pawn
  if (current.data.includes("white-pawn")) {
    // its in starting sqaure
    if (current.y === 6) addPawnMoves({ current, legalMoves, length: -2, direction: "down" });
    else addPawnMoves({ current, legalMoves, length: -1, direction: "down" });
  }
  // black pawn
  if (current.data.includes("black-pawn")) {
    // its in starting sqaure
    if (current.y === 1) addPawnMoves({ current, legalMoves, length: 2, direction: "up" });
    else addPawnMoves({ current, legalMoves, length: 1, direction: "up" });
  }
  return map.map((m) => {
    return m.map((cell) => {
      const isMatch = legalMoves.some((lMove) => isCellMatch(lMove, cell));
      if (isMatch && !cell.data) return { ...cell, data: "dot" };
      return cell;
    });
  });
};
