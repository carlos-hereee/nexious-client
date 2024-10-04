import { uniqueId } from "nexious-library";
import { games } from "@data/data.json";
import { createGrid } from "@app/createGrid";
import { GridData } from "app-context";

const initChessRow = (cell: GridData, i: number, type: "white" | "black") => {
  let data = "";
  if (i === 0 || i === 7) data = `${type}-rook`;
  if (i === 1 || i === 6) data = `${type}-knight`;
  if (i === 2 || i === 5) data = `${type}-bishop`;
  if (i === 3) data = `${type}-queen`;
  if (i === 4) data = `${type}-king`;
  return { ...cell, data };
};
export const initGames = () => {
  return games.map((game) => {
    const map = createGrid(game.dimensions);
    return { ...game, uid: uniqueId(), map };
  });
};
export const initGame = (name: string) => {
  if (name === "tictactoe") return createGrid({ length: 3, width: 3 });
  if (name === "chess") {
    const map = createGrid({ length: 8, width: 8 });
    return map.map((m, idx) => {
      if (idx === 0) return m.map((d, i) => initChessRow(d, i, "black"));
      if (idx === 7) return m.map((d, i) => initChessRow(d, i, "white"));
      if (idx === 1) return m.map((d) => ({ ...d, data: "black-pawn" }));
      if (idx === 6) return m.map((d) => ({ ...d, data: "white-pawn" }));
      return m;
    });
  }
  return [];
};
export const initOponents = () => {
  return [{ name: "nexious", avatar: "/icons/logo.svg", uid: "nexious", level: "1", isBot: true }];
};
