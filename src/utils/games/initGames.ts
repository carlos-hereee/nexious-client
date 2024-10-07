/* eslint-disable no-param-reassign */
import { uniqueId } from "nexious-library";
import { games } from "@data/data.json";
import { createGameGrid, createGrid } from "@app/createGrid";
import { GridData } from "app-context";

const initChessRow = (cell: GridData) => {
  const { x, y } = cell;
  //  pawns
  if (y === 1) cell.data = "white-pawn";
  if (y === 6) cell.data = "black-pawn";
  //  white
  if (y === 0) {
    //  rooks
    if (x === 0 || x === 7) cell.data = "white-rook";
    if (x === 1 || x === 6) cell.data = "white-knight";
    if (x === 2 || x === 5) cell.data = "white-bishop";
    if (x === 3) cell.data = "white-king";
    if (x === 4) cell.data = "white-queen";
  }
  if (y === 7) {
    // black rooks
    if (x === 0 || x === 7) cell.data = "black-rook";
    if (x === 1 || x === 6) cell.data = "black-knight";
    if (x === 2 || x === 5) cell.data = "black-bishop";
    if (x === 3) cell.data = "black-queen";
    if (x === 4) cell.data = "black-king";
  }
  return cell;
};
export const initGames = () => {
  return games.map((game) => {
    const map = createGrid(game.dimensions);
    return { ...game, uid: uniqueId(), map };
  });
};
export const initGame = (name: string): GridData[] => {
  if (name === "tictactoe") return createGameGrid({ length: 3, width: 3 });
  if (name === "chess") return createGameGrid({ length: 8, width: 8, config: initChessRow });
  return [];
};
export const initOponents = () => {
  return [{ name: "nexious", avatar: "/icons/logo.svg", uid: "nexious", level: "1", isBot: true }];
};
