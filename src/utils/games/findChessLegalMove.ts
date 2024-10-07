import { GridData } from "app-context";

interface ILegalMove {
  current: GridData;
  previous?: GridData;
  map: GridData[];
}
interface ICell {
  x: number;
  y: number;
}
interface IAddMove {
  map: GridData[];
  current: ICell;
  player: "white" | "black";
  isInit?: boolean;
}
export const isCellMatch = (cell1: ICell, cell2: ICell) => {
  return cell1.x === cell2.x && cell1.y === cell2.y;
};

const addPawnMoves = ({ current, isInit, player, map }: IAddMove) => {
  const { x, y } = current;
  const legalMoves: GridData[] = [];
  if (player === "white") {
    map.forEach((m) => {
      if (x === m.x) {
        // jump if square is availible
        if (y === m.y - 1 && !m.data) legalMoves.push(m);
        // double jump
        if (isInit && y === m.y - 2 && !m.data) legalMoves.push(m);
      }
    });
  }
  // if (player === "black") {
  //   const jumpSqr = map[x][y + 1];
  //   const doubleJumpSqr = map[x][y + 2];
  //   if (!jumpSqr?.data) map[x][y + 1].data = "dot";
  //   if (isInit && !doubleJumpSqr.data) map[x][y + 2].data = "dot";
  // }
  return legalMoves;
};

export const findChessLegalMove = ({ current, map, previous }: ILegalMove) => {
  let legalMoves: GridData[] = [];
  if (previous && current.data === "dot") {
    return map.map((m) => {
      if (m.id === current.id) return { ...m, data: previous.data };
      if (m.id === previous.id) return { ...m, data: "" };
      if (m.data === "dot") return { ...m, data: "" };
      return m;
    });
  }
  if (current.data.includes("white-pawn")) {
    // its in starting sqaure
    legalMoves = addPawnMoves({ current, map, player: "white", isInit: current.y === 1 });
  }
  // black pawn
  if (current.data.includes("black-pawn")) {
    legalMoves = addPawnMoves({ current, map, player: "black", isInit: current.y === 2 });
  }

  return map.map((m) => {
    const isMatch = legalMoves.some((i) => i === m);
    if (isMatch) {
      return { ...m, data: "dot" };
    }
    // reset previous dot valus
    return { ...m, data: m.data === "dot" ? "" : m.data };
  });
};
