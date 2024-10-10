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
export const isCellMatch = (cell1: ICell, cell2: ICell) => {
  return cell1.x === cell2.x && cell1.y === cell2.y;
};
export const canAttack = (cell1: GridData, target: string, legalMoves: GridData[]) => {
  // if empty
  if (!cell1.data) legalMoves.push(cell1);
  // if enemy controls square
  else if (cell1.data.includes(target)) legalMoves.push({ ...cell1, data: `${cell1.data} can-capture` });
  else if (cell1.data.includes("dot")) legalMoves.push(cell1);
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
  if (current.data.includes("white")) {
    map.forEach((cell) => {
      if (cell.x === current.x + 1 || cell.x === current.x - 1) {
        // top inner left
        if (cell.y === current.y + 2) canAttack(cell, "black", legalMoves);
        // bottom inner left
        if (cell.y === current.y - 2) canAttack(cell, "black", legalMoves);
      }

      if (cell.x === current.x + 2 || cell.x === current.x - 2) {
        // top inner left
        if (cell.y === current.y + 1) canAttack(cell, "black", legalMoves);
        // bottom inner left
        if (cell.y === current.y - 1) canAttack(cell, "black", legalMoves);
      }
    });
  }
  if (current.data.includes("black")) {
    map.forEach((cell) => {
      if (cell.x === current.x + 1 || cell.x === current.x - 1) {
        // top inner left
        if (cell.y === current.y + 2) canAttack(cell, "white", legalMoves);
        // bottom inner left
        if (cell.y === current.y - 2) canAttack(cell, "white", legalMoves);
      }

      if (cell.x === current.x + 2 || cell.x === current.x - 2) {
        // top inner left
        if (cell.y === current.y + 1) canAttack(cell, "white", legalMoves);
        // bottom inner left
        if (cell.y === current.y - 1) canAttack(cell, "white", legalMoves);
      }
    });
  }
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

export const findChessLegalMove = ({ current, map }: ILegalMove) => {
  const legalMoves: GridData[] = [];
  if (current.roomType === "pawn") addPawnMoves({ current, map, legalMoves });
  if (current.roomType === "knight") addKnightMoves({ current, map, legalMoves });
  console.log("legalMoves :>> ", legalMoves);
  if (legalMoves.length === 0) return map;
  return map.map((m) => {
    const target = legalMoves.filter((i) => i.id === m.id)[0];
    if (target) {
      return { ...m, data: target.data.includes("can-capture") ? target.data : "dot" };
    }
    // reset previous dot valus
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
