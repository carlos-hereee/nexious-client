/* eslint-disable no-param-reassign */
import { GridData } from "app-context";

interface ILegalMove {
  current: GridData;
  previous?: GridData;
  map: GridData[];
}
interface ICell {
  x: number;
  y: number;
  data?: string;
}
interface IAddMove {
  map: GridData[];
  legalMoves: GridData[];
  current: GridData;
  player: string;
}

interface IOpenSqare {
  origin: GridData;
  player: string;
  map: GridData[];
  locations: GridData[];
  current?: GridData;
  dir: ICell;
}

export const captureAttack = (cell1: GridData, target: string, legalMoves: GridData[]) => {
  // if empty
  if (!cell1.data || cell1.canMove) legalMoves.push({ ...cell1, canMove: true });
  // if enemy controls square
  else if (cell1.data.includes(target)) legalMoves.push({ ...cell1, canCapture: true });
};
export const canAttack = (cell1: GridData, target: string) => cell1.data.includes(target);
export const isSquareOpen = (cell1: GridData) => !cell1.data;
export const isCellMatch = (cell1: ICell, cell2: ICell) => {
  return cell1.x === cell2.x && cell1.y === cell2.y;
};

const findOpenSqr = ({ current, map, locations, player, origin, dir }: IOpenSqare) => {
  if (!current) current = { ...origin, y: origin.y + dir.y, x: origin.x + dir.x };
  const target = map.filter((m) => current && isCellMatch(m, current))[0];
  if (target) {
    captureAttack(target, player, locations);
    if (isSquareOpen(target)) {
      findOpenSqr({ current: { ...target, y: target.y + dir.y, x: target.x + dir.x }, map, locations, player, origin, dir });
    }
  }
};

export const addPawnMoves = ({ current, map, legalMoves }: IAddMove) => {
  const { x, y, data } = current;
  // white pawn
  if (data.includes("white-pawn")) {
    map.forEach((cell) => {
      if (x === cell.x) {
        // jump if square is availible
        if (y === cell.y - 1 && !cell.data) legalMoves.push(cell);
        // double jump
        if (y === 1 && y === cell.y - 2 && !cell.data) legalMoves.push(cell);
      }
      // attacking square
      if (x + 1 === cell.x && y + 1 === cell.y) captureAttack(cell, "black", legalMoves);
      // attacking square
      if (x - 1 === cell.x && y + 1 === cell.y) captureAttack(cell, "black", legalMoves);
    });
  }
  // black pawn
  if (data.includes("black-pawn")) {
    map.forEach((cell) => {
      if (x === cell.x) {
        // jump if square is availible
        if (y === cell.y + 1 && !cell.data) legalMoves.push(cell);
        // double jump
        if (y === 6 && y === cell.y + 2 && !cell.data) legalMoves.push(cell);
      }
      // attacking square
      if (x + 1 === cell.x && y - 1 === cell.y && cell.data.includes("white")) {
        legalMoves.push({ ...cell, data: `${cell.data} can-capture` });
      }
      // attacking square
      if (x + 1 === cell.x && y + 1 === cell.y && cell.data.includes("white")) {
        legalMoves.push({ ...cell, data: `${cell.data} can-capture` });
      }
    });
  }
  return legalMoves;
};
export const addKnightMoves = ({ current, map, legalMoves, player }: IAddMove) => {
  map.forEach((cell) => {
    if (cell.x === current.x + 1 || cell.x === current.x - 1) {
      // top inner left
      if (cell.y === current.y + 2) captureAttack(cell, player, legalMoves);
      // bottom inner left
      if (cell.y === current.y - 2) captureAttack(cell, player, legalMoves);
    }

    if (cell.x === current.x + 2 || cell.x === current.x - 2) {
      // top inner left
      if (cell.y === current.y + 1) captureAttack(cell, player, legalMoves);
      // bottom inner left
      if (cell.y === current.y - 1) captureAttack(cell, player, legalMoves);
    }
  });
  // if (current.data.includes("white")) {
  // }
  // if (current.data.includes("black")) {
  //   map.forEach((cell) => {
  //     if (cell.x === current.x + 1 || cell.x === current.x - 1) {
  //       // top inner left
  //       if (cell.y === current.y + 2) canAttack(cell, "white", legalMoves);
  //       // bottom inner left
  //       if (cell.y === current.y - 2) canAttack(cell, "white", legalMoves);
  //     }

  //     if (cell.x === current.x + 2 || cell.x === current.x - 2) {
  //       // top inner left
  //       if (cell.y === current.y + 1) canAttack(cell, "white", legalMoves);
  //       // bottom inner left
  //       if (cell.y === current.y - 1) canAttack(cell, "white", legalMoves);
  //     }
  //   });
  // }
};
export const addBishopMoves = ({ current, map, legalMoves, player }: IAddMove) => {
  // to top right
  findOpenSqr({ map, locations: legalMoves, player, origin: current, dir: { x: 1, y: 1 } });
  findOpenSqr({ map, locations: legalMoves, player, origin: current, dir: { x: -1, y: 1 } });
  findOpenSqr({ map, locations: legalMoves, player, origin: current, dir: { x: -1, y: -1 } });
  findOpenSqr({ map, locations: legalMoves, player, origin: current, dir: { x: 1, y: -1 } });
};
export const addRookMoves = ({ current, map, legalMoves, player }: IAddMove) => {
  // to top
  findOpenSqr({ map, locations: legalMoves, player, origin: current, dir: { x: 0, y: 1 } });
  // to bottom
  findOpenSqr({ map, locations: legalMoves, player, origin: current, dir: { x: 0, y: -1 } });
  // to left
  findOpenSqr({ map, locations: legalMoves, player, origin: current, dir: { x: -1, y: 0 } });
  // to right
  findOpenSqr({ map, locations: legalMoves, player, origin: current, dir: { x: 1, y: 0 } });
};
export const updateChessMove = ({ current, map, previous }: ILegalMove) => {
  if (!previous) return map;
  return map.map((m) => {
    if (m.canMove) return { ...m, canMove: false };
    if (m.canCapture) return { ...m, canCapture: false };
    if (m.id === previous.id) return { ...m, data: "", roomType: "" };
    if (m.id === current.id) return { ...m, data: previous.data, roomType: previous.roomType };
    return m;
  });
};
export const resetBoard = (map: GridData[]) => {
  return map.map((m) => {
    if (m.canMove) return { ...m, canMove: false };
    if (m.canCapture) return { ...m, canCapture: false };
    return m;
  });
};

export const findChessLegalMove = ({ current, map }: ILegalMove) => {
  const legalMoves: GridData[] = [];
  const player = current.data.includes("white") ? "black" : "white";

  if (current.roomType === "pawn") addPawnMoves({ current, map, legalMoves, player });
  if (current.roomType === "knight") addKnightMoves({ current, map, legalMoves, player });
  if (current.roomType === "bishop") addBishopMoves({ current, map, legalMoves, player });
  if (current.roomType === "rook") addRookMoves({ current, map, legalMoves, player });
  if (legalMoves.length === 0) return resetBoard(map);

  return map.map((m) => {
    const target = legalMoves.filter((i) => i.id === m.id)[0];
    if (target) return target;
    return m;
  });
};
