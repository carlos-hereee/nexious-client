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
}
interface IOpenSqare {
  origin: GridData;
  player: string;
  map: GridData[];
  locations: GridData[];
  current?: GridData;
  direction: {
    diagnolTopLeft?: boolean;
    diagnolTopRight?: boolean;
    diagnolBottomLeft?: boolean;
    diagnolBottomRight?: boolean;
    horizontalLeft?: boolean;
    horizontalRight?: boolean;
    verticalTop?: boolean;
    verticalBottom?: boolean;
  };
}
export const captureAttack = (cell1: GridData, target: string, legalMoves: GridData[]) => {
  // if empty
  if (!cell1.data) legalMoves.push(cell1);
  else if (cell1.data.includes("dot")) legalMoves.push(cell1);
  // if enemy controls square
  else if (cell1.data.includes(target)) legalMoves.push({ ...cell1, data: `${cell1.data} can-capture` });
};
export const isSquareOpen = (cell1: GridData, target: string) => {
  if (!cell1.data) return true;
  if (cell1.data.includes(target)) return true;
  return false;
};
export const isCellMatch = (cell1: ICell, cell2: ICell) => {
  return cell1.x === cell2.x && cell1.y === cell2.y;
};

const findOpenSqr = ({ current, map, locations, direction, player, origin }: IOpenSqare) => {
  if (direction.diagnolTopLeft) {
    if (!current) current = { ...origin, x: origin.x + 1, y: origin.y + 1 };
    const target = map.filter((m) => current && isCellMatch(m, current))[0];
    if (target && isSquareOpen(target, player)) {
      captureAttack(target, player, locations);
      findOpenSqr({ current: { ...target, x: target.x + 1, y: target.y + 1 }, map, locations, direction, player, origin });
    } else {
      current = undefined; // reset current
      direction.diagnolTopLeft = false; // close diagol
      findOpenSqr({ map, locations, direction, player, origin }); // recursively find open squares
    }
  }
  if (direction.diagnolTopRight) {
    if (!current) current = { ...origin, x: origin.x - 1, y: origin.y + 1 };
    const target = map.filter((m) => current && isCellMatch(m, current))[0];
    if (target && isSquareOpen(target, player)) {
      captureAttack(target, player, locations);
      findOpenSqr({ current: { ...target, x: target.x - 1, y: target.y + 1 }, map, locations, direction, player, origin });
    } else {
      current = undefined;
      direction.diagnolTopRight = false;
      findOpenSqr({ map, locations, direction, player, origin });
    }
  }
  if (direction.diagnolBottomRight) {
    if (!current) current = { ...origin, x: origin.x - 1, y: origin.y - 1 };
    const target = map.filter((m) => current && isCellMatch(m, current))[0];
    if (target && isSquareOpen(target, player)) {
      captureAttack(target, player, locations);
      findOpenSqr({ current: { ...target, x: target.x - 1, y: target.y - 1 }, map, locations, direction, player, origin });
    } else {
      current = undefined; // otherwise reset current
      direction.diagnolBottomRight = false;
      findOpenSqr({ map, locations, direction, player, origin }); // recursively find open squares
    }
  }
  if (direction.diagnolBottomLeft) {
    if (!current) current = { ...origin, x: origin.x + 1, y: origin.y - 1 };
    const target = map.filter((m) => current && isCellMatch(m, current))[0];
    if (target && isSquareOpen(target, player)) {
      captureAttack(target, player, locations);
      findOpenSqr({ current: { ...target, x: target.x + 1, y: target.y - 1 }, map, locations, direction, player, origin });
    } else {
      current = undefined;
      direction.diagnolBottomLeft = false; // recursively find open squares
      findOpenSqr({ map, locations, direction, player, origin });
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
      if (x + 1 === cell.x && y + 1 === cell.y && cell.data.includes("black")) {
        legalMoves.push({ ...cell, data: `${cell.data} can-capture` });
      }
      // attacking square
      if (x - 1 === cell.x && y + 1 === cell.y && cell.data.includes("black")) {
        legalMoves.push({ ...cell, data: `${cell.data} can-capture` });
      }
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
export const addKnightMoves = ({ current, map, legalMoves }: IAddMove) => {
  const target = current.data.includes("white") ? "black" : "white";
  map.forEach((cell) => {
    if (cell.x === current.x + 1 || cell.x === current.x - 1) {
      // top inner left
      if (cell.y === current.y + 2) captureAttack(cell, target, legalMoves);
      // bottom inner left
      if (cell.y === current.y - 2) captureAttack(cell, target, legalMoves);
    }

    if (cell.x === current.x + 2 || cell.x === current.x - 2) {
      // top inner left
      if (cell.y === current.y + 1) captureAttack(cell, target, legalMoves);
      // bottom inner left
      if (cell.y === current.y - 1) captureAttack(cell, target, legalMoves);
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
export const addBishopMoves = ({ current, map, legalMoves }: IAddMove) => {
  const player = current.data.includes("white") ? "black" : "white";
  const direction = { diagnolTopLeft: true, diagnolTopRight: true, diagnolBottomLeft: true, diagnolBottomRight: true };
  findOpenSqr({ locations: legalMoves, origin: current, map, direction, player });
};
export const updateChessMove = ({ current, map, previous }: ILegalMove) => {
  if (!previous) return map;
  return map.map((m) => {
    if (m.id === current.id) return { ...m, data: previous.data, roomType: previous.roomType };
    if (m.id === previous.id) return { ...m, data: "", roomType: "" };
    if (m.data.includes("dot")) return { ...m, data: "", roomType: "" };
    return m;
  });
};
export const resetBoard = (map: GridData[]) => {
  return map.map((m) => {
    // if (m.data.includes("dot")) return { ...m, data: m.data.replaceAll("dot", "") };
    // if (m.data.includes("can-capture")) return { ...m, data: m.data.replaceAll("can-capture", "") };
    return {
      ...m,
      data: m.data.includes("dot")
        ? m.data.includes("can-capture")
          ? m.data.replaceAll("can-capture", "")
          : `${m.data ? ` ${m.data}` : ""}`
        : m.data,
    };
  });
};

export const findChessLegalMove = ({ current, map }: ILegalMove) => {
  const legalMoves: GridData[] = [];
  if (current.roomType === "pawn") addPawnMoves({ current, map, legalMoves });
  if (current.roomType === "knight") addKnightMoves({ current, map, legalMoves });
  if (current.roomType === "bishop") addBishopMoves({ current, map, legalMoves });
  if (legalMoves.length === 0) return resetBoard(map);

  return map.map((m) => {
    const target = legalMoves.filter((i) => i.id === m.id)[0];
    if (target) {
      return { ...m, data: target.data.includes("can-capture") ? target.data : "dot" };
    }

    return {
      ...m,
      data: m.data.includes("dot")
        ? m.data.includes("can-capture")
          ? m.data.replaceAll("can-capture", "")
          : `${m.data ? ` ${m.data}` : ""}`
        : m.data,
    };
  });
};
