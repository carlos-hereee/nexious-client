/* eslint-disable no-param-reassign */
import { GridData } from "app-context";

interface ILegalMove {
  current: GridData;
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
  if (player === "white") {
    const target = { jump: y - 1, doubleJump: y - 2 };
    console.log("target :>> ", target);
    return map.map((m) => {
      if (x === m.x) {
        console.log("target :>> ", m);
      }
      return m;
    });
    // console.log("jumpSqr :>> ", jumpSqr);
    // if (!jumpSqr?.data) map[x][y - 1].data = "dot";
    // if (isInit && !doubleJumpSqr?.data) map[x][y - 2].data = "dot";
  }
  // if (player === "black") {
  //   const jumpSqr = map[x][y + 1];
  //   const doubleJumpSqr = map[x][y + 2];
  //   if (!jumpSqr?.data) map[x][y + 1].data = "dot";
  //   if (isInit && !doubleJumpSqr.data) map[x][y + 2].data = "dot";
  // }
  return map;
};

export const findChessLegalMove = ({ current, map }: ILegalMove) => {
  if (current.data.includes("white-pawn")) {
    // its in starting sqaure
    addPawnMoves({ current, map, player: "white", isInit: current.y === 6 });
  }
  // black pawn
  if (current.data.includes("black-pawn")) {
    addPawnMoves({ current, map, player: "black", isInit: current.y === 1 });
  }
  return map;
};
